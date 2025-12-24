import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Activity } from 'lucide-react';
import { Card, Badge, Button } from './ui';
import { Metric, ChartDataPoint, ActivityItem } from '../types';
import * as LucideIcons from 'lucide-react';

// --- Stat Card (Molecule) ---

interface StatCardProps {
  metric: Metric;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ metric, index }) => {
  const Icon = (LucideIcons as any)[metric.icon] || LucideIcons.Activity;
  const isPositive = metric.trend === 'up';
  
  // Pop-art color rotation
  const bgColors = ['bg-neo-yellow', 'bg-neo-blue', 'bg-neo-pink', 'bg-neo-green'];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <Card className={`${bgColor} p-0 relative overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all`}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon size={100} strokeWidth={3} />
      </div>
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-neo-black text-white border-2 border-neo-black">
            <Icon size={24} strokeWidth={3} />
          </div>
          <div className={`flex items-center gap-1 font-bold border-2 border-neo-black px-2 py-1 bg-white text-xs`}>
            {isPositive ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
            {Math.abs(metric.change)}%
          </div>
        </div>
        <div>
          <h3 className="text-neo-black font-bold uppercase tracking-wider text-xs mb-1 border-b-2 border-neo-black inline-block">{metric.label}</h3>
          <p className="text-3xl font-mono font-bold text-neo-black mt-2">{metric.value}</p>
        </div>
      </div>
    </Card>
  );
};

// --- Chart Widget (Organism) ---

interface RevenueChartProps {
  data: ChartDataPoint[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Card className="p-6 col-span-1 lg:col-span-2 min-h-[350px] flex flex-col">
      <div className="flex justify-between items-center mb-6 border-b-2 border-neo-black pb-4">
        <div>
          <h3 className="text-xl font-bold uppercase">Revenue Overview</h3>
          <p className="text-xs font-mono text-gray-600">Monthly Stats</p>
        </div>
        <Button variant="ghost" size="sm" icon={MoreHorizontal}>Options</Button>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="name" 
              stroke="#000" 
              fontSize={12} 
              tickLine={false} 
              axisLine={{ strokeWidth: 2 }} 
              dy={10}
              fontFamily="Space Mono"
            />
            <YAxis 
              stroke="#000" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value/1000}k`} 
              fontFamily="Space Mono"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFF', 
                border: '2px solid #000', 
                boxShadow: '4px 4px 0px 0px #000',
                borderRadius: '0px'
              }}
              itemStyle={{ color: '#000', fontFamily: 'Space Mono', fontWeight: 'bold' }}
            />
            <Area 
              type="step" 
              dataKey="value" 
              stroke="#000" 
              strokeWidth={3} 
              fill="#FF6B6B" 
              fillOpacity={0.8} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface UserActivityChartProps {
  data: ChartDataPoint[];
}

export const UserActivityChart: React.FC<UserActivityChartProps> = ({ data }) => {
  return (
    <Card className="p-6 col-span-1 min-h-[350px] flex flex-col">
      <div className="flex justify-between items-center mb-6 border-b-2 border-neo-black pb-4">
        <h3 className="text-xl font-bold uppercase">Active Users</h3>
        <Badge variant="neutral">Weekly</Badge>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000" vertical={false} opacity={0.2} />
            <XAxis dataKey="name" stroke="#000" fontSize={12} tickLine={false} axisLine={{ strokeWidth: 2 }} dy={10} fontFamily="Space Mono" />
            <Tooltip 
              cursor={{fill: '#000', opacity: 0.1}}
              contentStyle={{ 
                backgroundColor: '#FFF', 
                border: '2px solid #000', 
                boxShadow: '4px 4px 0px 0px #000',
              }}
            />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 2 === 0 ? '#4ECDC4' : '#FFE66D'} 
                  stroke="#000"
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// --- Activity Table (Organism) ---

interface ActivityTableProps {
  activities: ActivityItem[];
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
  return (
    <Card className="col-span-1 lg:col-span-3 overflow-hidden">
      <div className="p-6 border-b-2 border-neo-black flex justify-between items-center bg-neo-white">
        <h3 className="text-xl font-bold uppercase">Recent Transactions</h3>
        <Button variant="secondary" size="sm">View All</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neo-black text-white uppercase font-bold text-xs font-mono">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-neo-black">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-neo-yellow transition-colors font-mono">
                <td className="px-6 py-4 font-bold text-neo-black">{item.user}</td>
                <td className="px-6 py-4">{item.action} <span className="opacity-60 text-xs uppercase">on {item.target}</span></td>
                <td className="px-6 py-4">
                  <Badge variant={item.status === 'success' ? 'success' : item.status === 'pending' ? 'warning' : 'danger'}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right opacity-70">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
