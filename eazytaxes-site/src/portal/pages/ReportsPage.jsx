import { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { usePortal } from '../portalStore';
import { MOCK_USERS } from '../portalData';

function clientName(id) { return MOCK_USERS.find(u => u.id === id)?.name ?? '—'; }

const REPORT_TYPES = [
  { key:'PL',          label:'P&L Statement',          desc:'Revenue, expenses, and net income summary' },
  { key:'BALANCE',     label:'Balance Sheet',           desc:'Assets, liabilities, and equity snapshot' },
  { key:'CASH_FLOW',   label:'Cash Flow Statement',     desc:'Operating, investing, and financing activities' },
  { key:'TAX_SUMMARY', label:'Tax Summary',             desc:'Filing status and estimated tax liability' },
  { key:'FILING_STATUS', label:'Filing Status Report',  desc:'All client filings at a glance' },
];

function PLReport({ transactions, clientId }) {
  const clientTx = clientId === 'ALL' ? transactions : transactions.filter(t => t.clientId === clientId);
  const rev  = clientTx.filter(t => t.amount > 0);
  const exp  = clientTx.filter(t => t.amount < 0);
  const totalRev = rev.reduce((s,t) => s + t.amount, 0);
  const totalExp = exp.reduce((s,t) => s + Math.abs(t.amount), 0);
  const net  = totalRev - totalExp;

  const byCategory = {};
  exp.forEach(t => { byCategory[t.category ?? 'Other'] = (byCategory[t.category ?? 'Other'] ?? 0) + Math.abs(t.amount); });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-green-700">${totalRev.toLocaleString('en-US',{minimumFractionDigits:2})}</p><p className="text-xs text-gray-500 mt-0.5">Revenue</p></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-red-600">${totalExp.toLocaleString('en-US',{minimumFractionDigits:2})}</p><p className="text-xs text-gray-500 mt-0.5">Expenses</p></div>
        <div className={`${net>=0?'bg-blue-50 border-blue-200':'bg-red-50 border-red-200'} border rounded-xl p-4 text-center`}><p className={`text-2xl font-bold ${net>=0?'text-blue-700':'text-red-600'}`}>${Math.abs(net).toLocaleString('en-US',{minimumFractionDigits:2})}</p><p className="text-xs text-gray-500 mt-0.5">Net {net>=0?'Income':'Loss'}</p></div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th><th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {Object.entries(byCategory).sort((a,b)=>b[1]-a[1]).map(([cat,amt]) => (
              <tr key={cat} className="hover:bg-gray-50"><td className="px-4 py-3 text-gray-700">{cat}</td><td className="px-4 py-3 text-right text-red-600 font-medium">-${amt.toLocaleString('en-US',{minimumFractionDigits:2})}</td></tr>
            ))}
            {rev.length > 0 && <tr className="hover:bg-gray-50"><td className="px-4 py-3 text-gray-700">Revenue</td><td className="px-4 py-3 text-right text-green-600 font-medium">+${totalRev.toLocaleString('en-US',{minimumFractionDigits:2})}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilingStatusReport({ filings, clientId }) {
  const filtered = clientId === 'ALL' ? filings : filings.filter(f => f.clientId === clientId);
  const STATUS_STYLE = { COLLECTING_DOCS:'bg-yellow-100 text-yellow-700', PREPARING:'bg-blue-100 text-blue-700', PENDING:'bg-purple-100 text-purple-700', FILED:'bg-green-100 text-green-700' };
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm"><thead className="bg-gray-50 border-b border-gray-200"><tr>
        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Client</th>
        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Year</th>
        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Due</th>
      </tr></thead>
        <tbody className="divide-y divide-gray-100">
          {filtered.map(f => (
            <tr key={f.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">{clientName(f.clientId)}</td>
              <td className="px-4 py-3 text-gray-700">{f.type}</td>
              <td className="px-4 py-3 text-gray-500">{f.taxYear}</td>
              <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[f.status]}`}>{f.status.replace('_',' ')}</span></td>
              <td className="px-4 py-3 text-gray-500">{f.dueDate ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ReportsPage() {
  const { transactions, filings } = usePortal();
  const clients = MOCK_USERS.filter(u => u.role === 'CLIENT');
  const [reportType, setReportType] = useState('PL');
  const [clientId, setClientId] = useState('ALL');

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Financial reports and client summaries</p>
        </div>
        <button className="border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg transition-colors">↓ Export PDF</button>
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <select value={clientId} onChange={e => setClientId(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white">
          <option value="ALL">All Clients</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Report type tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {REPORT_TYPES.map(r => (
          <button key={r.key} onClick={() => setReportType(r.key)} className={`text-left p-3 rounded-xl border transition-all ${reportType===r.key ? 'border-orange-400 bg-orange-50 ring-2 ring-orange-400' : 'border-gray-200 hover:border-orange-300 bg-white'}`}>
            <p className="text-xs font-semibold text-gray-900">{r.label}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight hidden md:block">{r.desc}</p>
          </button>
        ))}
      </div>

      {/* Report content */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">{REPORT_TYPES.find(r=>r.key===reportType)?.label}</h2>
          <p className="text-xs text-gray-400">{clientId === 'ALL' ? 'All Clients' : clientName(clientId)}</p>
        </div>

        {reportType === 'PL' && <PLReport transactions={transactions} clientId={clientId} />}
        {reportType === 'FILING_STATUS' && <FilingStatusReport filings={filings} clientId={clientId} />}

        {['BALANCE','CASH_FLOW','TAX_SUMMARY'].includes(reportType) && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <BarChart2 size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-500">{REPORT_TYPES.find(r=>r.key===reportType)?.label}</p>
            <p className="text-sm text-gray-400 mt-1">Connect backend data source to generate this report</p>
          </div>
        )}
      </div>
    </div>
  );
}
