import { useState } from 'react';
import { usePortal } from '../portalStore';

export default function SettingsPage() {
  const { currentUser } = usePortal();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: currentUser.name.split(' ')[0] ?? '',
    lastName:  currentUser.name.split(' ').slice(1).join(' ') ?? '',
    email:     currentUser.email,
    phone:     '555-0101',
    company:   currentUser.company ?? '',
    timezone:  'America/New_York',
  });
  const [notifPrefs, setNotifPrefs] = useState({
    taskAssigned:   true,
    taskCompleted:  true,
    messageReceived:true,
    deadlineReminder:true,
    weeklyDigest:   false,
  });
  const [pw, setPw] = useState({ current:'', newPw:'', confirm:'' });
  const [pwMsg, setPwMsg] = useState('');

  const save = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const savePassword = (e) => {
    e.preventDefault();
    if (pw.newPw !== pw.confirm) { setPwMsg('Passwords do not match'); return; }
    if (pw.newPw.length < 8) { setPwMsg('Password must be at least 8 characters'); return; }
    setPwMsg('Password updated successfully!');
    setPw({ current:'', newPw:'', confirm:'' });
    setTimeout(() => setPwMsg(''), 3000);
  };

  const TABS = ['profile', 'notifications', 'security'];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <form onSubmit={save} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg">Profile Information</h2>
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold flex items-center justify-center">
              {currentUser.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{currentUser.name}</p>
              <p className="text-sm text-gray-500">{currentUser.role}</p>
              <button type="button" className="text-xs text-orange-500 hover:underline mt-1">Change photo</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input value={form.firstName} onChange={e => setForm(p=>({...p,firstName:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input value={form.lastName} onChange={e => setForm(p=>({...p,lastName:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select value={form.timezone} onChange={e => setForm(p=>({...p,timezone:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                <option value="America/New_York">Eastern (ET)</option>
                <option value="America/Chicago">Central (CT)</option>
                <option value="America/Denver">Mountain (MT)</option>
                <option value="America/Los_Angeles">Pacific (PT)</option>
              </select>
            </div>
          </div>
          {currentUser.role === 'CLIENT' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input value={form.company} onChange={e => setForm(p=>({...p,company:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          )}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">Save Changes</button>
            {saved && <span className="text-green-600 text-sm font-medium">✓ Saved successfully!</span>}
          </div>
        </form>
      )}

      {tab === 'notifications' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-lg">Notification Preferences</h2>
          <p className="text-sm text-gray-500">Choose what you'd like to be notified about.</p>
          {Object.entries({
            taskAssigned:    'Task assigned to me',
            taskCompleted:   'Task completed',
            messageReceived: 'New message received',
            deadlineReminder:'Deadline reminders (48h before)',
            weeklyDigest:    'Weekly summary digest (email)',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
              </div>
              <button
                type="button"
                onClick={() => setNotifPrefs(p => ({...p, [key]:!p[key]}))}
                className={`relative w-12 h-6 rounded-full transition-colors ${notifPrefs[key] ? 'bg-orange-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifPrefs[key] ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
          <button onClick={() => setSaved(true) || setTimeout(() => setSaved(false), 2000)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold mt-2 transition-colors">
            Save Preferences
          </button>
          {saved && <span className="text-green-600 text-sm font-medium ml-3">✓ Saved!</span>}
        </div>
      )}

      {tab === 'security' && (
        <form onSubmit={savePassword} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-lg">Change Password</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" value={pw.current} onChange={e => setPw(p=>({...p,current:e.target.value}))} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" value={pw.newPw} onChange={e => setPw(p=>({...p,newPw:e.target.value}))} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" value={pw.confirm} onChange={e => setPw(p=>({...p,confirm:e.target.value}))} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          {pwMsg && <p className={`text-sm ${pwMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{pwMsg}</p>}
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">Update Password</button>

          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Active Sessions</h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Current Session</p>
                <p className="text-xs text-gray-400">Chrome · Windows · Now</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
