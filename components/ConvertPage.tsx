import React, { useState } from 'react';
import { ArrowLeftRight, ChevronDown, RefreshCw, Wallet } from 'lucide-react';
import { Card, Button, Input, Label, IconButton } from './ui';

const tokens = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', balance: '0.4521', color: 'bg-neo-yellow' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: '4.1200', color: 'bg-neo-blue' },
  { symbol: 'USDT', name: 'Tether', icon: '₮', balance: '5432.00', color: 'bg-neo-green' },
  { symbol: 'SOL', name: 'Solana', icon: '◎', balance: '145.50', color: 'bg-neo-purple' },
];

export const ConvertPage: React.FC = () => {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[2]);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter mb-2">Convert</h1>
        <p className="font-mono text-sm text-gray-600">Zero fees on your first 5 conversions every month.</p>
      </div>

      <Card className="p-0 overflow-hidden shadow-neo-lg border-4 border-neo-black">
         {/* From Section */}
         <div className="p-8 bg-white relative">
            <div className="flex justify-between items-center mb-4">
               <Label className="text-gray-500 text-sm">From</Label>
               <div className="text-xs font-mono font-bold flex items-center gap-1">
                  <Wallet size={12} />
                  Balance: {fromToken.balance} {fromToken.symbol}
                  <button className="text-neo-blue uppercase ml-2 hover:underline">Max</button>
               </div>
            </div>

            <div className="flex gap-4 items-center">
               <div className="flex-1">
                  <input 
                     className="w-full text-4xl font-black outline-none placeholder-gray-300 font-mono bg-transparent"
                     placeholder="0.00"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                  />
               </div>
               <button className="flex items-center gap-2 bg-neo-bg border-2 border-neo-black px-3 py-2 hover:bg-gray-100 transition-colors rounded-full">
                  <div className={`w-6 h-6 rounded-full ${fromToken.color} border-2 border-neo-black flex items-center justify-center text-[10px] font-bold`}>
                     {fromToken.icon}
                  </div>
                  <span className="font-bold text-lg">{fromToken.symbol}</span>
                  <ChevronDown size={16} />
               </button>
            </div>
            <div className="text-sm font-mono text-gray-400 mt-2">
               ≈ $0.00
            </div>

            {/* Switcher Button */}
            <div className="absolute left-1/2 -bottom-5 -translate-x-1/2 z-10">
               <button 
                  onClick={switchTokens}
                  className="w-10 h-10 bg-neo-yellow border-2 border-neo-black flex items-center justify-center shadow-neo hover:scale-110 transition-transform"
               >
                  <ArrowLeftRight size={20} strokeWidth={2.5} />
               </button>
            </div>
         </div>

         {/* To Section */}
         <div className="p-8 bg-gray-50 border-t-2 border-neo-black">
            <div className="flex justify-between items-center mb-4 mt-2">
               <Label className="text-gray-500 text-sm">To</Label>
               <div className="text-xs font-mono font-bold flex items-center gap-1 opacity-50">
                  <Wallet size={12} />
                  Balance: {toToken.balance} {toToken.symbol}
               </div>
            </div>

            <div className="flex gap-4 items-center">
               <div className="flex-1">
                  <input 
                     className="w-full text-4xl font-black outline-none placeholder-gray-300 font-mono bg-transparent"
                     placeholder="0.00"
                     readOnly
                     value={amount ? (parseFloat(amount) * 63000).toFixed(2) : ''} // Mock conversion
                  />
               </div>
               <button className="flex items-center gap-2 bg-white border-2 border-neo-black px-3 py-2 hover:bg-gray-100 transition-colors rounded-full">
                  <div className={`w-6 h-6 rounded-full ${toToken.color} border-2 border-neo-black flex items-center justify-center text-[10px] font-bold`}>
                     {toToken.icon}
                  </div>
                  <span className="font-bold text-lg">{toToken.symbol}</span>
                  <ChevronDown size={16} />
               </button>
            </div>
         </div>

         {/* Summary & Action */}
         <div className="p-6 bg-neo-black text-white">
            <div className="flex justify-between text-sm font-mono mb-2">
               <span className="text-gray-400">Rate</span>
               <span>1 {fromToken.symbol} ≈ 63,420.50 {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm font-mono mb-6">
               <span className="text-gray-400">Network Fee</span>
               <span className="text-neo-green">$0.00 (Waived)</span>
            </div>

            <Button 
               className="w-full h-14 text-xl bg-neo-green text-neo-black border-white hover:bg-white"
               onClick={handleSwap}
               disabled={isLoading}
            >
               {isLoading ? (
                  <RefreshCw className="animate-spin" />
               ) : (
                  'Preview Conversion'
               )}
            </Button>
         </div>
      </Card>

    </div>
  );
};