import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, saveToken, clearToken } from './api';
import {
  MOCK_USERS, SEED_TASKS, SEED_MESSAGES, SEED_FILINGS,
  SEED_TRANSACTIONS, SEED_TICKETS, SEED_COMPLIANCE, SEED_RECONCILIATION, SEED_WORKFLOWS,
} from './portalData';

const PortalContext = createContext(null);

function load(key, fallback) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; }
}
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// Convert backend user shape to flat UI shape the portal expects
function normalizeUser(u) {
  const first  = u.profile?.firstName ?? '';
  const last   = u.profile?.lastName  ?? '';
  const name   = `${first} ${last}`.trim() || u.email;
  const avatar = `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase() || u.email[0].toUpperCase();
  return {
    id:          u.id,
    email:       u.email,
    role:        u.role,
    name,
    avatar,
    phone:       u.profile?.phone            ?? '',
    companyName: u.clientProfile?.companyName ?? '',
  };
}

// Normalize task dates from ISO strings to YYYY-MM-DD
function normalizeTask(t) {
  return {
    ...t,
    assignedTo:  t.assignedToId  ?? t.assignedTo  ?? null,
    dueDate:     t.dueDate      ? String(t.dueDate).split('T')[0]      : null,
    createdAt:   t.createdAt    ? String(t.createdAt).split('T')[0]    : null,
    completedAt: t.completedAt  ? String(t.completedAt).split('T')[0]  : null,
  };
}

export function PortalProvider({ children }) {
  const [currentUser, setCurrentUser]       = useState(() => load('et_user', null));
  const [apiConnected, setApiConnected]     = useState(false);
  const [tasks, setTasks]                   = useState(() => load('et_tasks', SEED_TASKS));
  const [messages, setMessages]             = useState(() => load('et_messages', SEED_MESSAGES));
  const [filings, setFilings]               = useState(() => load('et_filings', SEED_FILINGS));
  const [transactions, setTransactions]     = useState(() => load('et_txns', SEED_TRANSACTIONS));
  const [tickets, setTickets]               = useState(() => load('et_tickets', SEED_TICKETS));
  const [compliance, setCompliance]         = useState(() => load('et_compliance', SEED_COMPLIANCE));
  const [reconciliation, setReconciliation] = useState(() => load('et_recon', SEED_RECONCILIATION));
  const [workflows, setWorkflows]           = useState(() => load('et_workflows', SEED_WORKFLOWS));
  const [notifications, setNotifications]   = useState(() => load('et_notifs', [
    { id:'n1', message:'Your Q1 P&L report is ready for review', read:false, createdAt:'2025-06-14', type:'info' },
    { id:'n2', message:'Q2 estimated tax payment due June 15',   read:false, createdAt:'2025-06-13', type:'warning' },
    { id:'n3', message:'Bank statements upload reminder',         read:true,  createdAt:'2025-06-10', type:'info' },
  ]));

  useEffect(() => { save('et_user', currentUser); },       [currentUser]);
  useEffect(() => { save('et_messages', messages); },      [messages]);
  useEffect(() => { save('et_filings', filings); },        [filings]);
  useEffect(() => { save('et_txns', transactions); },      [transactions]);
  useEffect(() => { save('et_tickets', tickets); },        [tickets]);
  useEffect(() => { save('et_compliance', compliance); },  [compliance]);
  useEffect(() => { save('et_recon', reconciliation); },   [reconciliation]);
  useEffect(() => { save('et_workflows', workflows); },    [workflows]);
  useEffect(() => { if (!apiConnected) save('et_tasks', tasks); }, [tasks, apiConnected]);
  useEffect(() => { if (!apiConnected) save('et_notifs', notifications); }, [notifications, apiConnected]);

  // On mount: restore session from stored JWT token
  useEffect(() => {
    const token = localStorage.getItem('et_token');
    if (!token) return;
    api.me()
      .then(u => {
        setCurrentUser(normalizeUser(u));
        setApiConnected(true);
        return Promise.all([api.getTasks(), api.getNotifications()]);
      })
      .then(([tasksResp, notifsResp]) => {
        if (tasksResp?.tasks) setTasks(tasksResp.tasks.map(normalizeTask));
        if (notifsResp?.notifications) setNotifications(notifsResp.notifications);
      })
      .catch(() => {
        clearToken();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // AUTH
  const login = useCallback(async (email, password) => {
    try {
      const data = await api.login(email, password);
      saveToken(data.token);
      const user = normalizeUser(data.user);
      setCurrentUser(user);
      setApiConnected(true);
      try {
        const [tasksResp, notifsResp] = await Promise.all([
          api.getTasks(),
          api.getNotifications(),
        ]);
        if (tasksResp?.tasks) setTasks(tasksResp.tasks.map(normalizeTask));
        if (notifsResp?.notifications) setNotifications(notifsResp.notifications);
      } catch { /* keep local data on fetch failure */ }
      return { success: true };
    } catch (apiErr) {
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (mockUser) {
        const { password: _, ...safe } = mockUser;
        setCurrentUser(safe);
        return { success: true };
      }
      return { success: false, error: apiErr.message ?? 'Invalid email or password' };
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setCurrentUser(null);
    setApiConnected(false);
    setTasks(SEED_TASKS);
    setNotifications([
      { id:'n1', message:'Your Q1 P&L report is ready for review', read:false, createdAt:'2025-06-14', type:'info' },
      { id:'n2', message:'Q2 estimated tax payment due June 15',   read:false, createdAt:'2025-06-13', type:'warning' },
      { id:'n3', message:'Bank statements upload reminder',         read:true,  createdAt:'2025-06-10', type:'info' },
    ]);
  }, []);

  // TASKS
  const getTasksForUser = useCallback((user) => {
    if (!user) return [];
    if (apiConnected) return tasks;
    if (user.role === 'CLIENT')         return tasks.filter(t => t.clientId === user.id);
    if (user.role === 'ACCOUNTANT')     return tasks.filter(t => t.assignedTo === user.id);
    if (user.role === 'BOOKKEEPER')     return tasks.filter(t => t.assignedTo === user.id || t.category === 'BOOKKEEPING');
    if (user.role === 'TAX_SPECIALIST') return tasks.filter(t => t.assignedTo === user.id || t.category === 'TAX');
    return tasks;
  }, [tasks, apiConnected]);

  const createTask = useCallback(async (data) => {
    if (apiConnected) {
      const task = await api.createTask(data);
      const normalized = normalizeTask(task);
      setTasks(p => [normalized, ...p]);
      return normalized;
    }
    const t = { id:`t${Date.now()}`, status:'PENDING', createdAt:new Date().toISOString().split('T')[0], completedAt:null, ...data };
    setTasks(p => [...p, t]);
    return t;
  }, [apiConnected]);

  const updateTask = useCallback(async (id, updates) => {
    if (apiConnected) {
      const task = await api.updateTask(id, updates);
      const normalized = normalizeTask(task);
      setTasks(p => p.map(t => t.id === id ? normalized : t));
      return normalized;
    }
    setTasks(p => p.map(t => {
      if (t.id !== id) return t;
      const u = { ...t, ...updates };
      if (updates.status === 'COMPLETED' && !t.completedAt) u.completedAt = new Date().toISOString().split('T')[0];
      return u;
    }));
  }, [apiConnected]);

  const deleteTask = useCallback(async (id) => {
    if (apiConnected) {
      try { await api.deleteTask(id); } catch { /* ignore */ }
    }
    setTasks(p => p.filter(t => t.id !== id));
  }, [apiConnected]);

  // MESSAGES
  const getMessages = useCallback((userId) =>
    [...messages].filter(m => m.from === userId || m.to === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  , [messages]);

  const sendMessage = useCallback((from, to, subject, body) => {
    const m = { id:`m${Date.now()}`, from, to, subject, body, createdAt:new Date().toISOString(), read:false };
    setMessages(p => [...p, m]);
    setNotifications(p => [{ id:`n${Date.now()}`, message:`New message: ${subject}`, read:false, createdAt:new Date().toISOString().split('T')[0], type:'info' }, ...p]);
    return m;
  }, []);

  const markMessageRead = useCallback((id) =>
    setMessages(p => p.map(m => m.id === id ? { ...m, read:true } : m))
  , []);

  // FILINGS
  const getFilings = useCallback((userId) => {
    if (!userId) return filings;
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user?.role === 'CLIENT') return filings.filter(f => f.clientId === userId);
    return filings;
  }, [filings]);

  const updateFiling = useCallback((id, updates) =>
    setFilings(p => p.map(f => f.id === id ? { ...f, ...updates } : f))
  , []);

  // TRANSACTIONS
  const getTransactions = useCallback((clientId) =>
    clientId ? transactions.filter(t => t.clientId === clientId) : transactions
  , [transactions]);

  const updateTransaction = useCallback((id, updates) =>
    setTransactions(p => p.map(t => t.id === id ? { ...t, ...updates } : t))
  , []);

  // TICKETS
  const getTickets = useCallback((user) => {
    if (!user) return tickets;
    if (user.role === 'CLIENT') return tickets.filter(t => t.clientId === user.id);
    return tickets;
  }, [tickets]);

  const createTicket = useCallback((data) => {
    const t = { id:`tk${Date.now()}`, status:'OPEN', createdAt:new Date().toISOString().split('T')[0], agentId:null, resolvedAt:null, ...data };
    setTickets(p => [...p, t]);
    return t;
  }, []);

  const updateTicket = useCallback((id, updates) =>
    setTickets(p => p.map(t => {
      if (t.id !== id) return t;
      const u = { ...t, ...updates };
      if (updates.status === 'RESOLVED' && !t.resolvedAt) u.resolvedAt = new Date().toISOString().split('T')[0];
      return u;
    }))
  , []);

  // COMPLIANCE
  const getCompliance = useCallback((clientId) =>
    clientId ? compliance.filter(c => c.clientId === clientId) : compliance
  , [compliance]);

  const updateCompliance = useCallback((id, updates) =>
    setCompliance(p => p.map(c => c.id === id ? { ...c, ...updates } : c))
  , []);

  // RECONCILIATION
  const getReconciliation = useCallback((clientId) =>
    clientId ? reconciliation.filter(r => r.clientId === clientId) : reconciliation
  , [reconciliation]);

  const updateReconciliation = useCallback((id, updates) =>
    setReconciliation(p => p.map(r => r.id === id ? { ...r, ...updates } : r))
  , []);

  // WORKFLOWS
  const getWorkflows = useCallback((clientId) =>
    clientId ? workflows.filter(w => w.clientId === clientId) : workflows
  , [workflows]);

  const createWorkflow = useCallback((data) => {
    const wf = { id:`wf${Date.now()}`, status:'ACTIVE', startedAt:new Date().toISOString().split('T')[0], completedAt:null, ...data };
    setWorkflows(p => [...p, wf]);
    return wf;
  }, []);

  const updateWorkflow = useCallback((id, updates) =>
    setWorkflows(p => p.map(w => w.id === id ? { ...w, ...updates } : w))
  , []);

  // NOTIFICATIONS
  const markNotificationRead = useCallback((id) => {
    setNotifications(p => p.map(n => n.id === id ? { ...n, read:true } : n));
    if (apiConnected) api.markRead(id).catch(() => {});
  }, [apiConnected]);

  const markAllRead = useCallback(() => {
    setNotifications(p => p.map(n => ({ ...n, read:true })));
    if (apiConnected) api.markAllRead().catch(() => {});
  }, [apiConnected]);

  return (
    <PortalContext.Provider value={{
      currentUser, login, logout, apiConnected,
      tasks, getTasksForUser, createTask, updateTask, deleteTask,
      messages, getMessages, sendMessage, markMessageRead,
      filings, getFilings, updateFiling,
      transactions, getTransactions, updateTransaction,
      tickets, getTickets, createTicket, updateTicket,
      compliance, getCompliance, updateCompliance,
      reconciliation, getReconciliation, updateReconciliation,
      workflows, getWorkflows, createWorkflow, updateWorkflow,
      notifications, markNotificationRead, markAllRead,
      users: MOCK_USERS,
    }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used within PortalProvider');
  return ctx;
}
