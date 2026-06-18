import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePortal } from './portalStore';
import { MOCK_USERS, WORKFLOWS } from './portalData';

function userName(id) {
  return MOCK_USERS.find(u => u.id === id)?.name || 'Unassigned';
}

function isOverdue(dueDate, status) {
  if (!dueDate || status === 'COMPLETED') return false;
  return new Date(dueDate) < new Date();
}

const PRIORITY_STYLES = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
};

const STATUS_STYLES = {
  PENDING: 'bg-gray-100 text-gray-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  IN_REVIEW: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  BLOCKED: 'bg-red-100 text-red-700',
};

const STATUS_LABELS = {
  PENDING: 'Pending', IN_PROGRESS: 'In Progress', IN_REVIEW: 'In Review',
  COMPLETED: 'Completed', BLOCKED: 'Blocked',
};

// ─── CLIENT DASHBOARD ───────────────────────────────────────────────
function ClientDashboard({ user, tasks }) {
  const pending = tasks.filter(t => t.status !== 'COMPLETED');
  const completed = tasks.filter(t => t.status === 'COMPLETED');
  const overdue = tasks.filter(t => isOverdue(t.dueDate, t.status));

  const taxTasks = pending.filter(t => t.category === 'TAX');
  const docTasks = pending.filter(t => t.category === 'DOCUMENTS');

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-orange-100 mt-1">{user.company}</p>
        <div className="flex gap-6 mt-4 text-sm">
          <div><p className="text-orange-200">Pending Actions</p><p className="text-2xl font-bold">{pending.length}</p></div>
          <div><p className="text-orange-200">Completed</p><p className="text-2xl font-bold">{completed.length}</p></div>
          {overdue.length > 0 && <div><p className="text-orange-200">Overdue</p><p className="text-2xl font-bold text-red-200">{overdue.length}</p></div>}
        </div>
      </div>

      {/* Overdue alert */}
      {overdue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-500 text-lg">⚠</span>
          <div>
            <p className="font-semibold text-red-800 text-sm">You have {overdue.length} overdue task{overdue.length > 1 ? 's' : ''}</p>
            <p className="text-red-600 text-xs mt-0.5">Please complete these as soon as possible to avoid delays.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Your Action Items</h2>
            <Link to="/portal/tasks" className="text-xs text-orange-500 hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {pending.slice(0, 5).map(task => (
              <div key={task.id} className={`flex items-start gap-3 p-3 rounded-lg border ${isOverdue(task.dueDate, task.status) ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isOverdue(task.dueDate, task.status) ? 'bg-red-500' : 'bg-orange-400'}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-snug">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${PRIORITY_STYLES[task.priority]}`}>{task.priority}</span>
                    {task.dueDate && <span className={`text-xs ${isOverdue(task.dueDate, task.status) ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>Due {task.dueDate}</span>}
                  </div>
                </div>
              </div>
            ))}
            {pending.length === 0 && <p className="text-sm text-gray-400 text-center py-4">All tasks completed! 🎉</p>}
          </div>
        </div>

        {/* Tax & Document reminders */}
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <h2 className="font-semibold text-purple-900 mb-3">🧾 Tax Tasks</h2>
            {taxTasks.length === 0
              ? <p className="text-sm text-purple-400">No pending tax tasks</p>
              : taxTasks.slice(0, 3).map(t => (
                <div key={t.id} className="text-sm text-purple-800 mb-1">• {t.title}</div>
              ))}
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
            <h2 className="font-semibold text-sky-900 mb-3">📄 Document Requests</h2>
            {docTasks.length === 0
              ? <p className="text-sm text-sky-400">No pending document requests</p>
              : docTasks.slice(0, 3).map(t => (
                <div key={t.id} className="text-sm text-sky-800 mb-1">• {t.title}</div>
              ))}
          </div>
        </div>
      </div>

      {/* Service status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Service Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Bookkeeping', status: 'Active', color: 'text-green-600', bg: 'bg-green-50' },
            { name: 'Tax Prep', status: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50' },
            { name: 'Payroll', status: 'Not Active', color: 'text-gray-400', bg: 'bg-gray-50' },
            { name: 'Tax Advisory', status: 'Active', color: 'text-green-600', bg: 'bg-green-50' },
          ].map(s => (
            <div key={s.name} className={`${s.bg} rounded-lg p-3`}>
              <p className="text-xs text-gray-500 font-medium">{s.name}</p>
              <p className={`text-sm font-semibold mt-1 ${s.color}`}>{s.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STAFF DASHBOARD ───────────────────────────────────────────────
function StaffDashboard({ user, tasks, allTasks }) {
  const myTasks = tasks;
  const pending = myTasks.filter(t => t.status !== 'COMPLETED');
  const overdue = myTasks.filter(t => isOverdue(t.dueDate, t.status));
  const inProgress = myTasks.filter(t => t.status === 'IN_PROGRESS');

  const clientMap = useMemo(() => {
    const map = {};
    allTasks.forEach(t => {
      if (!t.clientId) return;
      if (!map[t.clientId]) map[t.clientId] = { total: 0, pending: 0 };
      map[t.clientId].total++;
      if (t.status !== 'COMPLETED') map[t.clientId].pending++;
    });
    return map;
  }, [allTasks]);

  const clients = MOCK_USERS.filter(u => u.role === 'CLIENT' && clientMap[u.id]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'My Tasks', value: myTasks.length, icon: '📋', color: 'bg-white' },
          { label: 'In Progress', value: inProgress.length, icon: '🔄', color: 'bg-blue-50' },
          { label: 'Overdue', value: overdue.length, icon: '⚠', color: overdue.length ? 'bg-red-50' : 'bg-white' },
          { label: 'Clients', value: clients.length, icon: '👥', color: 'bg-white' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-xl border border-gray-200 p-5`}>
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work queue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">My Work Queue</h2>
            <Link to="/portal/tasks" className="text-xs text-orange-500 hover:underline">Full task manager →</Link>
          </div>
          <div className="space-y-2">
            {pending.slice(0, 8).map(task => (
              <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg border hover:border-orange-200 transition-colors cursor-pointer ${isOverdue(task.dueDate, task.status) ? 'border-red-100 bg-red-50' : 'border-gray-100'}`}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${task.status === 'IN_PROGRESS' ? 'bg-blue-500' : task.status === 'IN_REVIEW' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{userName(task.clientId) !== 'Unassigned' ? `Client: ${userName(task.clientId)}` : ''}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[task.status]}`}>{STATUS_LABELS[task.status]}</span>
                  {task.dueDate && <span className={`text-xs ${isOverdue(task.dueDate, task.status) ? 'text-red-500 font-bold' : 'text-gray-400'}`}>{task.dueDate}</span>}
                </div>
              </div>
            ))}
            {pending.length === 0 && <p className="text-center text-gray-400 text-sm py-6">All caught up! 🎉</p>}
          </div>
        </div>

        {/* Client list */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Assigned Clients</h2>
          <div className="space-y-3">
            {clients.map(client => {
              const cm = clientMap[client.id];
              const pct = cm ? Math.round(((cm.total - cm.pending) / cm.total) * 100) : 0;
              return (
                <div key={client.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    <span className="text-xs text-gray-400">{cm?.pending} pending</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{client.company}</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{pct}% complete</p>
                </div>
              );
            })}
            {clients.length === 0 && <p className="text-sm text-gray-400">No clients assigned yet.</p>}
          </div>
        </div>
      </div>

      {/* Workflow overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Active Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(WORKFLOWS).map(([key, wf]) => {
            const wfTasks = allTasks.filter(t => t.workflow === key);
            const done = wfTasks.filter(t => t.status === 'COMPLETED').length;
            const pct = wfTasks.length ? Math.round((done / wfTasks.length) * 100) : 0;
            return (
              <div key={key} className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">{wf.name}</h3>
                <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-500">{done}/{wfTasks.length} tasks complete</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───────────────────────────────────────────────
function AdminDashboard({ user, tasks }) {
  const byStatus = {
    PENDING: tasks.filter(t => t.status === 'PENDING').length,
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    IN_REVIEW: tasks.filter(t => t.status === 'IN_REVIEW').length,
    COMPLETED: tasks.filter(t => t.status === 'COMPLETED').length,
    BLOCKED: tasks.filter(t => t.status === 'BLOCKED').length,
  };
  const overdue = tasks.filter(t => isOverdue(t.dueDate, t.status));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Platform overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Pending', value: byStatus.PENDING, color: 'bg-gray-100 text-gray-700' },
          { label: 'In Progress', value: byStatus.IN_PROGRESS, color: 'bg-blue-100 text-blue-700' },
          { label: 'In Review', value: byStatus.IN_REVIEW, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Completed', value: byStatus.COMPLETED, color: 'bg-green-100 text-green-700' },
          { label: 'Blocked', value: byStatus.BLOCKED, color: 'bg-red-100 text-red-700' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color.split(' ')[1]}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Team Overview</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned Tasks</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_USERS.map(u => {
              const myTasks = tasks.filter(t => t.assignedTo === u.id || t.clientId === u.id);
              const done = myTasks.filter(t => t.status === 'COMPLETED').length;
              return (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-medium text-gray-900">{u.name}</td>
                  <td className="py-2.5 px-3"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{u.role}</span></td>
                  <td className="py-2.5 px-3 text-gray-600">{myTasks.length}</td>
                  <td className="py-2.5 px-3 text-green-600 font-medium">{done}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {overdue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h2 className="font-semibold text-red-900 mb-3">⚠ Overdue Tasks ({overdue.length})</h2>
          <div className="space-y-2">
            {overdue.map(t => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <span className="text-red-800">{t.title}</span>
                <span className="text-red-500 text-xs">{t.dueDate} · {userName(t.assignedTo)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────
export default function Dashboard() {
  const { currentUser, getTasksForUser, tasks: allTasks } = usePortal();
  const tasks = getTasksForUser(currentUser);

  if (currentUser.role === 'CLIENT') return <ClientDashboard user={currentUser} tasks={tasks} />;
  if (currentUser.role === 'ADMIN') return <AdminDashboard user={currentUser} tasks={allTasks} />;
  return <StaffDashboard user={currentUser} tasks={tasks} allTasks={allTasks} />;
}
