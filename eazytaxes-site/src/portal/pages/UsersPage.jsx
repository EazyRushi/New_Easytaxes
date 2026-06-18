import { useState } from 'react';
import { usePortal } from '../portalStore';
import { ROLES } from '../portalData';

const ROLE_STYLE = {
  CLIENT:         'bg-gray-100 text-gray-600',
  ACCOUNTANT:     'bg-blue-100 text-blue-700',
  BOOKKEEPER:     'bg-indigo-100 text-indigo-700',
  TAX_SPECIALIST: 'bg-purple-100 text-purple-700',
  ADMIN:          'bg-orange-100 text-orange-700',
  SUPPORT:        'bg-teal-100 text-teal-700',
};

const BLANK = { name:'', email:'', role:'CLIENT', company:'', phone:'' };

export default function UsersPage() {
  const { users = [], currentUser } = usePortal();
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'create' | user object
  const [form, setForm] = useState(BLANK);

  const allUsers = users.length ? users : [];

  const filtered = allUsers.filter(u => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  const openEdit = (u) => { setForm({ name:u.name, email:u.email, role:u.role, company:u.company??'', phone:u.phone??'' }); setModal(u); };
  const openCreate = () => { setForm(BLANK); setModal('create'); };

  const roleList = Object.values(ROLES ?? { CLIENT:'CLIENT', ACCOUNTANT:'ACCOUNTANT', BOOKKEEPER:'BOOKKEEPER', TAX_SPECIALIST:'TAX_SPECIALIST', ADMIN:'ADMIN', SUPPORT:'SUPPORT' });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">{allUsers.length} total users across all roles</p>
        </div>
        <button onClick={openCreate} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">+ Add User</button>
      </div>

      {/* Role stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-5">
        {roleList.map(r => (
          <div key={r} onClick={() => setRoleFilter(roleFilter===r ? 'ALL' : r)} className={`rounded-xl border p-3 text-center cursor-pointer transition-all ${roleFilter===r ? 'ring-2 ring-orange-400' : ''} ${ROLE_STYLE[r] ? '' : 'bg-white border-gray-200'}`}>
            <p className="text-xl font-bold text-gray-900">{allUsers.filter(u=>u.role===r).length}</p>
            <p className="text-xs text-gray-500 truncate">{r.replace('_',' ')}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email…" className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 flex-1 min-w-40" />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
          <option value="ALL">All Roles</option>
          {roleList.map(r => <option key={r} value={r}>{r.replace('_',' ')}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Company</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {u.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-400 md:hidden">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_STYLE[u.role] ?? 'bg-gray-100 text-gray-600'}`}>{u.role.replace('_',' ')}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{u.company ?? '—'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(u)} className="text-xs text-orange-600 hover:text-orange-700 font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No users found</p>}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={e => e.target===e.currentTarget && setModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{modal === 'create' ? 'Add New User' : `Edit — ${modal.name}`}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 text-xl">×</button>
            </div>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setModal(null); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={form.role} onChange={e => setForm(p=>({...p,role:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                  {roleList.map(r => <option key={r} value={r}>{r.replace('_',' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input value={form.company} onChange={e => setForm(p=>({...p,company:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 text-sm font-semibold transition-colors">{modal === 'create' ? 'Create User' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
