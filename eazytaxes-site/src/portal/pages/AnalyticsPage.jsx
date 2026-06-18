import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

function Bar({ label, val, max, color = 'bg-orange-500' }) {
  const pct = max > 0 ? Math.round((val / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-32 flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{val}</span>
    </div>
  );
}

function StatCard({ label, value, sub, color = 'text-gray-900', bg = 'bg-white border-gray-200' }) {
  return (
    <div className={`rounded-xl border ${bg} p-5`}>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const { tasks, filings, transactions, tickets, compliance, users = [] } = usePortal();

  const clients = MOCK_USERS.filter(u => u.role === 'CLIENT');
  const staff   = MOCK_USERS.filter(u => u.role !== 'CLIENT');

  // Task stats
  const taskByStatus = {
    TODO:        tasks.filter(t => t.status === 'TODO').length,
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    IN_REVIEW:   tasks.filter(t => t.status === 'IN_REVIEW').length,
    COMPLETED:   tasks.filter(t => t.status === 'COMPLETED').length,
    BLOCKED:     tasks.filter(t => t.status === 'BLOCKED').length,
  };

  const taskByPriority = {
    URGENT: tasks.filter(t => t.priority === 'URGENT').length,
    HIGH:   tasks.filter(t => t.priority === 'HIGH').length,
    MEDIUM: tasks.filter(t => t.priority === 'MEDIUM').length,
    LOW:    tasks.filter(t => t.priority === 'LOW').length,
  };

  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED').length;

  // Revenue proxy from transactions
  const revenue = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  // Filings
  const filedCount  = filings.filter(f => f.status === 'FILED').length;
  const pendingFiling = filings.filter(f => f.status !== 'FILED').length;

  // Compliance
  const overdueCompliance = compliance.filter(c => c.status === 'OVERDUE').length;

  // Tasks per staff member
  const staffTaskCounts = staff.map(s => ({
    name: s.name,
    count: tasks.filter(t => t.assignedTo === s.id).length,
  })).sort((a, b) => b.count - a.count);
  const maxStaff = staffTaskCounts[0]?.count ?? 1;

  // Tasks per client
  const clientTaskCounts = clients.map(c => ({
    name: c.name,
    count: tasks.filter(t => t.clientId === c.id).length,
  })).sort((a, b) => b.count - a.count);
  const maxClient = clientTaskCounts[0]?.count ?? 1;

  const completionRate = tasks.length > 0 ? Math.round((taskByStatus.COMPLETED / tasks.length) * 100) : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Platform-wide metrics and performance overview</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tasks"        value={tasks.length}         sub={`${overdue} overdue`} />
        <StatCard label="Completion Rate"    value={`${completionRate}%`} sub={`${taskByStatus.COMPLETED} completed`} color="text-green-700" bg="bg-green-50 border-green-200" />
        <StatCard label="Active Clients"     value={clients.length}       sub={`${staff.length} staff`} color="text-blue-700" bg="bg-blue-50 border-blue-200" />
        <StatCard label="Open Tickets"       value={tickets.filter(t=>t.status==='OPEN').length} sub={`${tickets.filter(t=>t.status==='ESCALATED').length} escalated`} color="text-orange-600" bg="bg-orange-50 border-orange-200" />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Filings Filed"      value={filedCount}           sub={`${pendingFiling} pending`} />
        <StatCard label="Compliance Overdue" value={overdueCompliance}    color={overdueCompliance > 0 ? 'text-red-600' : 'text-green-700'} bg={overdueCompliance > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'} />
        <StatCard label="Total Revenue"      value={`$${(revenue/1000).toFixed(1)}k`} sub="from transactions" color="text-green-700" bg="bg-green-50 border-green-200" />
        <StatCard label="Total Expenses"     value={`$${(expenses/1000).toFixed(1)}k`} sub="from transactions" color="text-red-600" bg="bg-red-50 border-red-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Tasks by Status</h2>
          <div className="space-y-3">
            {Object.entries(taskByStatus).map(([s, v]) => (
              <Bar key={s} label={s.replace('_',' ')} val={v} max={tasks.length || 1} color="bg-orange-500" />
            ))}
          </div>
        </div>

        {/* Task priority */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Tasks by Priority</h2>
          <div className="space-y-3">
            {[['URGENT','bg-red-500'],['HIGH','bg-orange-500'],['MEDIUM','bg-yellow-400'],['LOW','bg-gray-300']].map(([p,color]) => (
              <Bar key={p} label={p} val={taskByPriority[p]} max={tasks.length || 1} color={color} />
            ))}
          </div>
        </div>

        {/* Staff workload */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Staff Workload</h2>
          <div className="space-y-3">
            {staffTaskCounts.map(s => (
              <Bar key={s.name} label={s.name} val={s.count} max={maxStaff || 1} color="bg-blue-500" />
            ))}
            {staffTaskCounts.length === 0 && <p className="text-sm text-gray-400">No staff tasks</p>}
          </div>
        </div>

        {/* Client task load */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Client Activity</h2>
          <div className="space-y-3">
            {clientTaskCounts.map(c => (
              <Bar key={c.name} label={c.name} val={c.count} max={maxClient || 1} color="bg-purple-500" />
            ))}
            {clientTaskCounts.length === 0 && <p className="text-sm text-gray-400">No client tasks</p>}
          </div>
        </div>
      </div>

      {/* Filing pipeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Filing Pipeline</h2>
        <div className="grid grid-cols-4 gap-3">
          {['COLLECTING_DOCS','PREPARING','PENDING','FILED'].map(s => (
            <div key={s} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <p className="text-2xl font-bold text-gray-900">{filings.filter(f=>f.status===s).length}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.replace('_',' ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
