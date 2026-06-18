import { useState } from 'react';
import { Ticket, Plus, AlertTriangle } from 'lucide-react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

const STATUS_STYLE   = { OPEN:'bg-yellow-100 text-yellow-700', IN_PROGRESS:'bg-blue-100 text-blue-700', ESCALATED:'bg-red-100 text-red-700', RESOLVED:'bg-green-100 text-green-700', CLOSED:'bg-gray-100 text-gray-500' };
const PRIORITY_STYLE = { LOW:'bg-gray-100 text-gray-500', NORMAL:'bg-blue-50 text-blue-600', HIGH:'bg-orange-100 text-orange-700', URGENT:'bg-red-100 text-red-700' };

function clientName(id)   { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }
function agentName(id)    { return id ? (MOCK_USERS.find(u => u.id === id)?.name ?? 'Unassigned') : 'Unassigned'; }

export default function TicketsPage() {
  const { currentUser, getTickets, createTicket, updateTicket } = usePortal();
  const isClient = currentUser.role === 'CLIENT';
  const tickets = getTickets(currentUser);
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);
  const [newTicket, setNewTicket] = useState(false);
  const [form, setForm] = useState({ subject:'', description:'', priority:'NORMAL' });

  const filtered = filter === 'ALL' ? tickets : tickets.filter(t => t.status === filter);

  const handleCreate = (e) => {
    e.preventDefault();
    createTicket({ ...form, clientId: currentUser.role === 'CLIENT' ? currentUser.id : null, userId: currentUser.id });
    setForm({ subject:'', description:'', priority:'NORMAL' });
    setNewTicket(false);
  };

  const selectedTicket = tickets.find(t => t.id === selected);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isClient ? 'Support Tickets' : 'Support Center'}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{isClient ? 'Submit and track your support requests' : `${tickets.filter(t=>t.status==='OPEN').length} open · ${tickets.filter(t=>t.status==='IN_PROGRESS').length} in progress`}</p>
        </div>
        <button onClick={() => setNewTicket(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">+ New Ticket</button>
      </div>

      {/* Stats (staff only) */}
      {!isClient && (
        <div className="grid grid-cols-4 gap-3 mb-5">
          {['OPEN','IN_PROGRESS','ESCALATED','RESOLVED'].map(s => (
            <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className={`text-2xl font-bold ${STATUS_STYLE[s]?.split(' ')[1] ?? 'text-gray-700'}`}>{tickets.filter(t=>t.status===s).length}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.replace('_',' ')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['ALL','OPEN','IN_PROGRESS','ESCALATED','RESOLVED'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter===s ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
            {s === 'ALL' ? 'All' : s.replace('_',' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket list */}
        <div className="lg:col-span-1 space-y-2">
          {filtered.map(t => (
            <div key={t.id} onClick={() => setSelected(t.id)} className={`bg-white rounded-xl border cursor-pointer p-4 hover:border-orange-300 transition-colors ${selected===t.id ? 'border-orange-400 shadow-sm' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold text-gray-900 leading-snug">{t.subject}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_STYLE[t.status]}`}>{t.status.replace('_',' ')}</span>
              </div>
              <p className="text-xs text-gray-400">{!isClient ? clientName(t.clientId)+' · ' : ''}{t.createdAt}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded mt-1 inline-block ${PRIORITY_STYLE[t.priority]}`}>{t.priority}</span>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No tickets found</p>}
        </div>

        {/* Ticket detail */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{selectedTicket.subject}</h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[selectedTicket.status]}`}>{selectedTicket.status.replace('_',' ')}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${PRIORITY_STYLE[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
                    <span className="text-xs text-gray-400">{selectedTicket.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed">{selectedTicket.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-4">
                <div><span className="font-medium text-gray-700">Client:</span> {clientName(selectedTicket.clientId)}</div>
                <div><span className="font-medium text-gray-700">Agent:</span> {agentName(selectedTicket.agentId)}</div>
                {selectedTicket.resolvedAt && <div><span className="font-medium text-gray-700">Resolved:</span> {selectedTicket.resolvedAt}</div>}
              </div>
              {/* Actions (staff) */}
              {!isClient && (
                <div className="flex gap-2 flex-wrap">
                  {selectedTicket.status === 'OPEN' && <button onClick={() => updateTicket(selectedTicket.id, { status:'IN_PROGRESS', agentId:currentUser.id })} className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg transition-colors">Assign to Me</button>}
                  {selectedTicket.status === 'IN_PROGRESS' && <button onClick={() => updateTicket(selectedTicket.id, { status:'ESCALATED' })} className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg transition-colors">Escalate</button>}
                  {['OPEN','IN_PROGRESS','ESCALATED'].includes(selectedTicket.status) && <button onClick={() => updateTicket(selectedTicket.id, { status:'RESOLVED' })} className="text-sm bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg transition-colors">Mark Resolved</button>}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 h-64 flex items-center justify-center text-center">
              <div>
                <Ticket size={36} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Select a ticket to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New ticket modal */}
      {newTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={e => e.target===e.currentTarget && setNewTicket(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">New Support Ticket</h2>
              <button onClick={() => setNewTicket(false)} className="text-gray-400 text-xl">×</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))} required placeholder="Brief description of the issue…" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(p=>({...p,description:e.target.value}))} required rows={4} placeholder="Provide more details…" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select value={form.priority} onChange={e => setForm(p=>({...p,priority:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setNewTicket(false)} className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 text-sm font-semibold transition-colors">Submit Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
