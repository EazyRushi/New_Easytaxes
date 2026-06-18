import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { usePortal } from './portalStore';

const ROLE_NAV = {
  CLIENT: [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '◻' },
    { label: 'My Tasks', path: '/portal/tasks', icon: '✓' },
    { label: 'Documents', path: '/portal/documents', icon: '📄' },
    { label: 'Tax Center', path: '/portal/taxes', icon: '🧾' },
    { label: 'Bookkeeping', path: '/portal/bookkeeping', icon: '📚' },
    { label: 'Messages', path: '/portal/messages', icon: '💬' },
    { label: 'Settings', path: '/portal/settings', icon: '⚙' },
  ],
  ACCOUNTANT: [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '◻' },
    { label: 'Task Manager', path: '/portal/tasks', icon: '✓' },
    { label: 'Clients', path: '/portal/clients', icon: '👥' },
    { label: 'Filings', path: '/portal/filings', icon: '📋' },
    { label: 'Messages', path: '/portal/messages', icon: '💬' },
    { label: 'Reports', path: '/portal/reports', icon: '📊' },
  ],
  BOOKKEEPER: [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '◻' },
    { label: 'Task Manager', path: '/portal/tasks', icon: '✓' },
    { label: 'Transactions', path: '/portal/transactions', icon: '💳' },
    { label: 'Reconciliation', path: '/portal/reconciliation', icon: '⚖' },
    { label: 'Monthly Close', path: '/portal/monthly-close', icon: '📅' },
  ],
  TAX_SPECIALIST: [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '◻' },
    { label: 'Task Manager', path: '/portal/tasks', icon: '✓' },
    { label: 'Tax Returns', path: '/portal/returns', icon: '🧾' },
    { label: 'Compliance', path: '/portal/compliance', icon: '✅' },
    { label: 'Approvals', path: '/portal/approvals', icon: '📝' },
  ],
  ADMIN: [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '◻' },
    { label: 'Task Manager', path: '/portal/tasks', icon: '✓' },
    { label: 'Users', path: '/portal/users', icon: '👥' },
    { label: 'All Clients', path: '/portal/clients', icon: '🏢' },
    { label: 'Analytics', path: '/portal/analytics', icon: '📊' },
    { label: 'Workflows', path: '/portal/workflows', icon: '⚡' },
    { label: 'Settings', path: '/portal/settings', icon: '⚙' },
  ],
  SUPPORT: [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '◻' },
    { label: 'Task Manager', path: '/portal/tasks', icon: '✓' },
    { label: 'Tickets', path: '/portal/tickets', icon: '🎫' },
    { label: 'Client Lookup', path: '/portal/clients', icon: '🔍' },
  ],
};

const ROLE_COLORS = {
  CLIENT: 'bg-blue-500',
  ACCOUNTANT: 'bg-green-600',
  BOOKKEEPER: 'bg-purple-600',
  TAX_SPECIALIST: 'bg-yellow-600',
  ADMIN: 'bg-red-600',
  SUPPORT: 'bg-teal-600',
};

const ROLE_LABELS = {
  CLIENT: 'Client',
  ACCOUNTANT: 'Accountant',
  BOOKKEEPER: 'Bookkeeper',
  TAX_SPECIALIST: 'Tax Specialist',
  ADMIN: 'Administrator',
  SUPPORT: 'Support Agent',
};

export default function PortalLayout({ children }) {
  const { currentUser, logout, notifications } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  if (!currentUser) {
    navigate('/portal/login');
    return null;
  }

  const nav = ROLE_NAV[currentUser.role] || ROLE_NAV.CLIENT;
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  const NavLinks = () => (
    <nav className="flex-1 overflow-y-auto py-4">
      {nav.map(item => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors mx-2 rounded-lg ${
              active
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-4 py-5 border-b border-gray-100">
          <a href="/" className="flex items-center gap-2">
            <span className="text-orange-500 font-black text-xl">EazyTaxes</span>
          </a>
          <p className="text-xs text-gray-400 mt-0.5">Client Portal</p>
        </div>

        {/* Role badge */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${ROLE_COLORS[currentUser.role]} text-white flex items-center justify-center text-sm font-bold`}>
              {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400">{ROLE_LABELS[currentUser.role]}</p>
            </div>
          </div>
        </div>

        <NavLinks />

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <span>↩</span> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded text-gray-500 hover:bg-gray-100"
          >
            ☰
          </button>
          <div className="hidden lg:block text-sm text-gray-500">
            {currentUser.company !== 'EazyTaxes' && (
              <span>Welcome back, <strong className="text-gray-900">{currentUser.name}</strong></span>
            )}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && (
                <NotifDropdown
                  onClose={() => setShowNotifs(false)}
                />
              )}
            </div>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full ${ROLE_COLORS[currentUser.role]} text-white flex items-center justify-center text-xs font-bold cursor-default`}>
              {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NotifDropdown({ onClose }) {
  const { notifications, markNotificationRead, markAllRead } = usePortal();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-gray-900">Notifications</h3>
        <button onClick={markAllRead} className="text-xs text-orange-500 hover:underline">Mark all read</button>
      </div>
      <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No notifications</p>
        )}
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${!n.read ? 'bg-orange-50/50' : ''}`}
            onClick={() => { markNotificationRead(n.id); onClose(); }}
          >
            <p className={`text-sm ${!n.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{n.message}</p>
            <p className="text-xs text-gray-400 mt-0.5">{n.createdAt}</p>
            {!n.read && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full absolute right-4 top-1/2 -translate-y-1/2" />}
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full text-xs text-center text-gray-400 hover:text-gray-600 py-2 border-t border-gray-100">Close</button>
    </div>
  );
}
