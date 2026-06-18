import { useState } from 'react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

export default function ApprovalsPage() {
  const { filings, updateFiling, tasks, updateTask } = usePortal();
  const [signed, setSigned] = useState({});

  // Tax returns awaiting client approval (IN_REVIEW stage)
  const pendingApprovals = filings.filter(f => f.status === 'PREPARING');
  const pendingTaskApprovals = tasks.filter(t => t.status === 'IN_REVIEW' && t.category === 'TAX');

  const approve = (id, type) => {
    if (type === 'filing') updateFiling(id, { status:'PENDING' });
    if (type === 'task')   updateTask(id, { status:'COMPLETED' });
    setSigned(p => ({ ...p, [id]: true }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approvals & E-Sign</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tax returns and documents awaiting client approval</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Awaiting Approval', count: pendingApprovals.length + pendingTaskApprovals.length, color:'text-orange-600', bg:'bg-orange-50 border-orange-200' },
          { label:'Approved Today',    count: Object.keys(signed).length, color:'text-green-600', bg:'bg-green-50 border-green-200' },
          { label:'Filed',             count: filings.filter(f=>f.status==='FILED').length, color:'text-blue-600', bg:'bg-blue-50 border-blue-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border ${s.bg} p-4 text-center`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tax return approvals */}
      {pendingApprovals.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Tax Returns – Awaiting Client Approval</h2>
          <div className="space-y-4">
            {pendingApprovals.map(f => (
              <div key={f.id} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{f.type} – {f.taxYear}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{clientName(f.clientId)}</p>
                    <p className="text-xs text-gray-400 mt-1">Due: {f.dueDate}</p>
                    {f.notes && <p className="text-xs text-gray-400 mt-1 italic">{f.notes}</p>}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Awaiting Signature</span>
                    {signed[f.id] ? (
                      <span className="text-xs text-green-600 font-semibold">✓ Approved</span>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => {}} className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50">Preview Return</button>
                        <button onClick={() => approve(f.id,'filing')} className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">✍ Approve & Sign</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task-based approvals */}
      {pendingTaskApprovals.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Document Approvals – In Review</h2>
          <div className="space-y-3">
            {pendingTaskApprovals.map(t => (
              <div key={t.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{clientName(t.clientId)} · Due {t.dueDate ?? '—'}</p>
                </div>
                {signed[t.id] ? (
                  <span className="text-xs text-green-600 font-semibold">✓ Approved</span>
                ) : (
                  <button onClick={() => approve(t.id,'task')} className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">
                    ✍ Approve
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {pendingApprovals.length === 0 && pendingTaskApprovals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">✅</p>
          <p className="font-medium text-gray-500">No pending approvals</p>
          <p className="text-sm text-gray-400 mt-1">All returns and documents are up to date.</p>
        </div>
      )}
    </div>
  );
}
