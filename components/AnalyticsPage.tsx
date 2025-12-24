import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Globe, Smartphone, Monitor, Tablet, MousePointer, Clock, Users, Activity } from 'lucide-react';
import { Card, Button, Badge } from './ui';

// --- Mock Data ---

const trafficData = [
  { name: 'Mon', sessions: 4000, pageviews: 2400 },
  { name: 'Tue', sessions: 3000, pageviews: 1398 },
  { name: 'Wed', sessions: 2000, pageviews: 9800 },
  { name: 'Thu', sessions: 2780, pageviews: 3908 },
  { name: 'Fri', sessions: 1890, pageviews: 4800 },
  { name: 'Sat', sessions: 2390, pageviews: 3800 },
  { name: 'Sun', sessions: 3490, pageviews: 4300 },
];

const deviceData = [
  { name: 'Desktop', value: 65, color: '#4ECDC4' }, // neo-blue
  { name: 'Mobile', value: 25, color: '#FFE66D' },  // neo-yellow
  { name: 'Tablet', value: 10, color: '#FF6B6B' },  // neo-red
];

const sourceData = [
  { source: 'Direct', visitors: '12,402', percent: 45 },
  { source: 'Social Media', visitors: '8,392', percent: 32 },
  { source: 'Organic Search', visitors: '4,203', percent: 15 },
  { source: 'Referrals', visitors: '1,203', percent: 8 },
];

const locationsData = [
  { country: 'United States', value: 45 },
  { country: 'United Kingdom', value: 20 },
  { country: 'Germany', value: 15 },
  { country: 'Japan', value: 10 },
  { country: 'Brazil', value: 10 },
];

// --- Components ---

const KPICard: React.FC<{ label: string; value: string; change: string; trend: 'up' | 'down'; icon: any; color: string }> = ({ label, value, change, trend, icon: Icon, color }) => (
  <Card className={`p-6 relative overflow-hidden group hover:-translate-y-1 hover:shadow-neo-lg transition-all ${color}`}>
    <div className="flex justify-between items-start z-10 relative">
      <div>
        <h3 className="text-neo-black font-bold uppercase tracking-wider text-xs mb-1 border-b-2 border-neo-black inline-block">{label}</h3>
        <p className="text-3xl font-mono font-bold text-neo-black mt-2">{value}</p>
      </div>
      <div className="p-2 bg-neo-black text-white border-2 border-white shadow-neo-sm">
        <Icon size={20} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 font-bold text-xs bg-white/50 w-fit px-2 py-1 border-2 border-neo-black">
      {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {change} vs last week
    </div>
    <Icon className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 pointer-events-none" strokeWidth={1} />
  </Card>
);

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Analytics</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-green inline-block px-1">TRAFFIC & PERFORMANCE DATA</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Last 7 Days</Button>
          <Button>Download Report</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Total Sessions" value="72.5k" change="+12%" trend="up" icon={Activity} color="bg-white" />
        <KPICard label="Avg. Duration" value="4m 32s" change="+8.1%" trend="up" icon={Clock} color="bg-neo-blue" />
        <KPICard label="Bounce Rate" value="42.3%" change="-2.1%" trend="up" icon={MousePointer} color="bg-neo-yellow" />
        <KPICard label="New Users" value="12,403" change="+18%" trend="up" icon={Users} color="bg-neo-pink" />
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2 p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b-2 border-neo-black pb-4">
            <h3 className="text-xl font-bold uppercase">Traffic Overview</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-bold uppercase"><div className="w-3 h-3 bg-neo-purple border border-neo-black"></div> Pageviews</span>
              <span className="flex items-center gap-1 text-xs font-bold uppercase"><div className="w-3 h-3 bg-neo-green border border-neo-black"></div> Sessions</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" stroke="#000" fontSize={12} tickLine={false} axisLine={{ strokeWidth: 2 }} dy={10} fontFamily="Space Mono" />
                <YAxis stroke="#000" fontSize={12} tickLine={false} axisLine={false} fontFamily="Space Mono" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF', border: '2px solid #000', boxShadow: '4px 4px 0px 0px #000', borderRadius: '0px' }}
                  itemStyle={{ fontFamily: 'Space Mono', fontWeight: 'bold', color: '#000' }}
                />
                <Area type="monotone" dataKey="pageviews" stackId="1" stroke="#000" strokeWidth={2} fill="#A06CD5" fillOpacity={1} />
                <Area type="monotone" dataKey="sessions" stackId="1" stroke="#000" strokeWidth={2} fill="#95E1D3" fillOpacity={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Device Breakdown */}
        <Card className="col-span-1 p-6 flex flex-col">
          <div className="mb-6 border-b-2 border-neo-black pb-4">
            <h3 className="text-xl font-bold uppercase">Device Usage</h3>
          </div>
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="250">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={2}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#FFF', border: '2px solid #000', boxShadow: '4px 4px 0px 0px #000', borderRadius: '0px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="flex justify-center gap-4 mt-4">
               {deviceData.map(d => (
                 <div key={d.name} className="flex flex-col items-center">
                    <div className="p-2 border-2 border-neo-black mb-1 shadow-neo-sm" style={{ backgroundColor: d.color }}>
                       {d.name === 'Desktop' ? <Monitor size={16} /> : d.name === 'Mobile' ? <Smartphone size={16} /> : <Tablet size={16} />}
                    </div>
                    <span className="text-xs font-bold uppercase">{d.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Traffic Sources */}
        <Card className="p-6">
          <div className="mb-6 border-b-2 border-neo-black pb-4 flex justify-between items-center">
             <h3 className="text-xl font-bold uppercase">Traffic Sources</h3>
             <Globe size={20} strokeWidth={2.5} />
          </div>
          <div className="space-y-6">
             {sourceData.map((item, idx) => (
               <div key={idx} className="group">
                  <div className="flex justify-between text-sm font-bold uppercase mb-2">
                     <span>{item.source}</span>
                     <span className="font-mono">{item.visitors}</span>
                  </div>
                  <div className="w-full h-4 border-2 border-neo-black bg-gray-100 relative">
                     <div 
                      className="absolute top-0 left-0 h-full bg-neo-black group-hover:bg-neo-blue transition-colors duration-300" 
                      style={{ width: `${item.percent}%` }}
                     />
                  </div>
               </div>
             ))}
          </div>
        </Card>

        {/* Top Locations */}
        <Card className="p-6 bg-neo-bg">
          <div className="mb-6 border-b-2 border-neo-black pb-4 flex justify-between items-center">
             <h3 className="text-xl font-bold uppercase">Top Locations</h3>
             <Button variant="ghost" size="sm">View Map</Button>
          </div>
          <div className="space-y-4">
             {locationsData.map((item, idx) => (
               <div key={idx} className="flex items-center gap-4 p-3 bg-white border-2 border-neo-black shadow-neo-sm hover:translate-x-1 transition-transform">
                  <div className="font-mono font-bold text-lg w-8 text-center">{idx + 1}</div>
                  <div className="flex-1 font-bold uppercase">{item.country}</div>
                  <Badge variant="neutral">{item.value}%</Badge>
               </div>
             ))}
          </div>
        </Card>

      </div>
    </div>
  );
};
