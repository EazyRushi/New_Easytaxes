import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal } from './portalStore';
import { MOCK_USERS, TASK_STATUS, TASK_PRIORITY, TASK_CATEGORY } from './portalData';
import TaskModal from './TaskModal';

const STATUS_COLS = [
  { key: 'PENDING', label: 'Pending', color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' },
  { key: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  { key: 'IN_REVIEW', label: 'In Review', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  { key: 'COMPLETED', label: 'Completed', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  { key: 'BLOCKED', label: 'Blocked', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
];

const PRIORITY_STYLES = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
};

const PRIORITY_ICONS = { LOW: '↓', MEDIUM: '→', HIGH: '↑', URGENT: '⚡' };

const CATEGORY_STYLES = {
  TAX: 'bg-purple-100 text-purple-700',
  BOOKKEEPING: 'bg-teal-100 text-teal-700',
  PAYROLL: 'bg-indigo-100 text-indigo-700',
  DOCUMENTS: 'bg-sky-100 text-sky-700',
  ONBOARDING: 'bg-green-100 text-green-700',
  COMPLIANCE: 'bg-pink-100 text-pink-700',
  GENERAL: 'bg-gray-100 text-gray-600',
};

function userName(id) {
  const u = MOCK_USERS.find(u => u.id === id);
  return u ? u.name : 'Unassigned';
}

function isOverdue(dueDate, status) {
  if (!dueDate || status === 'COMPLETED') return false;
  return new Date(dueDate) < new Date();
}

export default function TaskManager() {
  const { currentUser, getTasksForUser, createTask, updateTask, deleteTask } = usePortal();
  const [view, setView] = useState('list'); // 'list' | 'board'
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'status' | 'createdAt'
  const [modal, setModal] = useState(null); // null | { mode: 'create' | 'edit', task? }

  const allTasks = getTasksForUser(currentUser);

  const filtered = useMemo(() => {
    let list = allTasks;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q));
    }
    if (filterStatus !== 'ALL') list = list.filter(t => t.status === filterStatus);
    if (filterPriority !== 'ALL') list = list.filter(t => t.priority === filterPriority);
    if (filterCategory !== 'ALL') list = list.filter(t => t.category === filterCategory);

    const PRIORITY_ORDER = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return [...list].sort((a, b) => {
      if (sortBy === 'priority') return (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3);
      if (sortBy === 'dueDate') return (a.dueDate || '9999') < (b.dueDate || '9999') ? -1 : 1;
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [allTasks, search, filterStatus, filterPriority, filterCategory, sortBy]);

  const stats = useMemo(() => ({
    total: allTasks.length,
    pending: allTasks.filter(t => t.status === 'PENDING').length,
    inProgress: allTasks.filter(t => t.status === 'IN_PROGRESS').length,
    completed: allTasks.filter(t => t.status === 'COMPLETED').length,
    overdue: allTasks.filter(t => isOverdue(t.dueDate, t.status)).length,
  }), [allTasks]);

  const canCreate = currentUser.role !== 'CLIENT' || true; // clients can request tasks too

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {currentUser.role === 'CLIENT' ? 'Your pending actions and tasks' : 'Manage client tasks and workflow'}
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + New Task
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'text-gray-900', bg: 'bg-white' },
          { label: 'Pending', value: stats.pending, color: 'text-gray-600', bg: 'bg-white' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Completed', value: stats.completed, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Overdue', value: stats.overdue, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl border border-gray-200 p-4`}>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-40">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search tasks…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Filters */}
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
            <option value="ALL">All Status</option>
            {STATUS_COLS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>

          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
            <option value="ALL">All Priority</option>
            {Object.keys(TASK_PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
            <option value="ALL">All Categories</option>
            {Object.keys(TASK_CATEGORY).map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="status">Sort: Status</option>
            <option value="createdAt">Sort: Newest</option>
          </select>

          {/* View toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden ml-auto">
            <button onClick={() => setView('list')} className={`px-3 py-2 text-sm ${view === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>List</button>
            <button onClick={() => setView('board')} className={`px-3 py-2 text-sm ${view === 'board' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>Board</button>
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <ListView tasks={filtered} onEdit={t => setModal({ mode: 'edit', task: t })} onDelete={deleteTask} onStatusChange={updateTask} />
      ) : (
        <BoardView tasks={filtered} onEdit={t => setModal({ mode: 'edit', task: t })} onStatusChange={updateTask} />
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <TaskModal
            mode={modal.mode}
            task={modal.task}
            currentUser={currentUser}
            onSave={(data) => {
              if (modal.mode === 'create') createTask(data);
              else updateTask(modal.task.id, data);
              setModal(null);
            }}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ListView({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-gray-500 font-medium">No tasks found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or create a new task.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-8"></th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Task</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Priority</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Assigned To</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Due</th>
            <th className="px-4 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TaskRow({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overdue = isOverdue(task.dueDate, task.status);
  const col = STATUS_COLS.find(s => s.key === task.status);

  const nextStatus = () => {
    const order = ['PENDING', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'];
    const idx = order.indexOf(task.status);
    if (idx < order.length - 1) onStatusChange(task.id, { status: order[idx + 1] });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-4 py-3">
        <button
          onClick={nextStatus}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'COMPLETED' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 hover:border-orange-400'}`}
          title="Advance status"
        >
          {task.status === 'COMPLETED' && <span className="text-xs">✓</span>}
        </button>
      </td>
      <td className="px-4 py-3">
        <p className={`font-medium text-gray-900 ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
        {task.description && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{task.description}</p>}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_STYLES[task.category] || 'bg-gray-100 text-gray-600'}`}>{task.category}</span>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
          {PRIORITY_ICONS[task.priority]} {task.priority}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${col?.color}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${col?.dot} mr-1`} />
          {col?.label}
        </span>
      </td>
      <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">{userName(task.assignedTo)}</td>
      <td className="px-4 py-3 hidden md:table-cell">
        {task.dueDate && (
          <span className={`text-xs ${overdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
            {overdue && '⚠ '}{task.dueDate}
          </span>
        )}
      </td>
      <td className="px-4 py-3 relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 text-lg leading-none">⋮</button>
        {menuOpen && (
          <div className="absolute right-8 top-2 bg-white shadow-lg border border-gray-200 rounded-lg z-10 overflow-hidden w-36">
            <button onClick={() => { onEdit(task); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Edit</button>
            <button onClick={() => { onDelete(task.id); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
}

function BoardView({ tasks, onEdit, onStatusChange }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STATUS_COLS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.key);
        return (
          <div key={col.key} className="flex-shrink-0 w-72">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${col.color}`}>
              <span className={`w-2 h-2 rounded-full ${col.dot}`} />
              <span className="font-semibold text-sm">{col.label}</span>
              <span className="ml-auto text-xs font-bold opacity-70">{colTasks.length}</span>
            </div>
            <div className="space-y-3">
              {colTasks.map(task => (
                <BoardCard key={task.id} task={task} col={col} onEdit={onEdit} onStatusChange={onStatusChange} />
              ))}
              {colTasks.length === 0 && (
                <div className="text-center py-8 text-gray-300 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BoardCard({ task, onEdit, onStatusChange }) {
  const overdue = isOverdue(task.dueDate, task.status);

  const moveNext = () => {
    const order = ['PENDING', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'];
    const idx = order.indexOf(task.status);
    if (idx < order.length - 1) onStatusChange(task.id, { status: order[idx + 1] });
  };

  const movePrev = () => {
    const order = ['PENDING', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'];
    const idx = order.indexOf(task.status);
    if (idx > 0) onStatusChange(task.id, { status: order[idx - 1] });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onEdit(task)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
          {PRIORITY_ICONS[task.priority]} {task.priority}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_STYLES[task.category] || 'bg-gray-100 text-gray-600'}`}>{task.category}</span>
      </div>
      <p className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{task.title}</p>
      {task.description && <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">{userName(task.assignedTo).split(' ')[0]}</span>
        {task.dueDate && (
          <span className={`text-xs ${overdue ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
            {overdue && '⚠ '}{task.dueDate}
          </span>
        )}
      </div>
      {/* Move buttons */}
      <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
        {task.status !== 'PENDING' && (
          <button onClick={movePrev} className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 rounded py-1 transition-colors">← Back</button>
        )}
        {task.status !== 'COMPLETED' && (
          <button onClick={moveNext} className="flex-1 text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 rounded py-1 transition-colors">Next →</button>
        )}
      </div>
    </motion.div>
  );
}
