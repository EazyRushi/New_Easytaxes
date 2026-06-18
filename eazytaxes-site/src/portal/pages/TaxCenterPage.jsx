import { usePortal } from '../portalStore';
import { Link } from 'react-router-dom';

const STATUS_STYLE = {
  FILED:           'bg-green-100 text-green-700',
  PREPARING:       'bg-blue-100 text-blue-700',
  COLLECTING_DOCS: 'bg-yellow-100 text-yellow-700',
  PENDING:         'bg-gray-100 text-gray-600',
  OVERDUE:         'bg-red-100 text-red-700',
};
const STATUS_LABEL = {
  FILED:'Filed ✓', PREPARING:'In Preparation', COLLECTING_DOCS:'Collecting Documents', PENDING:'Pending', OVERDUE:'Overdue',
};

export default function TaxCenterPage() {
  const { currentUser, getFilings, getCompliance, getTasksForUser } = usePortal();
  const filings = getFilings(currentUser.id);
  const compliance = getCompliance(currentUser.id);
  const tasks = getTasksForUser(currentUser).filter(t => t.category === 'TAX' && t.status !== 'COMPLETED');

  const currentYear = filings.filter(f => f.taxYear === 2024);
  const history = filings.filter(f => f.taxYear < 2024);

  const overdue = compliance.filter(c => c.status === 'OVERDUE');
  const upcoming = compliance.filter(c => c.status === 'PENDING').sort((a,b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tax Center</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your tax returns, deadlines, and estimated payments</p>
      </div>

      {/* Overdue alert */}
      {overdue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-500 text-xl">⚠</span>
          <div>
            <p className="font-semibold text-red-800">Overdue: {overdue.length} item{overdue.length > 1 ? 's' : ''} past due</p>
            {overdue.map(c => (
              <p key={c.id} className="text-sm text-red-600 mt-1">• {c.title} — was due {c.dueDate}</p>
            ))}
          </div>
        </div>
      )}

      {/* Pending tax tasks */}
      {tasks.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-orange-900">🔔 Your Action Items</h2>
            <Link to="/portal/tasks" className="text-xs text-orange-600 hover:underline">View all tasks →</Link>
          </div>
          <div className="space-y-2">
            {tasks.map(t => (
              <div key={t.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-orange-100">
                <p className="text-sm font-medium text-gray-900">{t.title}</p>
                <span className="text-xs text-orange-600 font-medium">{t.dueDate ? `Due ${t.dueDate}` : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current year filings */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">2024 Tax Returns</h2>
          {currentYear.length === 0 ? (
            <p className="text-sm text-gray-400">No 2024 filings yet.</p>
          ) : (
            <div className="space-y-3">
              {currentYear.map(f => (
                <div key={f.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{f.type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Tax Year {f.taxYear}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLE[f.status] ?? 'bg-gray-100 text-gray-600'}`}>{STATUS_LABEL[f.status] ?? f.status}</span>
                  </div>
                  {f.dueDate && <p className="text-xs text-gray-500">Due: {f.dueDate}</p>}
                  {f.notes && <p className="text-xs text-gray-400 mt-1 italic">{f.notes}</p>}
                  {f.returnAmount !== null && f.returnAmount !== undefined && (
                    <div className={`mt-2 text-sm font-semibold ${f.returnAmount >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {f.returnAmount >= 0 ? `Refund: $${f.returnAmount.toLocaleString()}` : `Amount Owed: $${Math.abs(f.returnAmount).toLocaleString()}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming deadlines */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-400">No upcoming deadlines.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map(c => {
                const daysLeft = Math.ceil((new Date(c.dueDate) - new Date()) / 86400000);
                return (
                  <div key={c.id} className="flex items-start justify-between border border-gray-100 rounded-xl p-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.type.replace(/_/g,' ')} · Due {c.dueDate}</p>
                      {c.notes && <p className="text-xs text-gray-400 mt-1 italic">{c.notes}</p>}
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ml-3 flex-shrink-0 ${daysLeft <= 14 ? 'bg-red-100 text-red-600' : daysLeft <= 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {daysLeft > 0 ? `${daysLeft}d` : 'Today'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Filing history */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Filing History</h2>
        {history.length === 0 ? (
          <p className="text-sm text-gray-400">No prior year returns on file.</p>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tax Year</th>
              <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
              <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Filed</th>
              <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Result</th>
              <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {history.map(f => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-900">{f.taxYear}</td>
                  <td className="py-2.5 text-gray-600">{f.type}</td>
                  <td className="py-2.5 text-gray-500">{f.filedAt ?? '—'}</td>
                  <td className="py-2.5">
                    {f.returnAmount !== null && f.returnAmount !== undefined ? (
                      <span className={f.returnAmount >= 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                        {f.returnAmount >= 0 ? `+$${f.returnAmount.toLocaleString()}` : `-$${Math.abs(f.returnAmount).toLocaleString()}`}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLE[f.status] ?? 'bg-gray-100 text-gray-600'}`}>{STATUS_LABEL[f.status] ?? f.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
