import { useState } from 'react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const PHASES = [
  { key:'transactions_reviewed',    label:'All transactions reviewed' },
  { key:'expenses_categorized',     label:'Expenses categorized' },
  { key:'bank_reconciled',          label:'Bank accounts reconciled' },
  { key:'payroll_posted',           label:'Payroll entries posted' },
  { key:'depreciation_posted',      label:'Depreciation posted' },
  { key:'accruals_posted',          label:'Accruals & prepayments posted' },
  { key:'reports_generated',        label:'P&L & balance sheet generated' },
  { key:'accountant_review',        label:'Accountant review complete' },
];

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

function Close({ rec, onToggle }) {
  const tasks = rec.checklist ?? {};
  const done  = Object.values(tasks).filter(Boolean).length;
  const pct   = PHASES.length > 0 ? Math.round((done / PHASES.length) * 100) : 0;
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-left">{clientName(rec.clientId)}</p>
            <p className="text-sm text-gray-500">{rec.month}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{pct}%</p>
            <p className="text-xs text-gray-400">{done}/{PHASES.length} steps</p>
          </div>
          <div className="w-24 h-2 bg-gray-100 rounded-full">
            <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, backgroundColor: pct===100 ? '#22c55e' : '#fa8200' }} />
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${rec.status==='COMPLETED' ? 'bg-green-100 text-green-700' : rec.status==='IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{rec.status.replace('_',' ')}</span>
          <span className="text-gray-400">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Checklist */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Close Checklist</h3>
              <div className="space-y-2">
                {PHASES.map(phase => {
                  const done = tasks[phase.key] ?? false;
                  return (
                    <button
                      key={phase.key}
                      onClick={() => onToggle(rec.id, phase.key, done)}
                      disabled={rec.status === 'COMPLETED'}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${done ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'} disabled:cursor-default`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${done ? 'bg-green-500 text-white' : 'border-2 border-gray-300'}`}>{done ? '✓' : ''}</span>
                      <span className={`text-sm ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{phase.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Balance summary */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Balance Summary</h3>
              {[
                { label:'Bank Balance', val: rec.bankBalance },
                { label:'Book Balance', val: rec.bookBalance },
                { label:'Difference',   val: rec.difference, special: true },
              ].map(r => (
                <div key={r.label} className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{r.label}</span>
                  <span className={`text-sm font-semibold ${r.special && rec.difference !== 0 ? 'text-red-500' : r.special ? 'text-green-600' : 'text-gray-900'}`}>
                    {rec[r.label.toLowerCase().replace(' ','Balance').replace(' ','Balance')] !== undefined
                      ? `$${(r.val ?? 0).toLocaleString('en-US',{minimumFractionDigits:2})}`
                      : '—'}
                  </span>
                </div>
              ))}
              {rec.difference !== 0 && rec.difference != null && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-600">
                  ⚠ Discrepancy of ${Math.abs(rec.difference).toLocaleString()} detected.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MonthlyClosePage() {
  const { reconciliation, updateReconciliation } = usePortal();
  const [month, setMonth] = useState('All');

  const months = [...new Set(reconciliation.map(r => r.month))];
  const filtered = month === 'All' ? reconciliation : reconciliation.filter(r => r.month === month);

  const completed = reconciliation.filter(r => r.status === 'COMPLETED').length;
  const inProgress = reconciliation.filter(r => r.status === 'IN_PROGRESS').length;

  const toggleStep = (id, key, current) => {
    const rec = reconciliation.find(r => r.id === id);
    if (!rec) return;
    const checklist = { ...rec.checklist };
    PHASES.forEach(p => { if (!(p.key in checklist)) checklist[p.key] = false; });
    checklist[key] = !current;
    const allDone = PHASES.every(p => checklist[p.key]);
    updateReconciliation(id, { checklist, status: allDone ? 'COMPLETED' : 'IN_PROGRESS' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monthly Close</h1>
          <p className="text-sm text-gray-500 mt-0.5">End-of-month bookkeeping close checklist for all clients</p>
        </div>
        <select value={month} onChange={e => setMonth(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
          <option value="All">All Months</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:'Total Clients', val:reconciliation.length, color:'text-gray-900', bg:'bg-white border-gray-200' },
          { label:'In Progress',   val:inProgress,            color:'text-blue-600', bg:'bg-blue-50 border-blue-200' },
          { label:'Completed',     val:completed,             color:'text-green-700',bg:'bg-green-50 border-green-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border ${s.bg} p-4 text-center`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(rec => (
          <Close key={rec.id} rec={rec} onToggle={toggleStep} />
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No close records found</p>}
      </div>
    </div>
  );
}
