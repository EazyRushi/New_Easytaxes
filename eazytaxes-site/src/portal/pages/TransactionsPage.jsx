import { useState } from 'react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const CATEGORIES = ['Revenue','Office Expenses','Software & Tech','Meals & Entertainment','Travel','Payroll','Loan Repayment','Other'];
const STATUS_STYLE = { CATEGORIZED:'bg-green-100 text-green-700', NEEDS_REVIEW:'bg-yellow-100 text-yellow-700', FLAGGED:'bg-red-100 text-red-700' };

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

export default function TransactionsPage() {
  const { transactions, updateTransaction } = usePortal();
  const [filter, setFilter] = useState('ALL');
  const [clientFilter, setClientFilter] = useState('ALL');
  const [editId, setEditId] = useState(null);
  const [cat, setCat] = useState('');

  const clients = MOCK_USERS.filter(u => u.role === 'CLIENT');

  const filtered = transactions.filter(t => {
    const matchStatus = filter === 'ALL' || t.status === filter;
    const matchClient = clientFilter === 'ALL' || t.clientId === clientFilter;
    return matchStatus && matchClient;
  });

  const needsReview = transactions.filter(t => t.status === 'NEEDS_REVIEW').length;
  const flagged     = transactions.filter(t => t.status === 'FLAGGED').length;

  const saveCategory = (id) => {
    if (!cat) return;
    updateTransaction(id, { category: cat, status: 'CATEGORIZED' });
    setEditId(null);
    setCat('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-sm text-gray-500 mt-0.5">Review, categorize, and flag transactions</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">↓ Import</button>
      </div>

      {/* Alerts */}
      {(needsReview > 0 || flagged > 0) && (
        <div className="flex gap-3 mb-5">
          {needsReview > 0 && <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm font-medium text-yellow-800">⚠ {needsReview} transactions need review</div>}
          {flagged     > 0 && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium text-red-800">🚩 {flagged} flagged transactions</div>}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select value={clientFilter} onChange={e => setClientFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
          <option value="ALL">All Clients</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {['ALL','NEEDS_REVIEW','FLAGGED','CATEGORIZED'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-2 rounded-lg border transition-colors ${filter === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
            {s === 'ALL' ? 'All' : s.replace('_',' ')}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
              <th className="px-4 py-3 w-28"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{t.date}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 truncate max-w-xs">{t.description}</p>
                  <p className="text-xs text-gray-400">{t.account}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{clientName(t.clientId)}</td>
                <td className="px-4 py-3">
                  {editId === t.id ? (
                    <div className="flex gap-2">
                      <select value={cat} onChange={e => setCat(e.target.value)} className="text-xs border border-gray-300 rounded px-2 py-1 bg-white">
                        <option value="">Select…</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <button onClick={() => saveCategory(t.id)} className="text-xs bg-green-500 text-white px-2 py-1 rounded">✓</button>
                      <button onClick={() => setEditId(null)} className="text-xs text-gray-400 px-1">✕</button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-600">{t.category ?? <span className="text-gray-300 italic">Uncategorized</span>}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[t.status] ?? 'bg-gray-100 text-gray-600'}`}>{t.status.replace('_',' ')}</span>
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${t.amount >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {t.amount >= 0 ? '+' : ''}{t.amount.toLocaleString('en-US',{style:'currency',currency:'USD'})}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 justify-end">
                    {t.status !== 'CATEGORIZED' && (
                      <button onClick={() => { setEditId(t.id); setCat(t.category ?? ''); }} className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors">Categorize</button>
                    )}
                    {t.status !== 'FLAGGED' && (
                      <button onClick={() => updateTransaction(t.id, { status:'FLAGGED' })} className="text-xs bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded transition-colors">Flag</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No transactions</p>}
      </div>
    </div>
  );
}
