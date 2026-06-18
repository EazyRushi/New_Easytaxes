import { useState } from 'react';
import { usePortal } from '../portalStore';
import { MOCK_USERS, WORKFLOWS } from '../portalData';

const STATUS_STYLE = {
  NOT_STARTED: 'bg-gray-100 text-gray-500',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED:   'bg-green-100 text-green-700',
  PAUSED:      'bg-yellow-100 text-yellow-700',
};

const WORKFLOW_TEMPLATES = [
  { key: 'ONBOARDING',    label: 'Client Onboarding',  desc: 'New client setup, KYC, document collection', steps: ['Collect KYC documents','Set up accounting software','Assign team members','Initial consultation call','Confirm service agreement'] },
  { key: 'TAX_FILING',   label: 'Tax Filing',          desc: 'Annual tax preparation and e-file workflow',  steps: ['Request prior-year docs','Collect W2s and 1099s','Prepare draft return','Client review & approval','E-file submission','Confirm acceptance'] },
  { key: 'MONTHLY_CLOSE', label: 'Monthly Close',      desc: 'End-of-month bookkeeping close process',     steps: ['Import bank transactions','Categorize expenses','Reconcile accounts','Post payroll entries','Generate P&L report','Accountant review'] },
];

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

export default function WorkflowsPage() {
  const { workflows, createWorkflow, updateWorkflow } = usePortal();
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);
  const [newWf, setNewWf] = useState(false);
  const [form, setForm] = useState({ type:'ONBOARDING', clientId: MOCK_USERS.find(u=>u.role==='CLIENT')?.id ?? '' });

  const filtered = filter === 'ALL' ? workflows : workflows.filter(w => w.status === filter || w.type === filter);
  const selectedWf = workflows.find(w => w.id === selected);

  const handleCreate = (e) => {
    e.preventDefault();
    const tmpl = WORKFLOW_TEMPLATES.find(t => t.key === form.type);
    createWorkflow({
      type: form.type,
      clientId: form.clientId,
      status: 'NOT_STARTED',
      steps: tmpl.steps.map((s, i) => ({ id: `step-${Date.now()}-${i}`, label: s, done: false })),
      startedAt: new Date().toISOString().split('T')[0],
    });
    setNewWf(false);
  };

  const toggleStep = (wfId, stepId) => {
    const wf = workflows.find(w => w.id === wfId);
    if (!wf || !wf.steps) return;
    const steps = wf.steps.map(s => s.id === stepId ? { ...s, done: !s.done } : s);
    const allDone = steps.every(s => s.done);
    const anyDone = steps.some(s => s.done);
    updateWorkflow(wfId, { steps, status: allDone ? 'COMPLETED' : anyDone ? 'IN_PROGRESS' : 'NOT_STARTED' });
  };

  const clients = MOCK_USERS.filter(u => u.role === 'CLIENT');

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and monitor client workflow pipelines</p>
        </div>
        <button onClick={() => setNewWf(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">+ Start Workflow</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {['NOT_STARTED','IN_PROGRESS','COMPLETED','PAUSED'].map(s => (
          <div key={s} className={`bg-white rounded-xl border border-gray-200 p-4 text-center cursor-pointer hover:border-orange-300 ${filter===s ? 'ring-2 ring-orange-400' : ''}`} onClick={() => setFilter(filter===s ? 'ALL' : s)}>
            <p className="text-2xl font-bold text-gray-900">{workflows.filter(w=>w.status===s).length}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.replace('_',' ')}</p>
          </div>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['ALL',...WORKFLOW_TEMPLATES.map(t=>t.key)].map(k => (
          <button key={k} onClick={() => setFilter(k)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter===k ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
            {k === 'ALL' ? 'All' : WORKFLOW_TEMPLATES.find(t=>t.key===k)?.label ?? k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-1 space-y-2">
          {filtered.map(w => {
            const done  = w.steps?.filter(s => s.done).length ?? 0;
            const total = w.steps?.length ?? 0;
            const pct   = total > 0 ? Math.round((done/total)*100) : 0;
            return (
              <div key={w.id} onClick={() => setSelected(w.id)} className={`bg-white rounded-xl border cursor-pointer p-4 hover:border-orange-300 transition-colors ${selected===w.id ? 'border-orange-400 shadow-sm' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{WORKFLOW_TEMPLATES.find(t=>t.key===w.type)?.label ?? w.type}</p>
                    <p className="text-xs text-gray-500">{clientName(w.clientId)}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_STYLE[w.status]}`}>{w.status.replace('_',' ')}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-0.5"><span>{done}/{total} steps</span><span>{pct}%</span></div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{ width:`${pct}%` }} /></div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No workflows found</p>}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selectedWf ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{WORKFLOW_TEMPLATES.find(t=>t.key===selectedWf.type)?.label ?? selectedWf.type}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Client: {clientName(selectedWf.clientId)}</p>
                  <p className="text-xs text-gray-400">Started: {selectedWf.startedAt ?? '—'}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_STYLE[selectedWf.status]}`}>{selectedWf.status.replace('_',' ')}</span>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1 italic">{WORKFLOW_TEMPLATES.find(t=>t.key===selectedWf.type)?.desc}</p>
              </div>

              {selectedWf.steps?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Steps</h3>
                  <div className="space-y-2">
                    {selectedWf.steps.map((step, i) => (
                      <button key={step.id ?? i} onClick={() => toggleStep(selectedWf.id, step.id ?? i)} disabled={selectedWf.status==='COMPLETED'}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all ${step.done ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'} disabled:cursor-default`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold ${step.done ? 'bg-green-500 text-white' : 'border-2 border-gray-300 text-gray-400'}`}>{step.done ? '✓' : i+1}</span>
                        <span className={`text-sm ${step.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{step.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {selectedWf.status === 'IN_PROGRESS' && <button onClick={() => updateWorkflow(selectedWf.id, { status:'PAUSED' })} className="text-sm border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50">Pause</button>}
                {selectedWf.status === 'PAUSED' && <button onClick={() => updateWorkflow(selectedWf.id, { status:'IN_PROGRESS' })} className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg">Resume</button>}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 h-64 flex items-center justify-center text-center">
              <div>
                <p className="text-3xl mb-2">⚙️</p>
                <p className="text-sm text-gray-400">Select a workflow to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New workflow modal */}
      {newWf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={e => e.target===e.currentTarget && setNewWf(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Start New Workflow</h2>
              <button onClick={() => setNewWf(false)} className="text-gray-400 text-xl">×</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Type</label>
                <select value={form.type} onChange={e => setForm(p=>({...p,type:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                  {WORKFLOW_TEMPLATES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
                <p className="text-xs text-gray-400 mt-1">{WORKFLOW_TEMPLATES.find(t=>t.key===form.type)?.desc}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <select value={form.clientId} onChange={e => setForm(p=>({...p,clientId:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setNewWf(false)} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 text-sm font-semibold transition-colors">Start Workflow</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
