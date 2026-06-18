import { useState } from 'react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const STATUS_STYLE = { FILED:'bg-green-100 text-green-700', PREPARING:'bg-blue-100 text-blue-700', COLLECTING_DOCS:'bg-yellow-100 text-yellow-700', PENDING:'bg-gray-100 text-gray-600', OVERDUE:'bg-red-100 text-red-700' };
const STATUS_OPTIONS = ['COLLECTING_DOCS','PREPARING','PENDING','FILED'];

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }
function clientCompany(id) { return MOCK_USERS.find(u => u.id === id)?.company ?? '—'; }

export default function FilingsPage() {
  const { filings, updateFiling } = usePortal();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editId, setEditId] = useState(null);

  const filtered = filterStatus === 'ALL' ? filings : filings.filter(f => f.status === filterStatus);

  const advance = (f) => {
    const order = ['COLLECTING_DOCS','PREPARING','PENDING','FILED'];
    const idx = order.indexOf(f.status);
    if (idx < order.length - 1) updateFiling(f.id, { status: order[idx + 1], ...(idx === order.length - 2 ? { filedAt: new Date().toISOString().split('T')[0] } : {}) });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Filings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track all client tax return preparation stages</p>
        </div>
        <div className="flex gap-2">
          {['ALL','COLLECTING_DOCS','PREPARING','PENDING','FILED'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filterStatus === s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
              {s === 'ALL' ? 'All' : s.replace('_',' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label:'Collecting Docs', count: filings.filter(f=>f.status==='COLLECTING_DOCS').length, color:'text-yellow-600' },
          { label:'Preparing', count: filings.filter(f=>f.status==='PREPARING').length, color:'text-blue-600' },
          { label:'Pending', count: filings.filter(f=>f.status==='PENDING').length, color:'text-gray-600' },
          { label:'Filed', count: filings.filter(f=>f.status==='FILED').length, color:'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Year</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Result</th>
              <th className="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{clientName(f.clientId)}</p>
                  <p className="text-xs text-gray-400">{clientCompany(f.clientId)}</p>
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">{f.taxYear}</td>
                <td className="px-4 py-3 text-gray-600">{f.type}</td>
                <td className="px-4 py-3 text-gray-500">{f.dueDate ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[f.status] ?? 'bg-gray-100 text-gray-600'}`}>{f.status.replace('_',' ')}</span>
                </td>
                <td className="px-4 py-3">
                  {f.returnAmount !== null && f.returnAmount !== undefined
                    ? <span className={`text-sm font-semibold ${f.returnAmount >= 0 ? 'text-green-600' : 'text-red-500'}`}>{f.returnAmount >= 0 ? `+$${f.returnAmount}` : `-$${Math.abs(f.returnAmount)}`}</span>
                    : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-3">
                  {f.status !== 'FILED' && (
                    <button onClick={() => advance(f)} className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 py-1 rounded-lg transition-colors">
                      Advance →
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No filings found</p>}
      </div>
    </div>
  );
}
