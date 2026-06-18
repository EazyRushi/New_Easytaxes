import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder, FolderOpen, FolderPlus, File, FileText, FileSpreadsheet, FileImage,
  Upload, Download, Trash2, Pencil, ChevronRight, ChevronDown, Search,
  MoreVertical, MoveRight, X, Check, Home, Grid, List,
} from 'lucide-react';
import { usePortal } from './portalStore';
import { api } from './api';

function formatSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function fileIconLarge(mime) {
  if (!mime) return <File size={32} className="text-gray-300" />;
  if (mime === 'application/pdf') return <FileText size={32} className="text-red-400" />;
  if (mime.startsWith('image/')) return <FileImage size={32} className="text-blue-400" />;
  if (mime.includes('spreadsheet') || mime.includes('excel') || mime === 'text/csv') return <FileSpreadsheet size={32} className="text-green-500" />;
  return <FileText size={32} className="text-gray-400" />;
}
function fileIconSmall(mime) {
  if (!mime) return <File size={16} className="text-gray-400" />;
  if (mime === 'application/pdf') return <FileText size={16} className="text-red-500" />;
  if (mime.startsWith('image/')) return <FileImage size={16} className="text-blue-500" />;
  if (mime.includes('spreadsheet') || mime.includes('excel') || mime === 'text/csv') return <FileSpreadsheet size={16} className="text-green-600" />;
  return <FileText size={16} className="text-gray-500" />;
}

function buildTree(folders, parentId = null) {
  return folders
    .filter(f => (f.parentId ?? null) === parentId)
    .map(f => ({ ...f, children: buildTree(folders, f.id) }));
}
function getAncestors(folders, folderId) {
  const map = {};
  folders.forEach(f => { map[f.id] = f; });
  const path = [];
  let cur = folderId;
  while (cur) {
    const node = map[cur];
    if (!node) break;
    path.unshift(node);
    cur = node.parentId;
  }
  return path;
}

const DEMO_FILES = [
  { id: 'd1', name: '2024 Federal Tax Return', originalName: '2024_federal_return.pdf', mimeType: 'application/pdf', fileSize: 2340000, createdAt: '2025-06-01', fileUrl: null },
  { id: 'd2', name: 'January Bank Statement', originalName: 'jan_2025_statement.pdf', mimeType: 'application/pdf', fileSize: 540000, createdAt: '2025-06-05', fileUrl: null },
];

function ModalShell({ title, onClose, children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function NewFolderModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  return (
    <ModalShell title="New Folder" onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); if (name.trim()) onCreate(name.trim()); }} className="p-6 space-y-4">
        <input autoFocus type="text" placeholder="Folder name..." value={name} onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={!name.trim()} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-semibold">Create</button>
        </div>
      </form>
    </ModalShell>
  );
}

function RenameModal({ item, type, onClose, onRename }) {
  const [name, setName] = useState(item.name);
  return (
    <ModalShell title={'Rename ' + type} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onRename(name); }} className="p-6 space-y-4">
        <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={!name.trim() || name === item.name} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-semibold">Rename</button>
        </div>
      </form>
    </ModalShell>
  );
}

function MoveModal({ item, type, allFolders, onClose, onMove }) {
  const [targetId, setTargetId] = useState(undefined);
  const options = allFolders.filter(f => f.id !== item.id);
  return (
    <ModalShell title={'Move "' + item.name + '"'} onClose={onClose}>
      <div className="p-6 space-y-4">
        <p className="text-xs text-gray-500">Select destination folder:</p>
        <div className="max-h-56 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-50">
          <button onClick={() => setTargetId(null)}
            className={'w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-orange-50 transition-colors ' + (targetId === null ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700')}>
            <Home size={14} /> Root {targetId === null && <Check size={13} className="ml-auto" />}
          </button>
          {options.map(f => (
            <button key={f.id} onClick={() => setTargetId(f.id)}
              className={'w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-orange-50 transition-colors ' + (targetId === f.id ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700')}>
              <Folder size={14} className="text-amber-400" /> {f.name}
              {targetId === f.id && <Check size={13} className="ml-auto" />}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button disabled={targetId === undefined} onClick={() => onMove(targetId)} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-semibold">Move Here</button>
        </div>
      </div>
    </ModalShell>
  );
}

const UPLOAD_CATS = [
  { value: 'TAX_RETURN', label: 'Tax Return' },
  { value: 'BANK_STATEMENT', label: 'Bank Statement' },
  { value: 'PAYROLL', label: 'Payroll' },
  { value: 'FINANCIAL_REPORT', label: 'Financial Report' },
  { value: 'LEGAL', label: 'Legal Document' },
  { value: 'IDENTIFICATION', label: 'Identification' },
  { value: 'OTHER', label: 'Other' },
];

function UploadModal({ folderName, onClose, onUpload, uploading, error }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('OTHER');
  const [description, setDescription] = useState('');
  const [taxYear, setTaxYear] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();
  return (
    <ModalShell title={'Upload to "' + folderName + '"'} onClose={() => !uploading && onClose()}>
      <form onSubmit={e => { e.preventDefault(); if (file) onUpload(file, category, description, taxYear ? parseInt(taxYear) : null); }} className="p-6 space-y-4">
        <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          className={'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ' + (dragging ? 'border-orange-400 bg-orange-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-orange-300')}>
          <input ref={inputRef} type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
          {file ? (
            <div className="flex flex-col items-center gap-1">
              <div className="mb-1">{fileIconLarge(file.type)}</div>
              <p className="text-sm font-semibold text-gray-900 truncate max-w-full">{file.name}</p>
              <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              <button type="button" onClick={e => { e.stopPropagation(); setFile(null); }} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <Upload size={28} className="mb-1" />
              <p className="text-sm">Drop file here or click to browse</p>
              <p className="text-xs">PDF, Word, Excel, Images - max 25MB</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              {UPLOAD_CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tax Year</label>
            <input type="number" placeholder="e.g. 2024" value={taxYear} onChange={e => setTaxYear(e.target.value)} min="2000" max="2099"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
          <input type="text" placeholder="Optional note..." value={description} onChange={e => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-xs text-red-600">{error}</div>}
        {uploading && (
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
            <div className="w-3.5 h-3.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <span className="text-xs text-orange-700">Uploading to secure storage...</span>
          </div>
        )}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} disabled={uploading} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={!file || uploading} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-semibold">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function ItemMenu({ hasDownload, onDownload, onRename, onMove, onDelete }) {
  return (
    <div className="absolute right-0 top-6 bg-white shadow-xl border border-gray-200 rounded-xl z-20 w-40 py-1 overflow-hidden" onClick={e => e.stopPropagation()}>
      {hasDownload && (
        <button onClick={onDownload} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 text-left text-gray-700">
          <Download size={13} /> Download
        </button>
      )}
      <button onClick={onRename} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 text-left text-gray-700">
        <Pencil size={13} /> Rename
      </button>
      <button onClick={onMove} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 text-left text-gray-700">
        <MoveRight size={13} /> Move to...
      </button>
      <div className="border-t border-gray-100 my-1" />
      <button onClick={onDelete} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-red-50 text-left text-red-500">
        <Trash2 size={13} /> Delete
      </button>
    </div>
  );
}

function FolderCard({ folder, onOpen, onRename, onMove, onDelete }) {
  const [menu, setMenu] = useState(false);
  const count = (folder._count?.documents ?? 0) + (folder._count?.children ?? 0);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-orange-300 hover:shadow-sm transition-all group relative select-none">
      <div onClick={onOpen} className="text-center">
        <Folder size={36} className="text-amber-400 mx-auto mb-2" />
        <p className="text-xs font-semibold text-gray-900 truncate">{folder.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{count > 0 ? (count + ' item' + (count !== 1 ? 's' : '')) : 'Empty'}</p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={e => { e.stopPropagation(); setMenu(!menu); }} className="p-1 rounded hover:bg-gray-100 text-gray-400">
          <MoreVertical size={13} />
        </button>
        {menu && <ItemMenu onRename={() => { setMenu(false); onRename(); }} onMove={() => { setMenu(false); onMove(); }} onDelete={() => { setMenu(false); onDelete(); }} />}
      </div>
    </div>
  );
}

function FileCard({ file, onDownload, onRename, onMove, onDelete }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all group relative select-none">
      <div onDoubleClick={onDownload} className="text-center">
        <div className="flex justify-center mb-2">{fileIconLarge(file.mimeType)}</div>
        <p className="text-xs font-semibold text-gray-900 truncate">{file.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatSize(file.fileSize)}</p>
        <p className="text-xs text-gray-300 mt-0.5">{formatDate(file.createdAt)}</p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={e => { e.stopPropagation(); setMenu(!menu); }} className="p-1 rounded hover:bg-gray-100 text-gray-400">
          <MoreVertical size={13} />
        </button>
        {menu && <ItemMenu hasDownload onDownload={() => { setMenu(false); onDownload(); }} onRename={() => { setMenu(false); onRename(); }} onMove={() => { setMenu(false); onMove(); }} onDelete={() => { setMenu(false); onDelete(); }} />}
      </div>
    </div>
  );
}

function GridView({ subfolders, files, onNavigate, onDownload, onRename, onMove, onDelete }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {subfolders.map(folder => (
        <FolderCard key={folder.id} folder={folder} onOpen={() => onNavigate(folder.id)}
          onRename={() => onRename('folder', folder)} onMove={() => onMove('folder', folder)} onDelete={() => onDelete('folder', folder)} />
      ))}
      {files.map(file => (
        <FileCard key={file.id} file={file} onDownload={() => onDownload(file)}
          onRename={() => onRename('file', file)} onMove={() => onMove('file', file)} onDelete={() => onDelete('file', file)} />
      ))}
    </div>
  );
}

function ListView({ subfolders, files, onNavigate, onDownload, onRename, onMove, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-8"></th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Size</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Modified</th>
            <th className="px-4 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {subfolders.map(folder => {
            const [menu, setMenu] = useState(false);
            const count = (folder._count?.documents ?? 0) + (folder._count?.children ?? 0);
            return (
              <tr key={folder.id} className="hover:bg-gray-50 cursor-pointer group">
                <td className="px-4 py-3"><Folder size={16} className="text-amber-400" /></td>
                <td className="px-4 py-3">
                  <button onClick={() => onNavigate(folder.id)} className="font-medium text-gray-900 hover:text-orange-600 text-left">{folder.name}</button>
                  <span className="text-xs text-gray-400 ml-2">{count} items</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">-</td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{formatDate(folder.createdAt)}</td>
                <td className="px-4 py-3 relative">
                  <button onClick={() => setMenu(!menu)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 text-gray-400">
                    <MoreVertical size={14} />
                  </button>
                  {menu && <ItemMenu onRename={() => { setMenu(false); onRename('folder', folder); }} onMove={() => { setMenu(false); onMove('folder', folder); }} onDelete={() => { setMenu(false); onDelete('folder', folder); }} />}
                </td>
              </tr>
            );
          })}
          {files.map(file => {
            const [menu, setMenu] = useState(false);
            return (
              <tr key={file.id} className="hover:bg-gray-50 cursor-pointer group">
                <td className="px-4 py-3">{fileIconSmall(file.mimeType)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onDownload(file)} className="font-medium text-gray-900 hover:text-blue-600 text-left">{file.name}</button>
                  <p className="text-xs text-gray-400">{file.originalName}</p>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{formatSize(file.fileSize)}</td>
                <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{formatDate(file.createdAt)}</td>
                <td className="px-4 py-3 relative">
                  <button onClick={() => setMenu(!menu)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 text-gray-400">
                    <MoreVertical size={14} />
                  </button>
                  {menu && <ItemMenu hasDownload onDownload={() => { setMenu(false); onDownload(file); }} onRename={() => { setMenu(false); onRename('file', file); }} onMove={() => { setMenu(false); onMove('file', file); }} onDelete={() => { setMenu(false); onDelete('file', file); }} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SidebarNode({ node, currentFolderId, expandedFolders, onNavigate, onToggle, isRoot }) {
  const isActive = currentFolderId === node.id;
  const isExpanded = isRoot || expandedFolders.has(node.id);
  const hasChildren = node.children?.length > 0;
  return (
    <div>
      <div onClick={() => { onNavigate(node.id); if (!isRoot && hasChildren) onToggle(node.id); }}
        className={'flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors group ' + (isActive ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50')}>
        {!isRoot && (
          <span className={'text-gray-400 ' + (hasChildren ? '' : 'invisible')}
            onClick={e => { e.stopPropagation(); onToggle(node.id); }}>
            {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </span>
        )}
        {isRoot
          ? <Home size={14} className={isActive ? 'text-orange-600' : 'text-gray-400'} />
          : isActive ? <FolderOpen size={14} className="text-orange-500" /> : <Folder size={14} className="text-gray-400 group-hover:text-gray-500" />
        }
        <span className="truncate flex-1">{node.name}</span>
        {node._count?.documents > 0 && <span className="text-xs text-gray-400">{node._count.documents}</span>}
      </div>
      {isExpanded && hasChildren && (
        <div className="ml-3 pl-2 border-l border-gray-100">
          {node.children.map(child => (
            <SidebarNode key={child.id} node={child} currentFolderId={currentFolderId}
              expandedFolders={expandedFolders} onNavigate={onNavigate} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocumentCenter() {
  const { currentUser, apiConnected } = usePortal();
  const [allFolders, setAllFolders] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [contents, setContents] = useState({ subfolders: [], files: [] });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [uploadModal, setUploadModal] = useState(false);
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [renameModal, setRenameModal] = useState(null);
  const [moveModal, setMoveModal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const breadcrumb = useMemo(() => {
    if (!currentFolderId) return [];
    return getAncestors(allFolders, currentFolderId);
  }, [allFolders, currentFolderId]);

  const fetchFolders = useCallback(async () => {
    if (!apiConnected) return;
    try {
      const data = await api.getFolders();
      setAllFolders(Array.isArray(data) ? data : []);
    } catch { /* ignore */ }
  }, [apiConnected]);

  const fetchContents = useCallback(async (folderId) => {
    if (!apiConnected) { setContents({ subfolders: [], files: DEMO_FILES }); return; }
    setLoading(true);
    try {
      const data = await api.getFolderContents(folderId ?? 'root');
      setContents(data);
    } catch { setContents({ subfolders: [], files: [] }); }
    finally { setLoading(false); }
  }, [apiConnected]);

  useEffect(() => { fetchFolders(); fetchContents(null); }, [fetchFolders, fetchContents]);

  const navigateTo = (folderId) => {
    setCurrentFolderId(folderId);
    fetchContents(folderId);
    if (folderId) setExpandedFolders(prev => new Set([...prev, folderId]));
  };

  const createFolder = async (name) => {
    if (!apiConnected) { alert('Connect backend to create folders'); return; }
    try {
      const folder = await api.createFolder({ name, parentId: currentFolderId });
      setAllFolders(prev => [...prev, folder]);
      setContents(prev => ({ ...prev, subfolders: [...prev.subfolders, folder] }));
      setNewFolderModal(false);
    } catch (err) { alert(err.message); }
  };

  const renameItem = async (type, item, newName) => {
    if (!newName.trim() || newName === item.name) { setRenameModal(null); return; }
    try {
      if (type === 'folder') {
        const updated = await api.renameFolder(item.id, newName);
        setAllFolders(prev => prev.map(f => f.id === item.id ? { ...f, name: updated.name } : f));
        setContents(prev => ({ ...prev, subfolders: prev.subfolders.map(f => f.id === item.id ? { ...f, name: updated.name } : f) }));
      } else {
        const updated = await api.renameDocument(item.id, newName);
        setContents(prev => ({ ...prev, files: prev.files.map(f => f.id === item.id ? { ...f, name: updated.name } : f) }));
      }
    } catch (err) { alert(err.message); }
    setRenameModal(null);
  };

  const moveItem = async (type, item, targetFolderId) => {
    try {
      if (type === 'folder') {
        await api.moveFolder(item.id, targetFolderId);
        setAllFolders(prev => prev.map(f => f.id === item.id ? { ...f, parentId: targetFolderId } : f));
        setContents(prev => ({ ...prev, subfolders: prev.subfolders.filter(f => f.id !== item.id) }));
      } else {
        await api.moveDocument(item.id, targetFolderId);
        setContents(prev => ({ ...prev, files: prev.files.filter(f => f.id !== item.id) }));
      }
    } catch (err) { alert(err.message); }
    setMoveModal(null);
  };

  const deleteItem = async (type, item) => {
    if (!confirm('Delete "' + item.name + '"? This cannot be undone.')) return;
    try {
      if (type === 'folder') {
        await api.deleteFolder(item.id);
        setAllFolders(prev => prev.filter(f => f.id !== item.id));
        setContents(prev => ({ ...prev, subfolders: prev.subfolders.filter(f => f.id !== item.id) }));
      } else {
        await api.deleteDocument(item.id);
        setContents(prev => ({ ...prev, files: prev.files.filter(f => f.id !== item.id) }));
      }
    } catch (err) { alert(err.message); }
  };

  const handleUpload = async (file, category, description, taxYear) => {
    setUploadError('');
    setUploading(true);
    if (!apiConnected) {
      await new Promise(r => setTimeout(r, 1000));
      setContents(prev => ({ ...prev, files: [{ id: 'd' + Date.now(), name: file.name.replace(/\.[^.]+$/, ''), originalName: file.name, mimeType: file.type, fileSize: file.size, createdAt: new Date().toISOString(), fileUrl: null }, ...prev.files] }));
      setUploading(false); setUploadModal(false); return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      if (currentFolderId) formData.append('folderId', currentFolderId);
      if (description) formData.append('description', description);
      if (taxYear) formData.append('taxYear', String(taxYear));
      const { document } = await api.uploadDocument(formData);
      setContents(prev => ({ ...prev, files: [document, ...prev.files] }));
      setUploadModal(false);
    } catch (err) { setUploadError(err.message ?? 'Upload failed'); }
    finally { setUploading(false); }
  };

  const handleDownload = async (doc) => {
    if (doc.fileUrl) {
      try { const { url } = await api.getDocumentUrl(doc.id); window.open(url, '_blank', 'noopener,noreferrer'); }
      catch { window.open(doc.fileUrl, '_blank', 'noopener,noreferrer'); }
    } else { alert('This is a demo file - no actual file stored.'); }
  };

  const filteredSubfolders = contents.subfolders.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()));
  const filteredFiles = contents.files.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.originalName?.toLowerCase().includes(search.toLowerCase()));
  const tree = buildTree(allFolders);

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 56px)' }}>
      <aside className="w-60 border-r border-gray-200 bg-white flex flex-col flex-shrink-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">Folders</span>
          <button onClick={() => setNewFolderModal(true)} className="text-orange-500 hover:text-orange-600" title="New folder">
            <FolderPlus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <SidebarNode node={{ id: null, name: 'All Documents', children: tree, _count: {} }}
            currentFolderId={currentFolderId} expandedFolders={expandedFolders}
            onNavigate={navigateTo} onToggle={id => setExpandedFolders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; })} isRoot />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm flex-1 min-w-0">
            <button onClick={() => navigateTo(null)} className="flex items-center gap-1 text-gray-500 hover:text-orange-600 transition-colors">
              <Home size={14} />
            </button>
            {breadcrumb.map((crumb, i) => (
              <div key={crumb.id} className="flex items-center gap-1">
                <ChevronRight size={13} className="text-gray-300" />
                <button onClick={() => navigateTo(crumb.id)}
                  className={'truncate max-w-32 hover:text-orange-600 transition-colors ' + (i === breadcrumb.length - 1 ? 'text-gray-900 font-semibold' : 'text-gray-500')}>
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 w-36" />
            </div>
            <button onClick={() => setNewFolderModal(true)} className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600 px-3 py-1.5 rounded-lg transition-colors">
              <FolderPlus size={14} /> New Folder
            </button>
            <button onClick={() => setUploadModal(true)} className="flex items-center gap-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">
              <Upload size={14} /> Upload
            </button>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={'p-1.5 ' + (viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-600')}><Grid size={14} /></button>
              <button onClick={() => setViewMode('list')} className={'p-1.5 ' + (viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-600')}><List size={14} /></button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="flex items-center justify-center h-48 text-sm text-gray-400">Loading...</div>
          ) : filteredSubfolders.length === 0 && filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Folder size={40} className="text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-500">{search ? 'No results found' : 'This folder is empty'}</p>
              <p className="text-xs text-gray-400 mt-1">{search ? 'Try a different search term' : 'Upload files or create subfolders'}</p>
            </div>
          ) : viewMode === 'grid' ? (
            <GridView subfolders={filteredSubfolders} files={filteredFiles} onNavigate={navigateTo}
              onDownload={handleDownload} onRename={(t, i) => setRenameModal({ type: t, item: i })}
              onMove={(t, i) => setMoveModal({ type: t, item: i })} onDelete={deleteItem} />
          ) : (
            <ListView subfolders={filteredSubfolders} files={filteredFiles} onNavigate={navigateTo}
              onDownload={handleDownload} onRename={(t, i) => setRenameModal({ type: t, item: i })}
              onMove={(t, i) => setMoveModal({ type: t, item: i })} onDelete={deleteItem} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {newFolderModal && <NewFolderModal onClose={() => setNewFolderModal(false)} onCreate={createFolder} />}
        {uploadModal && <UploadModal folderName={breadcrumb[breadcrumb.length - 1]?.name ?? 'Root'} onClose={() => { setUploadModal(false); setUploadError(''); }} onUpload={handleUpload} uploading={uploading} error={uploadError} />}
        {renameModal && <RenameModal item={renameModal.item} type={renameModal.type} onClose={() => setRenameModal(null)} onRename={name => renameItem(renameModal.type, renameModal.item, name)} />}
        {moveModal && <MoveModal item={moveModal.item} type={moveModal.type} allFolders={allFolders} onClose={() => setMoveModal(null)} onMove={targetId => moveItem(moveModal.type, moveModal.item, targetId)} />}
      </AnimatePresence>
    </div>
  );
}
