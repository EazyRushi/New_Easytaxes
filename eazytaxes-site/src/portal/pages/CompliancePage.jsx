import { AlertCircle, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const STATUS_STYLE = { OVERDUE:'bg-red-100 text-red-700', PENDING:'bg-yellow-100 text-yellow-700', COMPLETED:'bg-green-100 text-green-700' };
const TYPE_STYLE   = { TAX_RETURN:'bg-purple-100 text-purple-700', ESTIMATED_TAX:'bg-blue-100 text-blue-700', PAYROLL:'bg-indigo-100 text-indigo-700' };

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }
function clientCompany(id) { return MOCK_USERS.find(u => u.id === id)?.company ?? '—'; }

export default function CompliancePage() {
  const { compliance, updateCompliance } = usePortal();

  const overdue   = compliance.filter(c => c.status === 'OVERDUE');
  const pending   = compliance.filter(c => c.status === 'PENDING').sort((a,b) => a.dueDate.localeCompare(b.dueDate));
  const completed = compliance.filter(c => c.status === 'COMPLETED');

  const markComplete = (id) => updateCompliance(id, { status:'COMPLETED' });

  const Section = ({ title, items, emptyMsg }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4">{title} <span className="text-gray-400 font-normal">({items.length})</span></h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">{emptyMsg}</p>
      ) : (
        <div className="space-y-3">
          {items.map(c => {
            const daysLeft = Math.ceil((new Date(c.dueDate) - new Date()) / 86400000);
            return (
              <div key={c.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{clientName(c.clientId)} · {clientCompany(c.clientId)}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_STYLE[c.type] ?? 'bg-gray-100 text-gray-600'}`}>{c.type.replace(/_/g,' ')}</span>
                      <span className="text-xs text-gray-400">Due: {c.dueDate}</span>
                      {c.status !== 'COMPLETED' && (
                        <span className={`text-xs font-semibold ${daysLeft < 0 ? 'text-red-600' : daysLeft <= 14 ? 'text-orange-600' : 'text-gray-500'}`}>
                          {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'Due today' : `${daysLeft}d left`}
                        </span>
                      )}
                    </div>
                    {c.notes && <p className="text-xs text-gray-400 mt-1 italic">{c.notes}</p>}
                  </div>
                  {c.status !== 'COMPLETED' && (
                    <button onClick={() => markComplete(c.id)} className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
                      Mark Done ✓
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900"><ShieldCheck size={22} className="text-orange-500 inline mr-2" />Compliance</h1>
        <p className="text-sm text-gray-500 mt-0.5">Filing deadlines, estimated payments, and compliance tracking</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Overdue',  count:overdue.length,   color:'text-red-600',   bg:'bg-red-50 border-red-200' },
          { label:'Upcoming', count:pending.length,   color:'text-yellow-700',bg:'bg-yellow-50 border-yellow-200' },
          { label:'Completed',count:completed.length, color:'text-green-700', bg:'bg-green-50 border-green-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border ${s.bg} p-4 text-center`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {overdue.length > 0 && <Section title={<span className="flex items-center gap-2"><AlertCircle size={16} className="text-red-500" /> Overdue</span>} items={overdue} emptyMsg="" />}
      <Section title={<span className="flex items-center gap-2"><Clock size={16} className="text-yellow-600" /> Upcoming</span>} items={pending} emptyMsg="No upcoming deadlines." />
      <Section title={<span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600" /> Completed</span>} items={completed} emptyMsg="Nothing completed yet." />
    </div>
  );
}
