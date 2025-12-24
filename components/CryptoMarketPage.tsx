import React from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Star, ArrowRight, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { Card, Button, Input, Badge } from './ui';

interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: string;
  change24h: number;
  marketCap: string;
  volume: string;
  trend: 'up' | 'down';
  color: string;
}

const coins: Coin[] = [
  { id: '1', rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$64,231.45', change24h: 2.4, marketCap: '$1.2T', volume: '$34B', trend: 'up', color: 'bg-neo-yellow' },
  { id: '2', rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$3,452.12', change24h: -1.2, marketCap: '$450B', volume: '$15B', trend: 'down', color: 'bg-neo-blue' },
  { id: '3', rank: 3, name: 'Solana', symbol: 'SOL', price: '$145.67', change24h: 5.7, marketCap: '$65B', volume: '$4B', trend: 'up', color: 'bg-neo-purple' },
  { id: '4', rank: 4, name: 'Ripple', symbol: 'XRP', price: '$0.62', change24h: 0.5, marketCap: '$34B', volume: '$1.2B', trend: 'up', color: 'bg-neo-black text-white' },
  { id: '5', rank: 5, name: 'Cardano', symbol: 'ADA', price: '$0.45', change24h: -3.4, marketCap: '$16B', volume: '$800M', trend: 'down', color: 'bg-neo-blue' },
  { id: '6', rank: 6, name: 'Dogecoin', symbol: 'DOGE', price: '$0.16', change24h: 12.1, marketCap: '$23B', volume: '$2B', trend: 'up', color: 'bg-neo-yellow' },
  { id: '7', rank: 7, name: 'Polkadot', symbol: 'DOT', price: '$7.21', change24h: -0.8, marketCap: '$10B', volume: '$300M', trend: 'down', color: 'bg-neo-pink' },
];

export const CryptoMarketPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Market</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-yellow inline-block px-1">LIVE CRYPTO PRICES & TRENDS</p>
        </div>
        <div className="flex gap-4 text-xs font-mono font-bold">
           <div className="flex flex-col">
              <span className="text-gray-500 uppercase">Global Cap</span>
              <span className="text-lg">$2.45T <span className="text-neo-green">▲ 1.2%</span></span>
           </div>
           <div className="flex flex-col">
              <span className="text-gray-500 uppercase">24h Vol</span>
              <span className="text-lg">$84.2B</span>
           </div>
        </div>
      </div>

      {/* Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 bg-neo-black text-white">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neo-yellow text-neo-black flex items-center justify-center font-bold">₿</div>
                  <span className="font-bold uppercase">Bitcoin</span>
               </div>
               <Badge variant="success">+2.4%</Badge>
            </div>
            <div className="text-3xl font-black font-mono mb-2">$64,231.45</div>
            <div className="h-12 w-full flex items-end gap-1">
               {[40, 60, 45, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-neo-green/50 hover:bg-neo-green transition-colors"></div>
               ))}
            </div>
         </Card>
         <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neo-blue text-neo-black flex items-center justify-center font-bold">Ξ</div>
                  <span className="font-bold uppercase">Ethereum</span>
               </div>
               <Badge variant="danger">-1.2%</Badge>
            </div>
            <div className="text-3xl font-black font-mono mb-2">$3,452.12</div>
            <div className="h-12 w-full flex items-end gap-1">
               {[70, 65, 60, 55, 60, 50, 45, 40, 35, 30].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-neo-red/50 hover:bg-neo-red transition-colors"></div>
               ))}
            </div>
         </Card>
         <Card className="p-6 bg-neo-purple text-white">
             <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neo-black text-white flex items-center justify-center font-bold">◎</div>
                  <span className="font-bold uppercase">Solana</span>
               </div>
               <Badge variant="success">+5.7%</Badge>
            </div>
            <div className="text-3xl font-black font-mono mb-2">$145.67</div>
            <div className="h-12 w-full flex items-end gap-1">
               {[20, 30, 40, 35, 50, 60, 55, 70, 80, 90].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/50 hover:bg-white transition-colors"></div>
               ))}
            </div>
         </Card>
      </div>

      {/* Main Table */}
      <Card className="p-0 overflow-hidden">
         <div className="p-4 border-b-2 border-neo-black flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-2.5 text-neo-black" size={20} strokeWidth={2.5} />
               <input 
                  type="text" 
                  placeholder="SEARCH COINS..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border-2 border-neo-black focus:shadow-neo outline-none font-mono text-sm"
               />
            </div>
            <div className="flex gap-2">
               <Button variant="secondary" size="sm" icon={Filter}>Filter</Button>
               <Button variant="secondary" size="sm" icon={Star}>Watchlist</Button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-neo-black text-white uppercase font-bold text-xs font-mono">
                  <tr>
                     <th className="px-6 py-4">Asset</th>
                     <th className="px-6 py-4 text-right">Price</th>
                     <th className="px-6 py-4 text-right">24h Change</th>
                     <th className="px-6 py-4 text-right">Market Cap</th>
                     <th className="px-6 py-4 text-right">Volume (24h)</th>
                     <th className="px-6 py-4 text-center">Trend</th>
                     <th className="px-6 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y-2 divide-neo-black">
                  {coins.map((coin) => (
                     <tr key={coin.id} className="hover:bg-neo-bg transition-colors font-mono font-bold group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <span className="text-gray-400 text-xs w-4">{coin.rank}</span>
                              <div className={`w-8 h-8 ${coin.color} border-2 border-neo-black rounded-full flex items-center justify-center text-[10px] font-black shadow-sm`}>
                                 {coin.symbol[0]}
                              </div>
                              <div className="flex flex-col">
                                 <span className="uppercase text-neo-black text-sm">{coin.name}</span>
                                 <span className="text-gray-500 text-xs">{coin.symbol}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">{coin.price}</td>
                        <td className={`px-6 py-4 text-right ${coin.change24h >= 0 ? 'text-neo-green' : 'text-neo-red'}`}>
                           {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                        </td>
                        <td className="px-6 py-4 text-right">{coin.marketCap}</td>
                        <td className="px-6 py-4 text-right">{coin.volume}</td>
                        <td className="px-6 py-4 text-center">
                           {coin.trend === 'up' 
                              ? <TrendingUp className="inline text-neo-green" size={18} /> 
                              : <TrendingDown className="inline text-neo-red" size={18} />
                           }
                        </td>
                        <td className="px-6 py-4 text-right">
                           <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">Trade</Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};