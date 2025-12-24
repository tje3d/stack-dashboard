import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { ArrowDown, ArrowUp, RefreshCw, History, DollarSign, Wallet, ChevronDown, X } from 'lucide-react';
import { Card, Button, Input, Label, Badge } from './ui';

// Mock chart data
const chartData = [
   { time: '00:00', price: 63500 },
   { time: '04:00', price: 63800 },
   { time: '08:00', price: 64200 },
   { time: '12:00', price: 63900 },
   { time: '16:00', price: 64500 },
   { time: '20:00', price: 64100 },
   { time: '24:00', price: 64231 },
];

const tradingPairs = [
    { symbol: 'BTC / USD', price: '$64,231.45', change: '+2.4%' },
    { symbol: 'ETH / USD', price: '$3,452.12', change: '-1.2%' },
    { symbol: 'SOL / USD', price: '$145.67', change: '+5.7%' },
    { symbol: 'DOGE / USD', price: '$0.16', change: '+12.1%' },
];

const openPositions = [
    { id: 1, symbol: 'BTC/USD', type: 'Long', size: '0.5 BTC', entry: '62,500.00', mark: '64,231.45', pnl: '+$865.72', pnlPerc: '+2.7%', leverage: '10x' },
    { id: 2, symbol: 'ETH/USD', type: 'Short', size: '5.0 ETH', entry: '3,500.00', mark: '3,452.12', pnl: '+$239.40', pnlPerc: '+1.3%', leverage: '5x' },
];

const orderBook = {
   asks: [
      { price: 64250, amount: 0.542, total: 34823 },
      { price: 64245, amount: 1.230, total: 79021 },
      { price: 64240, amount: 0.890, total: 57173 },
      { price: 64235, amount: 0.120, total: 7708 },
   ],
   bids: [
      { price: 64230, amount: 0.450, total: 28903 },
      { price: 64225, amount: 2.100, total: 134872 },
      { price: 64220, amount: 0.750, total: 48165 },
      { price: 64215, amount: 1.500, total: 96322 },
   ]
};

export const TradePage: React.FC = () => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [currentPair, setCurrentPair] = useState(tradingPairs[0]);
  const [isPairDropdownOpen, setIsPairDropdownOpen] = useState(false);
  
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header with Symbol Picker */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed flex-shrink-0">
        <div className="relative">
           <button 
              onClick={() => setIsPairDropdownOpen(!isPairDropdownOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
           >
             <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">{currentPair.symbol}</h1>
             <ChevronDown size={32} strokeWidth={3} className={`transition-transform ${isPairDropdownOpen ? 'rotate-180' : ''}`} />
             <Badge variant={currentPair.change.startsWith('+') ? 'success' : 'danger'} className="text-lg">{currentPair.change}</Badge>
           </button>
           <p className="text-neo-black font-mono text-2xl font-bold mt-1">{currentPair.price}</p>

           {/* Dropdown */}
           {isPairDropdownOpen && (
               <div className="absolute top-full left-0 mt-2 w-72 bg-white border-2 border-neo-black shadow-neo-lg z-50 animate-in slide-in-from-top-2">
                  {tradingPairs.map(pair => (
                      <div 
                        key={pair.symbol} 
                        className="p-4 border-b-2 border-neo-black last:border-0 hover:bg-neo-yellow cursor-pointer flex justify-between items-center group"
                        onClick={() => {
                            setCurrentPair(pair);
                            setIsPairDropdownOpen(false);
                        }}
                      >
                          <span className="font-bold uppercase group-hover:translate-x-1 transition-transform">{pair.symbol}</span>
                          <span className={`font-mono text-sm ${pair.change.startsWith('+') ? 'text-neo-green' : 'text-neo-red'}`}>
                              {pair.change}
                          </span>
                      </div>
                  ))}
               </div>
           )}
        </div>

        <div className="flex gap-4">
           <div className="text-right">
              <span className="block text-xs font-bold text-gray-500 uppercase">24h High</span>
              <span className="font-mono font-bold">$64,890.00</span>
           </div>
           <div className="text-right">
              <span className="block text-xs font-bold text-gray-500 uppercase">24h Low</span>
              <span className="font-mono font-bold">$63,200.00</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
         
         {/* Chart & Order Book Column */}
         <div className="flex-1 flex flex-col gap-6 min-h-0">
            {/* Chart */}
            <Card className="flex-1 min-h-[400px] flex flex-col p-0">
               <div className="p-4 border-b-2 border-neo-black flex justify-between items-center bg-gray-50">
                  <div className="flex gap-2">
                     {['1H', '1D', '1W', '1M', '1Y'].map((t, i) => (
                        <button key={t} className={`px-2 py-1 text-xs font-bold border-2 ${i === 1 ? 'bg-neo-black text-white border-neo-black' : 'bg-white border-transparent hover:border-neo-black'}`}>
                           {t}
                        </button>
                     ))}
                  </div>
               </div>
               <div className="flex-1 w-full min-h-0 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#000" vertical={false} opacity={0.1} />
                        <XAxis dataKey="time" stroke="#000" fontSize={12} tickLine={false} axisLine={{ strokeWidth: 2 }} dy={10} fontFamily="Space Mono" />
                        <YAxis stroke="#000" domain={['auto', 'auto']} fontSize={12} tickLine={false} axisLine={false} fontFamily="Space Mono" />
                        <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '2px solid #000', boxShadow: '4px 4px 0px 0px #000', borderRadius: '0px' }} />
                        <Area type="monotone" dataKey="price" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </Card>

            {/* Order Book */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-72">
               <Card className="p-0 flex flex-col overflow-hidden">
                  <div className="p-3 bg-neo-black text-white font-bold uppercase text-xs border-b-2 border-neo-black">Order Book</div>
                  <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
                     <div className="flex justify-between font-bold mb-2 text-gray-500 uppercase">
                        <span>Price</span>
                        <span>Amount</span>
                        <span>Total</span>
                     </div>
                     <div className="space-y-1 mb-2">
                        {orderBook.asks.map((ask, i) => (
                           <div key={i} className="flex justify-between text-neo-red relative">
                              <div className="absolute right-0 top-0 bottom-0 bg-neo-red opacity-10" style={{ width: `${Math.random() * 50}%` }}></div>
                              <span className="relative z-10">{ask.price.toLocaleString()}</span>
                              <span className="relative z-10 text-neo-black">{ask.amount.toFixed(3)}</span>
                              <span className="relative z-10 text-neo-black">{ask.total.toLocaleString()}</span>
                           </div>
                        ))}
                     </div>
                     <div className="py-2 border-y border-gray-200 my-2 text-center font-bold text-lg text-neo-black">
                        {currentPair.price.replace('$','')}
                     </div>
                     <div className="space-y-1">
                        {orderBook.bids.map((bid, i) => (
                           <div key={i} className="flex justify-between text-neo-green relative">
                               <div className="absolute right-0 top-0 bottom-0 bg-neo-green opacity-10" style={{ width: `${Math.random() * 50}%` }}></div>
                              <span className="relative z-10">{bid.price.toLocaleString()}</span>
                              <span className="relative z-10 text-neo-black">{bid.amount.toFixed(3)}</span>
                              <span className="relative z-10 text-neo-black">{bid.total.toLocaleString()}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </Card>

               <Card className="p-0 flex flex-col overflow-hidden">
                   <div className="p-3 bg-neo-black text-white font-bold uppercase text-xs border-b-2 border-neo-black">Recent Trades</div>
                   <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
                     {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                           <span className={Math.random() > 0.5 ? 'text-neo-green' : 'text-neo-red'}>
                              {Math.random() > 0.5 ? 'Buy' : 'Sell'}
                           </span>
                           <span className="font-bold">{(64200 + Math.random() * 100).toFixed(2)}</span>
                           <span>{(Math.random() * 0.5).toFixed(4)} BTC</span>
                           <span className="text-gray-400">12:4{i}</span>
                        </div>
                     ))}
                   </div>
               </Card>
            </div>
         </div>

         {/* Order Form Column */}
         <div className="w-full lg:w-80 flex-shrink-0">
            <Card className="h-full p-0 flex flex-col">
               <div className="flex border-b-2 border-neo-black">
                  <button 
                     className={`flex-1 py-4 font-black uppercase text-lg transition-colors ${orderType === 'buy' ? 'bg-neo-green text-neo-black' : 'bg-white hover:bg-gray-50'}`}
                     onClick={() => setOrderType('buy')}
                  >
                     Buy
                  </button>
                  <button 
                     className={`flex-1 py-4 font-black uppercase text-lg transition-colors border-l-2 border-neo-black ${orderType === 'sell' ? 'bg-neo-red text-white' : 'bg-white hover:bg-gray-50'}`}
                     onClick={() => setOrderType('sell')}
                  >
                     Sell
                  </button>
               </div>
               
               <div className="p-6 space-y-6 flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase">
                     <span>Available</span>
                     <span className="font-mono">24,500 USD</span>
                  </div>

                  <div className="space-y-1">
                     <Label>Order Type</Label>
                     <select className="w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo uppercase">
                        <option>Limit</option>
                        <option>Market</option>
                        <option>Stop Limit</option>
                     </select>
                  </div>

                  <div className="space-y-1">
                     <Label>Price (USD)</Label>
                     <Input defaultValue={currentPair.price.replace('$','').replace(',', '')} />
                  </div>

                  <div className="space-y-1">
                     <Label>Amount ({currentPair.symbol.split(' ')[0]})</Label>
                     <Input 
                        placeholder="0.00" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                     />
                  </div>

                  {/* Percentage Slider Visual */}
                  <div className="space-y-2">
                     <div className="flex justify-between">
                        {[25, 50, 75, 100].map(p => (
                           <button key={p} className="px-2 py-1 text-[10px] font-bold border-2 border-neo-black bg-white hover:bg-neo-yellow shadow-neo-sm">
                              {p}%
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="pt-4 border-t-2 border-dashed border-neo-black space-y-2">
                     <div className="flex justify-between text-sm">
                        <span className="font-bold">Fee (0.1%)</span>
                        <span className="font-mono">$12.45</span>
                     </div>
                     <div className="flex justify-between text-lg font-black uppercase">
                        <span>Total</span>
                        <span>$6,423.00</span>
                     </div>
                  </div>
                  
                  <div className="pt-2">
                     <Button 
                        className={`w-full h-12 text-lg ${orderType === 'buy' ? 'bg-neo-green hover:bg-green-400' : 'bg-neo-red hover:bg-red-500 text-white'}`}
                     >
                        {orderType === 'buy' ? `Buy ${currentPair.symbol.split(' ')[0]}` : `Sell ${currentPair.symbol.split(' ')[0]}`}
                     </Button>
                  </div>
               </div>
            </Card>
         </div>

      </div>

      {/* Open Positions Widget */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-neo-black text-white flex justify-between items-center border-b-2 border-neo-black">
            <h3 className="font-bold uppercase text-sm">Open Positions ({openPositions.length})</h3>
            <Button variant="danger" size="sm" className="h-6 text-[10px] py-0">Close All</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
                <thead className="bg-neo-bg text-neo-black uppercase text-xs font-bold border-b-2 border-neo-black">
                    <tr>
                        <th className="px-6 py-3">Symbol</th>
                        <th className="px-6 py-3">Side</th>
                        <th className="px-6 py-3">Size</th>
                        <th className="px-6 py-3 text-right">Entry Price</th>
                        <th className="px-6 py-3 text-right">Mark Price</th>
                        <th className="px-6 py-3 text-right">PNL</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-neo-black/10">
                    {openPositions.map(pos => (
                        <tr key={pos.id} className="hover:bg-gray-50">
                            <td className="px-6 py-3 font-bold">{pos.symbol} <span className="text-xs bg-gray-200 px-1 border border-black ml-1">{pos.leverage}</span></td>
                            <td className={`px-6 py-3 font-bold ${pos.type === 'Long' ? 'text-neo-green' : 'text-neo-red'}`}>{pos.type}</td>
                            <td className="px-6 py-3">{pos.size}</td>
                            <td className="px-6 py-3 text-right">{pos.entry}</td>
                            <td className="px-6 py-3 text-right">{pos.mark}</td>
                            <td className={`px-6 py-3 text-right font-bold ${pos.pnlPerc.startsWith('+') ? 'text-neo-green' : 'text-neo-red'}`}>
                                {pos.pnl} ({pos.pnlPerc})
                            </td>
                            <td className="px-6 py-3 text-right">
                                <button className="text-xs font-bold underline hover:text-neo-red">Close</button>
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