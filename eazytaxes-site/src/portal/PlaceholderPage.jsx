import { Link } from 'react-router-dom';

const PAGE_META = {
  '/portal/documents': { icon: '📄', title: 'Document Center', desc: 'Upload, download, and manage client documents securely.' },
  '/portal/taxes': { icon: '🧾', title: 'Tax Center', desc: 'View estimated tax liability, return status, and filing history.' },
  '/portal/bookkeeping': { icon: '📚', title: 'Bookkeeping', desc: 'Transaction sync, expense categorization, and P&L reports.' },
  '/portal/messages': { icon: '💬', title: 'Messages', desc: 'Secure messaging with your dedicated accountant.' },
  '/portal/settings': { icon: '⚙', title: 'Settings', desc: 'Manage your account, preferences, and notification settings.' },
  '/portal/clients': { icon: '👥', title: 'Clients', desc: 'View and manage assigned client accounts.' },
  '/portal/filings': { icon: '📋', title: 'Filings', desc: 'Track all tax filings and their current stages.' },
  '/portal/reports': { icon: '📊', title: 'Reports', desc: 'Client completion metrics, revenue per client, SLA tracking.' },
  '/portal/transactions': { icon: '💳', title: 'Transactions', desc: 'Import and categorize transactions. Flag anomalies.' },
  '/portal/reconciliation': { icon: '⚖', title: 'Reconciliation', desc: 'Bank reconciliation and account balancing.' },
  '/portal/monthly-close': { icon: '📅', title: 'Monthly Close', desc: 'Complete monthly close checklist for assigned clients.' },
  '/portal/returns': { icon: '🧾', title: 'Tax Returns', desc: 'Manage the full tax preparation queue and filing stages.' },
  '/portal/compliance': { icon: '✅', title: 'Compliance', desc: 'Monitor filing deadlines, missing forms, state requirements.' },
  '/portal/approvals': { icon: '📝', title: 'Approvals', desc: 'E-sign workflow, signature requests, and approval tracking.' },
  '/portal/tickets': { icon: '🎫', title: 'Support Tickets', desc: 'Open, escalated, and resolved support tickets.' },
  '/portal/users': { icon: '👥', title: 'Users', desc: 'Manage all platform users, roles, and permissions.' },
  '/portal/analytics': { icon: '📊', title: 'Analytics', desc: 'Platform-wide metrics, revenue analytics, and SLA data.' },
  '/portal/workflows': { icon: '⚡', title: 'Workflow Engine', desc: 'Configure and automate client lifecycle workflows.' },
};

export default function PlaceholderPage() {
  const path = window.location.pathname;
  const meta = PAGE_META[path] || { icon: '🚧', title: 'Coming Soon', desc: 'This section is under development.' };

  return (
    <div className="flex items-center justify-center min-h-full p-12">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">{meta.icon}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{meta.title}</h1>
        <p className="text-gray-500 mb-6">{meta.desc}</p>
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🚧 Phase 2 — Under Development
        </div>
        <div className="block">
          <Link to="/portal/tasks" className="text-sm text-orange-500 hover:underline">← Go to Task Manager</Link>
        </div>
      </div>
    </div>
  );
}
