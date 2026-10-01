import React from 'react';
import { MOCK_APPLICATIONS } from '../data/schemes';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid, AreaChart, Area
} from 'recharts';
import {
  Users, IndianRupee, Mic, Globe, CheckCircle2, Zap, MapPin
} from 'lucide-react';
import type { Language } from '../types';

interface JuryDashboardProps {
  currentLang: Language;
  onBack: () => void;
}

const STAT_CARDS = [
  { icon: Users, label: 'Total Beneficiaries Reached', value: '2,84,731', sub: '+1,247 this week', color: 'rose', trend: '+18%' },
  { icon: IndianRupee, label: 'Govt. Benefits Disbursed', value: '₹142.3 Cr', sub: 'Via Voice-First AI onboarding', color: 'emerald', trend: '+24%' },
  { icon: Mic, label: 'Voice Queries Processed', value: '9,41,028', sub: 'In 6 Regional Languages', color: 'blue', trend: '+31%' },
  { icon: Globe, label: 'Languages Supported', value: '6 Live', sub: 'Hindi, Tamil, Telugu, Kannada, Bengali, English', color: 'amber', trend: 'Multilingual' },
  { icon: CheckCircle2, label: 'Applications Approved', value: '1,93,480', sub: '68% approval rate', color: 'teal', trend: '+12%' },
  { icon: Zap, label: 'Avg. Time to Seva Patra', value: '4.2 min', sub: 'From voice query to receipt', color: 'purple', trend: '94% faster' },
];

const SCHEME_ADOPTION_DATA = [
  { name: 'PM Vishwakarma', beneficiaries: 84200, disbursed: 1263, color: '#f43f5e' },
  { name: 'Matru Vandana', beneficiaries: 72100, disbursed: 432.6, color: '#f59e0b' },
  { name: 'Lakhpati Didi', beneficiaries: 54300, disbursed: 271.5, color: '#10b981' },
  { name: 'Ujjwala Gas', beneficiaries: 48900, disbursed: 156.5, color: '#3b82f6' },
  { name: 'Dairy Subsidy', beneficiaries: 25231, disbursed: 151.4, color: '#14b8a6' },
];

const LANGUAGE_PIE = [
  { name: 'हिन्दी (Hindi)', value: 31, color: '#f43f5e' },
  { name: 'தமிழ் (Tamil)', value: 24, color: '#f59e0b' },
  { name: 'తెలుగు (Telugu)', value: 19, color: '#10b981' },
  { name: 'ಕನ್ನಡ (Kannada)', value: 13, color: '#3b82f6' },
  { name: 'বাংলা (Bengali)', value: 9, color: '#8b5cf6' },
  { name: 'English', value: 4, color: '#64748b' },
];

const WEEKLY_TREND = [
  { week: 'Wk 1', queries: 8200, approvals: 4100 },
  { week: 'Wk 2', queries: 12400, approvals: 7200 },
  { week: 'Wk 3', queries: 18900, approvals: 11300 },
  { week: 'Wk 4', queries: 27800, approvals: 17400 },
  { week: 'Wk 5', queries: 38100, approvals: 25800 },
  { week: 'Wk 6', queries: 49200, approvals: 34600 },
  { week: 'Wk 7', queries: 61400, approvals: 44100 },
  { week: 'Wk 8', queries: 78300, approvals: 57200 },
];

const STATE_DATA = [
  { state: 'Tamil Nadu', users: 58400, color: '#f43f5e' },
  { state: 'Uttar Pradesh', users: 49200, color: '#f59e0b' },
  { state: 'Telangana', users: 38100, color: '#10b981' },
  { state: 'West Bengal', users: 31200, color: '#3b82f6' },
  { state: 'Karnataka', users: 28100, color: '#8b5cf6' },
  { state: 'Rajasthan', users: 22400, color: '#14b8a6' },
  { state: 'Bihar', users: 18300, color: '#f97316' },
  { state: 'Odisha', users: 14900, color: '#06b6d4' },
];

const COLOR_MAP: Record<string, string> = {
  rose: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
  teal: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900',
  purple: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900',
};

export const JuryDashboard: React.FC<JuryDashboardProps> = ({ currentLang: _currentLang, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg">
                <span className="text-xl">🌸</span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Sakhi AI — Civic Impact Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Real-time Voice-First Government Service Adoption Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-sm font-bold border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Data
            </span>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition-colors shadow-sm"
            >
              ← Sister Portal
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {STAT_CARDS.map(({ icon: Icon, label, value, sub, color, trend }) => (
            <div key={label} className={`rounded-2xl border p-5 ${COLOR_MAP[color]} bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${COLOR_MAP[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${COLOR_MAP[color]}`}>{trend}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Weekly Growth Area Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Voice Query & Approval Growth</h3>
            <p className="text-xs text-slate-400 mb-5">Weekly trend of AI-assisted voice queries vs. successful approvals</p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={WEEKLY_TREND}>
                <defs>
                  <linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', color: '#1e293b', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="queries" stroke="#f43f5e" fill="url(#colorQ)" strokeWidth={2.5} name="Voice Queries" />
                <Area type="monotone" dataKey="approvals" stroke="#10b981" fill="url(#colorA)" strokeWidth={2.5} name="Approvals" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Language Pie Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Language Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Voice queries by regional language</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={LANGUAGE_PIE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {LANGUAGE_PIE.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
              {LANGUAGE_PIE.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{d.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-100">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Scheme Bar Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Scheme-wise Beneficiary Count</h3>
            <p className="text-xs text-slate-400 mb-5">Total women beneficiaries per government scheme</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SCHEME_ADOPTION_DATA} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="beneficiaries" radius={[0, 6, 6, 0]} name="Beneficiaries">
                  {SCHEME_ADOPTION_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* State-wise Bar Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">State-wise Voice Adoption</h3>
            <p className="text-xs text-slate-400 mb-5">Number of rural women using Sakhi AI by state</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={STATE_DATA} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 11, fill: '#94a3b8' }} width={100} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="users" radius={[0, 6, 6, 0]} name="Users">
                  {STATE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Seva Patras Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Recent Applications (Seva Patras)</h3>
              <p className="text-xs text-slate-400">Real-time voice-assisted government scheme applications</p>
            </div>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Feed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-700">
                  {['Application ID', 'Scheme', 'State', 'Benefit', 'CSC Centre', 'Status', 'Time'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_APPLICATIONS.map((app, i) => (
                  <tr key={app.applicationId} className={`border-b border-slate-50 dark:border-slate-800 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40 dark:bg-slate-800/20'}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-rose-600 dark:text-rose-400">{app.applicationId}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100 max-w-[180px] truncate">{app.schemeName}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {app.district}, {app.state}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-extrabold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">{app.benefitAmount}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 max-w-[160px] truncate">{app.cscCenter}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                        app.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' :
                        app.status === 'Verified' ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' :
                        'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{app.date.split(',')[1]?.trim() || app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SDG Footer */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white text-center">
          <p className="text-sm font-bold text-white/80">Sakhi AI aligns with UN Sustainable Development Goals</p>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {['🎯 SDG 1 — No Poverty', '⚖️ SDG 5 — Gender Equality', '🌱 SDG 8 — Decent Work & Growth', '🤝 SDG 10 — Reduced Inequality', '🏛️ SDG 16 — Justice for All'].map(s => (
              <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold">{s}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
