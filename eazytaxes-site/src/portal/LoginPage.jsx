import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortal } from './portalStore';

const DEMO_ACCOUNTS = [
  { role: 'Client', email: 'client@eazytaxes.com', password: 'client123', color: 'bg-blue-100 text-blue-800', icon: '🏢' },
  { role: 'Accountant', email: 'accountant@eazytaxes.com', password: 'acc123', color: 'bg-green-100 text-green-800', icon: '📊' },
  { role: 'Bookkeeper', email: 'bookkeeper@eazytaxes.com', password: 'book123', color: 'bg-purple-100 text-purple-800', icon: '📚' },
  { role: 'Tax Specialist', email: 'tax@eazytaxes.com', password: 'tax123', color: 'bg-yellow-100 text-yellow-800', icon: '🧾' },
  { role: 'Admin', email: 'admin@eazytaxes.com', password: 'admin123', color: 'bg-red-100 text-red-800', icon: '⚙️' },
];

export default function LoginPage() {
  const { login, currentUser } = usePortal();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect already-logged-in users instead of rendering a blank page
  useEffect(() => {
    if (currentUser) navigate('/portal/dashboard');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/portal/dashboard');
    } else {
      setError(result.error);
    }
  };

  const demoLogin = async (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const result = login(account.email, account.password);
    setLoading(false);
    if (result.success) navigate('/portal/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-700 flex-col justify-between p-12">
        <div>
          <a href="/" className="text-white text-2xl font-bold tracking-tight">EazyTaxes</a>
          <p className="text-orange-100 text-sm mt-1">Client Portal</p>
        </div>
        <div>
          <h2 className="text-white text-4xl font-bold leading-tight">
            Your accounting,<br />simplified.
          </h2>
          <p className="text-orange-100 mt-4 text-lg">
            Track tasks, manage documents, and stay on top of your taxes — all in one place.
          </p>
          <div className="mt-10 space-y-4">
            {['Real-time task tracking', 'Secure document center', 'Direct accountant messaging', 'Tax deadline reminders'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-xs">✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-orange-200 text-sm">© 2025 EazyTaxes. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8">
            <a href="/" className="text-2xl font-bold text-orange-500">EazyTaxes</a>
            <p className="text-gray-500 text-sm">Client Portal</p>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to your portal</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your credentials to access your dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 whitespace-nowrap">Demo accounts</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_ACCOUNTS.map(account => (
                <button
                  key={account.email}
                  onClick={() => demoLogin(account)}
                  disabled={loading}
                  className="flex items-center gap-3 w-full text-left border border-gray-200 rounded-lg px-3 py-2.5 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                >
                  <span className="text-lg">{account.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${account.color}`}>{account.role}</span>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{account.email}</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-400 text-xs">→</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
