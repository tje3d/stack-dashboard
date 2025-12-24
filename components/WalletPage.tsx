import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, Send, QrCode, Copy, History, Plus, MoreHorizontal, RefreshCw } from 'lucide-react';
import { Card, Button, Badge, IconButton } from './ui';

const assets = [
   { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '0.4521', value: '$29,038.54', change: '+2.4%', color: 'bg-neo-yellow' },
   { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '4.1200', value: '$14,222.73', change: '-1.2%', color: 'bg-neo-blue' },
   { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: '5,432.00', value: '$5,432.00', change: '0.0%', color: 'bg-neo-green' },
   { id: 'sol', name: 'Solana', symbol: 'SOL', balance: '145.50', value: '$21,194.98', change: '+5.7%', color: 'bg-neo-purple' },
];

const transactions = [
   { id: '1', type: 'Received', asset: 'BTC', amount: '+0.0450', value: '$2,890.00', date: 'Oct 24, 10:30 AM', status: 'Completed' },
   { id: '2', type: 'Sent', asset: 'ETH', amount: '-1.2000', value: '$4,140.00', date: 'Oct 23, 02:15 PM', status: 'Completed' },
   { id: '3', type: 'Trade', asset: 'USDT', amount: '-500.00', value: '$500.00', date: 'Oct 22, 09:45 AM', status: 'Completed' },
   { id: '4', type: 'Received', asset: 'SOL', amount: '+25.00', value: '$3,640.00', date: 'Oct 20, 11:20 AM', status: 'Pending' },
];

export const WalletPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header / Total Balance */}
      <div className="flex flex-col md:flex-row gap-6">
         <Card className="flex-1 p-8 bg-neo-black text-white relative overflow-hidden">
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-neo-blue rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
             
             <div className="relative z-10">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Total Balance</h2>
                {/* Fixed visibility by using neo-yellow text */}
                <div className="text-5xl md:text-6xl font-black font-mono tracking-tighter mb-6 text-neo-yellow drop-shadow-md">$69,888.25</div>
                
                <div className="flex gap-4">
                   <Button className="bg-neo-green text-neo-black hover:bg-green-400 border-white" icon={ArrowDownLeft}>Deposit</Button>
                   <Button className="bg-neo-yellow text-neo-black hover:bg-yellow-400 border-white" icon={ArrowUpRight}>Withdraw</Button>
                </div>
             </div>
         </Card>
         
         <Card className="w-full md:w-80 p-6 flex flex-col justify-center gap-4 bg-neo-white">
            <h3 className="font-bold uppercase flex items-center gap-2">
               <QrCode size={20} /> Quick Receive
            </h3>
            <div className="bg-white border-2 border-neo-black p-4 flex justify-center">
                {/* Mock QR Code Visual */}
                <div className="w-32 h-32 bg-neo-black pattern-grid-lg opacity-80"></div> 
            </div>
            <div className="flex gap-2">
               <input readOnly value="0x71C...92F" className="flex-1 bg-white border-2 border-neo-black px-3 py-1 font-mono text-sm" />
               <IconButton icon={Copy} className="p-1" />
            </div>
         </Card>
      </div>

      {/* Asset Grid */}
      <div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-black uppercase">Your Assets</h3>
            <Button variant="ghost" icon={Plus}>Add Asset</Button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((asset) => (
               <Card key={asset.id} className="p-6 hover:-translate-y-2 hover:shadow-neo-lg transition-all group">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-12 h-12 ${asset.color} border-2 border-neo-black flex items-center justify-center font-bold text-lg shadow-neo-sm`}>
                        {asset.symbol[0]}
                     </div>
                     <IconButton icon={MoreHorizontal} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                     <h4 className="font-bold uppercase text-lg">{asset.name}</h4>
                     <p className="font-mono text-2xl font-bold mt-1">{asset.balance} <span className="text-xs text-gray-500">{asset.symbol}</span></p>
                     <p className="text-sm font-mono text-gray-500 mt-1">≈ {asset.value}</p>
                  </div>
               </Card>
            ))}
         </div>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="p-6 border-b-2 border-neo-black bg-neo-bg flex justify-between items-center">
               <h3 className="font-bold uppercase text-lg flex items-center gap-2">
                  <History size={20} /> Recent Activity
               </h3>
               <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="divide-y-2 divide-neo-black">
               {transactions.map((tx) => (
                  <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className={`p-2 border-2 border-neo-black ${tx.type === 'Received' ? 'bg-neo-green' : tx.type === 'Sent' ? 'bg-neo-yellow' : 'bg-neo-blue'}`}>
                           {tx.type === 'Received' ? <ArrowDownLeft size={20} /> : tx.type === 'Sent' ? <ArrowUpRight size={20} /> : <RefreshCw size={20} />}
                        </div>
                        <div>
                           <div className="font-bold uppercase">{tx.type} {tx.asset}</div>
                           <div className="text-xs font-mono text-gray-500">{tx.date}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className={`font-mono font-bold ${tx.type === 'Received' ? 'text-neo-green' : 'text-neo-black'}`}>{tx.amount} {tx.asset}</div>
                        <Badge variant={tx.status === 'Completed' ? 'neutral' : 'warning'}>{tx.status}</Badge>
                     </div>
                  </div>
               ))}
            </div>
         </Card>

         {/* Promo / Card */}
         <Card className="p-6 bg-neo-yellow flex flex-col justify-between relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white rounded-full border-2 border-neo-black opacity-50"></div>
             <div>
                <h3 className="text-2xl font-black uppercase mb-2">Stack Card</h3>
                <p className="font-mono text-sm mb-6">Spend your crypto anywhere with zero fees. Get 5% cashback on all purchases.</p>
             </div>
             <div className="bg-neo-black text-white p-6 rounded-xl border-2 border-white shadow-neo relative">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-8 h-8 rounded-full bg-neo-red"></div>
                   <Wallet size={24} />
                </div>
                <div className="font-mono text-lg tracking-widest mb-2">**** **** **** 8829</div>
                <div className="text-xs uppercase font-bold opacity-80">John Doe</div>
             </div>
             <Button className="mt-6 w-full bg-white text-neo-black border-neo-black hover:bg-neo-black hover:text-white">Order Card</Button>
         </Card>
      </div>

    </div>
  );
};