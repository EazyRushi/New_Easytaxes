import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

function userName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? 'Unknown'; }
function userAvatar(id) { return MOCK_USERS.find(u => u.id === id)?.avatar ?? '??'; }
function userRole(id) { return MOCK_USERS.find(u => u.id === id)?.role ?? ''; }

function fmtTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 86400000) return d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  if (diff < 604800000) return d.toLocaleDateString([], { weekday:'short' });
  return d.toLocaleDateString([], { month:'short', day:'numeric' });
}

const ROLE_COLOR = { CLIENT:'bg-blue-500', ACCOUNTANT:'bg-green-600', BOOKKEEPER:'bg-purple-600', TAX_SPECIALIST:'bg-yellow-600', ADMIN:'bg-red-600', SUPPORT:'bg-teal-600' };

export default function MessagesPage() {
  const { currentUser, getMessages, sendMessage, markMessageRead, users } = usePortal();
  const allMsgs = getMessages(currentUser.id);

  // Build conversation threads (grouped by the other participant)
  const threads = {};
  allMsgs.forEach(m => {
    const other = m.from === currentUser.id ? m.to : m.from;
    if (!threads[other]) threads[other] = [];
    threads[other].push(m);
  });

  const threadList = Object.entries(threads).map(([userId, msgs]) => ({
    userId,
    msgs: msgs.sort((a,b) => a.createdAt.localeCompare(b.createdAt)),
    latest: msgs.sort((a,b) => b.createdAt.localeCompare(a.createdAt))[0],
    unread: msgs.filter(m => m.to === currentUser.id && !m.read).length,
  })).sort((a,b) => b.latest.createdAt.localeCompare(a.latest.createdAt));

  const [active, setActive] = useState(threadList[0]?.userId ?? null);
  const [compose, setCompose] = useState(false);
  const [reply, setReply] = useState('');
  const [newMsg, setNewMsg] = useState({ to:'', subject:'', body:'' });

  const activeThread = active ? threads[active] : null;
  const activeMsgs = activeThread ? [...activeThread].sort((a,b) => a.createdAt.localeCompare(b.createdAt)) : [];

  const openThread = (userId) => {
    setActive(userId);
    setCompose(false);
    // mark unread as read
    threads[userId]?.forEach(m => { if (m.to === currentUser.id && !m.read) markMessageRead(m.id); });
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim() || !active) return;
    const latest = threads[active]?.[0];
    sendMessage(currentUser.id, active, `Re: ${latest?.subject ?? 'Message'}`, reply.trim());
    setReply('');
  };

  const handleCompose = (e) => {
    e.preventDefault();
    if (!newMsg.to || !newMsg.subject || !newMsg.body) return;
    sendMessage(currentUser.id, newMsg.to, newMsg.subject, newMsg.body);
    setCompose(false);
    setNewMsg({ to:'', subject:'', body:'' });
    setActive(newMsg.to);
  };

  const recipients = users.filter(u => u.id !== currentUser.id && u.role !== 'CLIENT' || (currentUser.role !== 'CLIENT' && u.role === 'CLIENT'));

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Messages</h2>
          <button onClick={() => { setCompose(true); setActive(null); }} className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">+ New</button>
        </div>
        <div className="overflow-y-auto flex-1">
          {threadList.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No messages yet</p>}
          {threadList.map(t => (
            <div
              key={t.userId}
              onClick={() => openThread(t.userId)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-50 transition-colors ${active === t.userId ? 'bg-orange-50 border-l-2 border-l-orange-500' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full ${ROLE_COLOR[userRole(t.userId)] ?? 'bg-gray-400'} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                {userAvatar(t.userId)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${t.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{userName(t.userId)}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-1">{fmtTime(t.latest.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{t.latest.subject}</p>
                <p className="text-xs text-gray-400 truncate">{t.latest.body}</p>
              </div>
              {t.unread > 0 && <span className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">{t.unread}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {compose ? (
          <div className="flex-1 p-6">
            <h3 className="font-bold text-gray-900 mb-4">New Message</h3>
            <form onSubmit={handleCompose} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <select value={newMsg.to} onChange={e => setNewMsg(p => ({...p, to:e.target.value}))} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                  <option value="">Select recipient…</option>
                  {users.filter(u => u.id !== currentUser.id).map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" value={newMsg.subject} onChange={e => setNewMsg(p => ({...p, subject:e.target.value}))} required placeholder="Message subject…" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea value={newMsg.body} onChange={e => setNewMsg(p => ({...p, body:e.target.value}))} required rows={6} placeholder="Type your message…" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setCompose(false)} className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors">Send Message</button>
              </div>
            </form>
          </div>
        ) : active && activeMsgs.length > 0 ? (
          <>
            {/* Thread header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${ROLE_COLOR[userRole(active)] ?? 'bg-gray-400'} text-white text-xs font-bold flex items-center justify-center`}>
                {userAvatar(active)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{userName(active)}</p>
                <p className="text-xs text-gray-400">{userRole(active)}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeMsgs.map(m => {
                const isMine = m.from === currentUser.id;
                return (
                  <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg ${isMine ? 'order-2' : 'order-1'}`}>
                      {!isMine && <p className="text-xs text-gray-400 mb-1 ml-1">{userName(m.from)}</p>}
                      <div className={`rounded-2xl px-4 py-3 ${isMine ? 'bg-orange-500 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-900 rounded-tl-sm'}`}>
                        <p className={`text-xs font-semibold mb-1 ${isMine ? 'text-orange-100' : 'text-gray-500'}`}>{m.subject}</p>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.body}</p>
                        <p className={`text-xs mt-2 ${isMine ? 'text-orange-200' : 'text-gray-400'} text-right`}>{fmtTime(m.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply box */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleReply} className="flex gap-3">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder={`Reply to ${userName(active)}…`}
                  rows={2}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply(e); } }}
                />
                <button type="submit" disabled={!reply.trim()} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white px-4 rounded-xl transition-colors text-sm font-semibold">Send</button>
              </form>
              <p className="text-xs text-gray-400 mt-1 ml-1">Press Enter to send, Shift+Enter for new line</p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-500">Select a conversation</p>
              <p className="text-sm text-gray-400 mt-1">or start a new message</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
