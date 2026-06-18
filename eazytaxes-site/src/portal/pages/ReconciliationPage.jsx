import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const CHECKLIST_LABELS = {
  bank_statement:        'Bank statement uploaded',
  transactions_imported: 'Transactions imported',
  expenses_categorized:  'Expenses categorized',
  anomalies_reviewed:    'Anomalies reviewed',
  report_generated:      'P&L report generated',
};

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

export default function ReconciliationPage() {
  const { reconciliation, updateReconciliation } = usePortal();

  const toggleStep = (id, key, current) => {
    const rec = reconciliation.find(r => r.id === id);
    if (!rec) return;
    const newChecklist = { ...rec.checklist, [key]: !current };
    const allDone = Object.values(newChecklist).every(Boolean);
    updateReconciliation(id, { checklist: newChecklist, status: allDone ? 'COMPLETED' : 'IN_PROGRESS' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reconciliation</h1>
        <p className="text-sm text-gray-500 mt-0.5">Monthly bank reconciliation for all clients</p>
      </div>

      <div className="space-y-6">
        {reconciliation.map(rec => {
          const doneSteps = Object.values(rec.checklist).filter(Boolean).length;
          const totalSteps = Object.keys(rec.checklist).length;
          const pct = Math.round((doneSteps / totalSteps) * 100);

          return (
            <div key={rec.id} className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg">{clientName(rec.clientId)}</h2>
                  <p className="text-sm text-gray-500">{rec.account} · {rec.month}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : rec.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {rec.status.replace('_',' ')}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{doneSteps}/{totalSteps} steps complete</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width:`${pct}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Balances */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Balance Summary</h3>
                  {[
                    { label:'Bank Balance', value:rec.bankBalance, color:'text-gray-900' },
                    { label:'Book Balance', value:rec.bookBalance, color:'text-gray-900' },
                    { label:'Difference',   value:rec.difference,  color: rec.difference === 0 ? 'text-green-600' : 'text-red-500' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">{label}</span>
                      <span className={`text-sm font-semibold ${color}`}>
                        {value !== null && value !== undefined ? `$${value.toLocaleString('en-US',{minimumFractionDigits:2})}` : '—'}
                      </span>
                    </div>
                  ))}
                  {rec.difference !== null && rec.difference !== 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-600">
                      ⚠ Discrepancy detected. Please review flagged transactions.
                    </div>
                  )}
                  {rec.difference === 0 && rec.status === 'COMPLETED' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700">
                      ✓ Accounts reconciled. Difference is $0.00.
                    </div>
                  )}
                </div>

                {/* Checklist */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Close Checklist</h3>
                  <div className="space-y-2">
                    {Object.entries(rec.checklist).map(([key, done]) => (
                      <button
                        key={key}
                        onClick={() => toggleStep(rec.id, key, done)}
                        disabled={rec.status === 'COMPLETED'}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${done ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'} disabled:cursor-default`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-colors ${done ? 'bg-green-500 text-white' : 'border-2 border-gray-300'}`}>
                          {done ? '✓' : ''}
                        </span>
                        <span className={`text-sm ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {CHECKLIST_LABELS[key] ?? key}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
