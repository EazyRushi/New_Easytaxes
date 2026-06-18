import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { usePortal } from './portalStore';
import {
  LayoutDashboard, ListTodo, FileText, Receipt, BookOpen, MessageSquare,
  Settings, Users, FolderOpen, BarChart2, CreditCard, Scale, CalendarDays,
  FileCheck, ShieldCheck, FilePenLine, UserCog, TrendingUp, Workflow,
  Ticket, Search, Bell, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

const ROLE_NAV = {
  CLIENT: [
    { label: 'Dashboard',   path: '/portal/dashboard',   Icon: LayoutDashboard },
    { label: 'My Tasks',    path: '/portal/tasks',        Icon: ListTodo },
    { label: 'Documents',   path: '/portal/documents',    Icon: FileText },
    { label: 'Tax Center',  path: '/portal/taxes',        Icon: Receipt },
    { label: 'Bookkeeping', path: '/portal/bookkeeping',  Icon: BookOpen },
    { label: 'Messages',    path: '/portal/messages',     Icon: MessageSquare },
    { label: 'Tickets',     path: '/portal/tickets',      Icon: Ticket },
    { label: 'Settings',    path: '/portal/settings',     Icon: Settings },
  ],
  ACCOUNTANT: [
    { label: 'Dashboard',     path: '/portal/dashboard', Icon: LayoutDashboard },
    { label: 'Task Manager',  path: '/portal/tasks',     Icon: ListTodo },
    { label: 'Clients',       path: '/portal/clients',   Icon: Users },
    { label: 'Filings',       path: '/portal/filings',   Icon: FolderOpen },
    { label: 'Messages',      path: '/portal/messages',  Icon: MessageSquare },
    { label: 'Reports',       path: '/portal/reports',   Icon: BarChart2 },
    { label: 'Settings',      path: '/portal/settings',  Icon: Settings },
  ],
  BOOKKEEPER: [
    { label: 'Dashboard',      path: '/portal/dashboard',     Icon: LayoutDashboard },
    { label: 'Task Manager',   path: '/portal/tasks',         Icon: ListTodo },
    { label: 'Transactions',   path: '/portal/transactions',  Icon: CreditCard },
    { label: 'Reconciliation', path: '/portal/reconciliation',Icon: Scale },
    { label: 'Monthly Close',  path: '/portal/monthly-close', Icon: CalendarDays },
    { label: 'Messages',       path: '/portal/messages',      Icon: MessageSquare },
  ],
  TAX_SPECIALIST: [
    { label: 'Dashboard',    path: '/portal/dashboard', Icon: LayoutDashboard },
    { label: 'Task Manager', path: '/portal/tasks',     Icon: ListTodo },
    { label: 'Tax Returns',  path: '/portal/returns',   Icon: FileCheck },
    { label: 'Compliance',   path: '/portal/compliance',Icon: ShieldCheck },
    { label: 'Approvals',    path: '/portal/approvals', Icon: FilePenLine },
    { label: 'Messages',     path: '/portal/messages',  Icon: MessageSquare },
  ],
  ADMIN: [
    { label: 'Dashboard',    path: '/portal/dashboard', Icon: LayoutDashboard },
    { label: 'Task Manager', path: '/portal/tasks',     Icon: ListTodo },
    { label: 'Users',        path: '/portal/users',     Icon: UserCog },
    { label: 'All Clients',  path: '/portal/clients',   Icon: Users },
    { label: 'Analytics',    path: '/portal/analytics', Icon: TrendingUp },
    { label: 'Workflows',    path: '/portal/workflows', Icon: Workflow },
    { label: 'Tickets',      path: '/portal/tickets',   Icon: Ticket },
    { label: 'Settings',     path: '/portal/settings',  Icon: Settings },
  ],
  SUPPORT: [
    { label: 'Dashboard',     path: '/portal/dashboard', Icon: LayoutDashboard },
    { label: 'Task Manager',  path: '/portal/tasks',     Icon: ListTodo },
    { label: 'Tickets',       path: '/portal/tickets',   Icon: Ticket },
    { label: 'Client Lookup', path: '/portal/clients',   Icon: Search },
    { label: 'Messages',      path: '/portal/messages',  Icon: MessageSquare },
  ],
};

const ROLE_COLORS = {
  CLIENT:         'bg-blue-500',
  ACCOUNTANT:     'bg-emerald-600',
  BOOKKEEPER:     'bg-violet-600',
  TAX_SPECIALIST: 'bg-amber-600',
  ADMIN:          'bg-rose-600',
  SUPPORT:        'bg-teal-600',
};

const ROLE_LABELS = {
  CLIENT:         'Client',
  ACCOUNTANT:     'Accountant',
  BOOKKEEPER:     'Bookkeeper',
  TAX_SPECIALIST: 'Tax Specialist',
  ADMIN:          'Administrator',
  SUPPORT:        'Support Agent',
};

const NOTIF_ICON = { INFO: '💬', WARNING: '⚠️', SUCCESS: '✅', ERROR: '❌' };

export default function PortalLayout({ children }) {
  const { currentUser, logout, notifications } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  if (!currentUser) { navigate('/portal/login'); return null; }

  const nav = ROLE_NAV[currentUser.role] || ROLE_NAV.CLIENT;
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/portal/login'); };

  const initials = currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const roleColor = ROLE_COLORS[currentUser.role];

  const NavLinks = ({ onNav }) => (
    <nav className="flex-1 overflow-y-auto py-3 px-2">
      <div className="space-y-0.5">
        {nav.map(({ label, path, Icon }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} onClick={onNav}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon size={16} className={`flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} className="text-orange-200" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">ET</span>
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">EazyTaxes</p>
              <p className="text-xs text-gray-400 -mt-0.5">Client Portal</p>
            </div>
          </a>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* User profile */}
        <div className="px-4 py-3 border-b border-gray-100 mx-2 mt-2 rounded-xl bg-gray-50">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${roleColor} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 ring-2 ring-white shadow-sm`}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400 truncate">{ROLE_LABELS[currentUser.role]}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <NavLinks onNav={() => setSidebarOpen(false)} />

        {/* Sign out */}
        <div className="p-3 border-t border-gray-100">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <LogOut size={16} className="text-gray-400 group-hover:text-red-500" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between flex-shrink-0 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span>Welcome back,</span>
            <strong className="text-gray-900">{currentUser.name}</strong>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotifs(v => !v)}
                className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </button>
              {showNotifs && <NotifDropdown onClose={() => setShowNotifs(false)} />}
            </div>

            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full ${roleColor} text-white flex items-center justify-center text-xs font-bold cursor-default ring-2 ring-white shadow-sm`}>
              {initials}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NotifDropdown({ onClose }) {
  const { notifications, markNotificationRead, markAllRead } = usePortal();
  const unread = notifications.filter(n => !n.read);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-gray-900">Notifications</h3>
          {unread.length > 0 && (
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{unread.length}</span>
          )}
        </div>
        <button onClick={markAllRead} className="text-xs text-orange-500 hover:text-orange-600 font-medium">Mark all read</button>
      </div>
      <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell size={24} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">No notifications</p>
          </div>
        ) : notifications.map(n => (
          <div key={n.id} onClick={() => { markNotificationRead(n.id); onClose(); }}
            className={`relative px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${!n.read ? 'bg-orange-50/60' : ''}`}
          >
            {!n.read && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />}
            <p className={`text-sm pl-2 ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{n.message}</p>
            <p className="text-xs text-gray-400 mt-0.5 pl-2">{n.createdAt}</p>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full text-xs text-center text-gray-400 hover:text-gray-600 py-2.5 border-t border-gray-100 font-medium transition-colors">
        Close
      </button>
    </div>
  );
}
