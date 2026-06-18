import { useState } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const STATUS_ORDER = ['COLLECTING_DOCS','PREPARING','PENDING','FILED'];
const STATUS_STYLE = {
  COLLECTING_DOCS: 'bg-yellow-100 text-yellow-700',
  PREPARING:       'bg-blue-100 text-blue-700',
  PENDING:         'bg-purple-100 text-purple-700',
  FILED:           'bg-green-100 text-green-700',
};

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

function daysUntil(date) {
  if (!date) return null;
  return Math.ceil((new Date(date) - new Date()) / 86400000);
}

export default function TaxReturnsPage() {
  const { filings, updateFiling, tasks } = usePortal();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);

  const filtered = statusFilter === 'ALL' ? filings : filings.filter(f => f.status === statusFilter);
  const selectedFiling = filings.find(f => f.id === selected);

  const advance = (id, current) => {
    const next = STATUS_ORDER[STATUS_ORDER.indexOf(current) + 1];
    if (!next) return;
    updateFiling(id, { status: next, ...(next === 'FILED' ? { filedAt: new Date().toISOString().split('T')[0] } : {}) });
  };

  const clientTasks = selectedFiling
    ? tasks.filter(t => t.clientId === selectedFiling.clientId && t.category === 'TAX')
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Returns</h1>
          <p className="text-sm text-gray-500 mt-0.5">Preparation queue for all client tax returns</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {STATUS_ORDER.map(s => (
          <div key={s} className={`rounded-xl border p-4 text-center cursor-pointer transition-all ${statusFilter===s ? 'ring-2 ring-orange-400' : ''} bg-white border-gray-200`} onClick={() => setStatusFilter(statusFilter===s ? 'ALL' : s)}>
            <p className={`text-2xl font-bold ${STATUS_STYLE[s]?.split(' ')[1] ?? 'text-gray-700'}`}>{filings.filter(f=>f.status===s).length}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.replace('_',' ')}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setStatusFilter('ALL')} className={`text-xs px-3 py-1.5 rounded-lg border ${statusFilter==='ALL' ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>All</button>
        {STATUS_ORDER.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`text-xs px-3 py-1.5 rounded-lg border ${statusFilter===s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>{s.replace('_',' ')}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Filing list */}
        <div className="lg:col-span-1 space-y-2">
          {filtered.map(f => {
            const days = daysUntil(f.dueDate);
            return (
              <div key={f.id} onClick={() => setSelected(f.id)} className={`bg-white rounded-xl border cursor-pointer p-4 hover:border-orange-300 transition-colors ${selected===f.id ? 'border-orange-400 shadow-sm' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{f.type}</p>
                    <p className="text-xs text-gray-500">{clientName(f.clientId)} · {f.taxYear}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_STYLE[f.status]}`}>{f.status.replace('_',' ')}</span>
                </div>
                {days !== null && f.status !== 'FILED' && (
                  <p className={`text-xs font-medium mt-1 ${days < 0 ? 'text-red-600' : days <= 14 ? 'text-orange-600' : 'text-gray-400'}`}>
                    {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Due today' : `${days}d left`}
                  </p>
                )}
                {f.status === 'FILED' && f.filedAt && <p className="text-xs text-green-600 mt-1">Filed {f.filedAt}</p>}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No returns found</p>}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selectedFiling ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{selectedFiling.type} – {selectedFiling.taxYear}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{clientName(selectedFiling.clientId)}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_STYLE[selectedFiling.status]}`}>{selectedFiling.status.replace('_',' ')}</span>
              </div>

              {/* Progress pipeline */}
              <div className="flex items-center gap-2">
                {STATUS_ORDER.map((s, i) => {
                  const active = s === selectedFiling.status;
                  const done = STATUS_ORDER.indexOf(s) < STATUS_ORDER.indexOf(selectedFiling.status);
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`flex-1 text-center text-xs py-1 rounded ${done ? 'bg-green-100 text-green-700' : active ? 'bg-orange-500 text-white font-semibold' : 'bg-gray-100 text-gray-400'}`}>
                        {s.replace('_',' ')}
                      </div>
                      {i < STATUS_ORDER.length - 1 && <span className="text-gray-300">→</span>}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Due Date</p>
                  <p className="font-medium text-gray-900">{selectedFiling.dueDate ?? '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Filed At</p>
                  <p className="font-medium text-gray-900">{selectedFiling.filedAt ?? '—'}</p>
                </div>
              </div>

              {selectedFiling.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">{selectedFiling.notes}</div>
              )}

              {/* Related tasks */}
              {clientTasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Related Tax Tasks</h3>
                  <div className="space-y-2">
                    {clientTasks.map(t => (
                      <div key={t.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-900">{t.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.status.replace('_',' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advance button */}
              {selectedFiling.status !== 'FILED' && (
                <button onClick={() => advance(selectedFiling.id, selectedFiling.status)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                  Advance → {STATUS_ORDER[STATUS_ORDER.indexOf(selectedFiling.status) + 1]?.replace('_',' ')}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 h-64 flex items-center justify-center text-center">
              <div>
                <FileText size={36} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Select a return to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
