import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal } from './portalStore';

const CATEGORIES = [
  { value: 'ALL', label: 'All Files' },
  { value: 'TAX_RETURN', label: 'Tax Returns' },
  { value: 'BANK_STATEMENT', label: 'Bank Statements' },
  { value: 'PAYROLL', label: 'Payroll' },
  { value: 'FINANCIAL_REPORT', label: 'Financial Reports' },
  { value: 'LEGAL', label: 'Legal Documents' },
  { value: 'IDENTIFICATION', label: 'Identification' },
  { value: 'OTHER', label: 'Other' },
];

const CATEGORY_COLORS = {
  TAX_RETURN: 'bg-purple-100 text-purple-700',
  BANK_STATEMENT: 'bg-blue-100 text-blue-700',
  PAYROLL: 'bg-indigo-100 text-indigo-700',
  FINANCIAL_REPORT: 'bg-teal-100 text-teal-700',
  LEGAL: 'bg-red-100 text-red-700',
  IDENTIFICATION: 'bg-yellow-100 text-yellow-700',
  OTHER: 'bg-gray-100 text-gray-600',
};

const FILE_ICONS = {
  'application/pdf': '📄',
  'image/jpeg': '🖼',
  'image/png': '🖼',
  'image/webp': '🖼',
  'application/msword': '📝',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
  'application/vnd.ms-excel': '📊',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
  'text/csv': '📊',
};

function fileIcon(mime) { return FILE_ICONS[mime] ?? '📎'; }
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Mock documents for the frontend prototype (will be replaced by API calls)
const MOCK_DOCS = [
  { id: 'd1', name: '2024 Federal Tax Return', originalName: '2024_federal_return.pdf', mimeType: 'application/pdf', category: 'TAX_RETURN', fileSize: 2340000, taxYear: 2024, createdAt: '2025-06-01', description: 'Filed federal return for 2024' },
  { id: 'd2', name: 'January Bank Statement', originalName: 'jan_2025_statement.pdf', mimeType: 'application/pdf', category: 'BANK_STATEMENT', fileSize: 540000, taxYear: null, createdAt: '2025-06-05', description: null },
  { id: 'd3', name: 'Q1 P&L Report', originalName: 'q1_2025_pnl.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', category: 'FINANCIAL_REPORT', fileSize: 180000, taxYear: null, createdAt: '2025-06-10', description: 'Profit & Loss for Q1 2025' },
  { id: 'd4', name: 'W-2 Form 2024', originalName: 'w2_2024.pdf', mimeType: 'application/pdf', category: 'TAX_RETURN', fileSize: 210000, taxYear: 2024, createdAt: '2025-05-20', description: null },
];

export default function DocumentCenter() {
  const { currentUser } = usePortal();
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileInputRef = useRef();

  const filtered = docs.filter(d => {
    const matchCat = filterCategory === 'ALL' || d.category === filterCategory;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.originalName.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploadModal(true);
    }
  }, []);

  const simulateUpload = (file, category, description, taxYear) => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadProgress(null);
          setUploadModal(false);
          // Add mock uploaded doc
          setDocs(prev => [{
            id: `d${Date.now()}`,
            name: file.name.replace(/\.[^.]+$/, ''),
            originalName: file.name,
            mimeType: file.type || 'application/octet-stream',
            category,
            fileSize: file.size,
            taxYear: taxYear || null,
            description: description || null,
            createdAt: new Date().toISOString().split('T')[0],
          }, ...prev]);
          return 0;
        }
        return p + 10;
      });
    }, 150);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Center</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {currentUser.role === 'CLIENT' ? 'Upload and manage your documents securely' : 'Client document repository'}
          </p>
        </div>
        <button
          onClick={() => setUploadModal(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          ↑ Upload File
        </button>
      </div>

      {/* Storage info banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="text-2xl">☁</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-900">Powered by Supabase Storage</p>
          <p className="text-xs text-blue-600 mt-0.5">Files are encrypted at rest and served via signed URLs. Max 25MB per file.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-blue-500">{docs.length} files stored</p>
          <p className="text-xs text-blue-400">{formatSize(docs.reduce((sum, d) => sum + d.fileSize, 0))} used</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-40">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setFilterCategory(c.value)}
              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-colors ${
                filterCategory === c.value
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 cursor-pointer transition-all ${
          dragging ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
        }`}
      >
        <input ref={fileInputRef} type="file" className="hidden" multiple onChange={e => { if (e.target.files.length) setUploadModal(true); }} />
        <p className="text-3xl mb-2">📂</p>
        <p className="text-sm font-medium text-gray-700">Drop files here or click to browse</p>
        <p className="text-xs text-gray-400 mt-1">PDF, Word, Excel, Images — up to 25MB each</p>
      </div>

      {/* Document grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500 font-medium">No documents found</p>
          <p className="text-gray-400 text-sm mt-1">Upload your first document above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(doc => (
            <DocCard key={doc.id} doc={doc} onDelete={id => setDocs(prev => prev.filter(d => d.id !== id))} />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModal && (
          <UploadModal
            onClose={() => setUploadModal(false)}
            onUpload={simulateUpload}
            uploading={uploading}
            progress={uploadProgress}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DocCard({ doc, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = () => {
    // In production: call GET /api/documents/:id/url then open signed URL
    alert('In production this downloads from Supabase Storage via a signed URL.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow group relative"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{fileIcon(doc.mimeType)}</div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[doc.category] ?? 'bg-gray-100 text-gray-600'}`}>
            {doc.category.replace(/_/g, ' ')}
          </span>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-gray-600 text-xl leading-none opacity-0 group-hover:opacity-100 transition-opacity"
            >⋮</button>
            {menuOpen && (
              <div className="absolute right-0 top-6 bg-white shadow-lg border border-gray-200 rounded-lg z-10 w-36 overflow-hidden">
                <button onClick={() => { handleDownload(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">⬇ Download</button>
                <button onClick={() => { onDelete(doc.id); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">🗑 Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="font-semibold text-gray-900 text-sm leading-snug mb-1 truncate">{doc.name}</p>
      <p className="text-xs text-gray-400 truncate mb-3">{doc.originalName}</p>

      {doc.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{doc.description}</p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {doc.taxYear && <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">{doc.taxYear}</span>}
          <span className="text-xs text-gray-400">{formatSize(doc.fileSize)}</span>
        </div>
        <span className="text-xs text-gray-400">{doc.createdAt}</span>
      </div>

      <button
        onClick={handleDownload}
        className="mt-3 w-full text-xs text-center bg-gray-50 hover:bg-orange-50 hover:text-orange-600 text-gray-500 py-1.5 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors"
      >
        ⬇ Download
      </button>
    </motion.div>
  );
}

function UploadModal({ onClose, onUpload, uploading, progress }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('OTHER');
  const [description, setDescription] = useState('');
  const [taxYear, setTaxYear] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (f) => setFile(f);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onUpload(file, category, description, taxYear ? parseInt(taxYear) : null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Upload Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragging ? 'border-orange-400 bg-orange-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <input ref={inputRef} type="file" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            {file ? (
              <>
                <p className="text-2xl mb-1">{fileIcon(file.type)}</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatSize(file.size)}</p>
              </>
            ) : (
              <>
                <p className="text-2xl mb-1">📂</p>
                <p className="text-sm text-gray-600">Drop file here or click to browse</p>
                <p className="text-xs text-gray-400 mt-0.5">PDF, Word, Excel, Images — max 25MB</p>
              </>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
              {CATEGORIES.filter(c => c.value !== 'ALL').map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Year (optional)</label>
            <input type="number" placeholder="e.g. 2024" value={taxYear} onChange={e => setTaxYear(e.target.value)} min="2000" max="2099" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <input type="text" placeholder="e.g. January 2025 bank statement" value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          {/* Upload progress */}
          {uploading && progress !== null && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Uploading to Supabase Storage…</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <motion.div
                  className="h-full bg-orange-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={uploading} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={!file || uploading} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-semibold transition-colors">
              {uploading ? 'Uploading…' : '↑ Upload'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
