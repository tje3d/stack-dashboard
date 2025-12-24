import React from 'react';
import { Check, Download, CreditCard, ShieldCheck } from 'lucide-react';
import { Card, Button, Badge } from './ui';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    features: ['1 User', '5 Projects', 'Basic Analytics', 'Community Support'],
    cta: 'Current Plan',
    active: true,
    color: 'bg-white'
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    features: ['5 Users', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domain'],
    cta: 'Upgrade to Pro',
    active: false,
    color: 'bg-neo-blue'
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/mo',
    features: ['Unlimited Users', 'SSO Security', 'Dedicated Account Manager', 'SLA 99.9%', 'Custom Reporting'],
    cta: 'Contact Sales',
    active: false,
    color: 'bg-white'
  }
];

const invoices = [
  { id: 'INV-2024-001', date: 'Oct 01, 2023', amount: '$29.00', status: 'Paid' },
  { id: 'INV-2024-002', date: 'Sep 01, 2023', amount: '$29.00', status: 'Paid' },
  { id: 'INV-2024-003', date: 'Aug 01, 2023', amount: '$29.00', status: 'Paid' },
];

export const BillingPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
         <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Simple Pricing</h1>
         <p className="text-lg font-mono text-gray-600 max-w-2xl mx-auto">
            Choose the stack that fits your workflow. Cancel anytime. No hidden fees.
         </p>
         
         <div className="inline-flex items-center gap-2 p-1 bg-white border-2 border-neo-black mt-4">
             <button className="px-4 py-2 bg-neo-black text-white font-bold uppercase text-sm">Monthly</button>
             <button className="px-4 py-2 hover:bg-gray-100 font-bold uppercase text-sm">Yearly (-20%)</button>
         </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {plans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col border-2 border-neo-black ${plan.color} ${plan.active ? 'shadow-neo-lg' : 'shadow-neo hover:shadow-neo-lg hover:-translate-y-1'} transition-all p-8`}>
               {plan.name === 'Pro' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neo-yellow border-2 border-neo-black px-4 py-1 text-xs font-black uppercase tracking-wider">
                     Most Popular
                  </div>
               )}
               
               <div className="mb-6">
                  <h3 className="text-xl font-bold uppercase mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                     <span className="text-4xl font-black font-mono">{plan.price}</span>
                     <span className="text-sm font-bold text-gray-500 ml-1">{plan.period}</span>
                  </div>
               </div>

               <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature) => (
                     <div key={feature} className="flex items-start gap-3">
                        <div className="p-0.5 bg-neo-black text-white rounded-full mt-0.5">
                           <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-bold">{feature}</span>
                     </div>
                  ))}
               </div>

               <Button 
                  variant={plan.name === 'Pro' ? 'primary' : 'secondary'} 
                  className="w-full"
                  disabled={plan.active}
               >
                  {plan.cta}
               </Button>
            </div>
         ))}
      </div>

      {/* Payment Method & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1">
            <Card className="p-6 bg-neo-bg h-full">
               <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={24} />
                  <h3 className="font-bold uppercase text-lg">Payment Method</h3>
               </div>
               <div className="bg-white border-2 border-neo-black p-4 mb-4 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-8">
                     <span className="font-black italic text-xl">VISA</span>
                     <ShieldCheck size={20} className="text-gray-400" />
                  </div>
                  <div className="font-mono text-lg tracking-widest mb-2">•••• •••• •••• 4242</div>
                  <div className="flex justify-between text-xs font-bold uppercase">
                     <span>John Doe</span>
                     <span>EXP 12/25</span>
                  </div>
               </div>
               <Button variant="secondary" size="sm" className="w-full">Update Card</Button>
            </Card>
         </div>

         <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
               <div className="p-6 border-b-2 border-neo-black bg-neo-white flex justify-between items-center">
                  <h3 className="font-bold uppercase text-lg">Billing History</h3>
                  <Button variant="ghost" size="sm" icon={Download}>Download All</Button>
               </div>
               <table className="w-full text-left text-sm">
                  <thead className="bg-neo-black text-white uppercase font-bold text-xs font-mono">
                     <tr>
                        <th className="px-6 py-4">Invoice ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-neo-black">
                     {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-neo-yellow/20 font-mono">
                           <td className="px-6 py-4 font-bold">{inv.id}</td>
                           <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                           <td className="px-6 py-4 font-bold">{inv.amount}</td>
                           <td className="px-6 py-4">
                              <Badge variant="success">{inv.status}</Badge>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-neo-blue hover:underline font-bold uppercase text-xs">PDF</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>
         </div>
      </div>

    </div>
  );
};