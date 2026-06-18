import { useState } from 'react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';
import { Link } from 'react-router-dom';

const ROLE_COLOR = { CLIENT:'bg-blue-500', ACCOUNTANT:'bg-green-600', BOOKKEEPER:'bg-purple-600', TAX_SPECIALIST:'bg-yellow-600', ADMIN:'bg-red-600', SUPPORT:'bg-teal-600' };

export default function ClientsPage() {
  const { currentUser, tasks, filings, getTasksForUser } = usePortal();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const clients = MOCK_USERS.filter(u => u.role === 'CLIENT');
  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const clientTasks = (uid) => tasks.filter(t => t.clientId === uid);
  const clientFilings = (uid) => filings.filter(f => f.clientId === uid);
  const assignedStaff = (uid) => {
    const accountant = MOCK_USERS.find(u => u.id === 'u3');
    const bookkeeper = MOCK_USERS.find(u => u.id === 'u4');
    const taxSpec = MOCK_USERS.find(u => u.id === 'u5');
    return { accountant, bookkeeper, taxSpec };
  };

  if (selected) {
    const client = MOCK_USERS.find(u => u.id === selected);
    const myTasks = clientTasks(selected);
    const myFilings = clientFilings(selected);
    const { accountant, bookkeeper, taxSpec } = assignedStaff(selected);
    const pending = myTasks.filter(t => t.status !== 'COMPLETED');
    const completed = myTasks.filter(t => t.status === 'COMPLETED');
    const pct = myTasks.length ? Math.round((completed.length / myTasks.length) * 100) : 0;

    return (
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelected(null)} className="text-sm text-orange-500 hover:underline">← All Clients</button>
        </div>

        {/* Client header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white text-2xl font-bold flex items-center justify-center">{client.avatar}</div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-500">{client.company}</p>
            <p className="text-sm text-gray-400">{client.email}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Completion</p>
            <p className="text-2xl font-bold text-orange-500">{pct}%</p>
            <div className="w-24 h-2 bg-gray-100 rounded-full mt-1 ml-auto">
              <div className="h-full bg-orange-500 rounded-full" style={{ width:`${pct}%` }} />
            </div>
          </div>
        </div>

        {/* Assigned staff */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Assigned Team</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label:'Accountant', user:accountant },
              { label:'Bookkeeper', user:bookkeeper },
              { label:'Tax Specialist', user:taxSpec },
            ].map(({ label, user }) => user ? (
              <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-9 h-9 rounded-full ${ROLE_COLOR[user.role]} text-white text-xs font-bold flex items-center justify-center`}>{user.avatar}</div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                </div>
              </div>
            ) : null)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Tasks ({pending.length} pending)</h2>
              <Link to="/portal/tasks" className="text-xs text-orange-500 hover:underline">Go to Task Manager →</Link>
            </div>
            <div className="space-y-2">
              {pending.slice(0,6).map(t => (
                <div key={t.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.status === 'IN_PROGRESS' ? 'bg-blue-500' : t.status === 'IN_REVIEW' ? 'bg-yellow-500' : t.status === 'BLOCKED' ? 'bg-red-500' : 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{t.title}</p>
                    <p className="text-xs text-gray-400">{t.category} · {t.status.replace('_',' ')}</p>
                  </div>
                  {t.dueDate && <span className="text-xs text-gray-400 flex-shrink-0">{t.dueDate}</span>}
                </div>
              ))}
              {pending.length === 0 && <p className="text-sm text-gray-400">All tasks complete!</p>}
            </div>
          </div>

          {/* Tax filings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Tax Filings</h2>
            <div className="space-y-3">
              {myFilings.map(f => (
                <div key={f.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{f.type}</p>
                    <p className="text-xs text-gray-400">{f.taxYear} · Due {f.dueDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.status === 'FILED' ? 'bg-green-100 text-green-700' : f.status === 'PREPARING' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{f.status.replace('_',' ')}</span>
                </div>
              ))}
              {myFilings.length === 0 && <p className="text-sm text-gray-400">No filings on record.</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">{clients.length} total clients</p>
        </div>
        {currentUser.role === 'ADMIN' && (
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">+ Add Client</button>
        )}
      </div>
      <div className="mb-4">
        <input type="text" placeholder="Search by name, company, or email…" value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tasks</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Progress</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(c => {
              const ct = clientTasks(c.id);
              const done = ct.filter(t => t.status === 'COMPLETED').length;
              const pct = ct.length ? Math.round((done / ct.length) * 100) : 0;
              return (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelected(c.id)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">{c.avatar}</div>
                      <div>
                        <p className="font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">{ct.filter(t => t.status !== 'COMPLETED').length} pending</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width:`${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-orange-500 text-sm">→</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No clients found</p>}
      </div>
    </div>
  );
}
