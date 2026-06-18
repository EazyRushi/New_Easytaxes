import { usePortal } from '../portalStore';
import { Link } from 'react-router-dom';

export default function BookkeepingPage() {
  const { currentUser, getTransactions, getReconciliation, getTasksForUser } = usePortal();
  const txns = getTransactions(currentUser.id).slice(0, 8);
  const recon = getReconciliation(currentUser.id);
  const tasks = getTasksForUser(currentUser).filter(t => t.category === 'BOOKKEEPING' && t.status !== 'COMPLETED');

  const revenue = txns.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = txns.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const net = revenue - expenses;

  const latestRecon = recon[0];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookkeeping</h1>
        <p className="text-sm text-gray-500 mt-0.5">Transaction overview, P&L summary, and reconciliation status</p>
      </div>

      {/* P&L Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Revenue (Mar)', value:`$${revenue.toLocaleString('en-US',{minimumFractionDigits:2})}`, color:'text-green-600', bg:'bg-green-50 border-green-200' },
          { label:'Expenses (Mar)', value:`$${expenses.toLocaleString('en-US',{minimumFractionDigits:2})}`, color:'text-red-500',  bg:'bg-red-50 border-red-200' },
          { label:'Net Income',     value:`$${net.toLocaleString('en-US',{minimumFractionDigits:2})}`,     color: net>=0 ? 'text-green-700' : 'text-red-600', bg: net>=0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border ${s.bg} p-5`}>
            <p className="text-xs font-medium text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pending bookkeeping tasks */}
      {tasks.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-orange-900">⚡ Pending Actions</h2>
            <Link to="/portal/tasks" className="text-xs text-orange-600 hover:underline">View all →</Link>
          </div>
          {tasks.map(t => (
            <div key={t.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-orange-100 mb-2 last:mb-0">
              <p className="text-sm font-medium text-gray-900">{t.title}</p>
              <span className="text-xs text-orange-600">{t.dueDate ? `Due ${t.dueDate}` : ''}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent transactions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-2">
            {txns.map(t => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{t.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-400">{t.date}</p>
                    {t.category ? (
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 rounded">{t.category}</span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 rounded">Needs Review</span>
                    )}
                    {t.status === 'FLAGGED' && <span className="text-xs bg-red-100 text-red-600 px-1.5 rounded">Flagged</span>}
                  </div>
                </div>
                <span className={`text-sm font-semibold ml-3 flex-shrink-0 ${t.amount >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {t.amount >= 0 ? '+' : ''}{t.amount.toLocaleString('en-US',{style:'currency',currency:'USD'})}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reconciliation status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Reconciliation Status</h2>
          {!latestRecon ? (
            <p className="text-sm text-gray-400">No reconciliation data.</p>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{latestRecon.account}</p>
                  <p className="text-xs text-gray-400">{latestRecon.month}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${latestRecon.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : latestRecon.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{latestRecon.status.replace('_',' ')}</span>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  ['Bank Balance', latestRecon.bankBalance],
                  ['Book Balance', latestRecon.bookBalance],
                  ['Difference',   latestRecon.difference],
                ].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-gray-500">{l}</span>
                    <span className={`font-semibold ${l==='Difference' && v !== 0 ? 'text-red-500' : 'text-gray-900'}`}>
                      {v !== null && v !== undefined ? `$${v.toLocaleString('en-US',{minimumFractionDigits:2})}` : '—'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {Object.entries(latestRecon.checklist).map(([key, done]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${done ? 'bg-green-500 text-white' : 'border-2 border-gray-200'}`}>{done ? '✓' : ''}</span>
                    <span className={done ? 'text-gray-400 line-through' : 'text-gray-700'}>{key.replace(/_/g,' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
