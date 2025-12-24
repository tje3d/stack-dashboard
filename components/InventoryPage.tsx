import React from 'react';
import { Package, Search, Filter, Plus, AlertTriangle, MoreVertical } from 'lucide-react';
import { Card, Button, Input, Badge } from './ui';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category: string;
  imageColor: string;
}

const products: Product[] = [
  { id: '1', name: 'Neo-Brutalist Chair', sku: 'FUR-001', price: '$249.00', stock: 45, status: 'In Stock', category: 'Furniture', imageColor: 'bg-neo-yellow' },
  { id: '2', name: 'Minimal Desk Lamp', sku: 'LGT-023', price: '$89.00', stock: 12, status: 'Low Stock', category: 'Lighting', imageColor: 'bg-neo-blue' },
  { id: '3', name: 'Abstract Wall Art', sku: 'ART-882', price: '$120.00', stock: 0, status: 'Out of Stock', category: 'Decor', imageColor: 'bg-neo-red' },
  { id: '4', name: 'Geometric Rug', sku: 'RUG-104', price: '$350.00', stock: 28, status: 'In Stock', category: 'Flooring', imageColor: 'bg-neo-green' },
  { id: '5', name: 'Ceramic Vase Set', sku: 'DEC-005', price: '$65.00', stock: 8, status: 'Low Stock', category: 'Decor', imageColor: 'bg-neo-purple' },
  { id: '6', name: 'Steel Coffee Table', sku: 'FUR-009', price: '$499.00', stock: 15, status: 'In Stock', category: 'Furniture', imageColor: 'bg-neo-pink' },
];

export const InventoryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Inventory</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-yellow inline-block px-1">PRODUCT MANAGEMENT SYSTEM</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Filter}>Filters</Button>
          <Button icon={Plus}>Add Product</Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-neo-black" size={20} strokeWidth={2.5} />
            <Input className="pl-10" placeholder="SEARCH SKU, NAME..." />
         </div>
         <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="px-4 py-2 border-2 border-neo-black bg-neo-black text-white font-bold uppercase text-xs whitespace-nowrap cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">All Items (124)</div>
            <div className="px-4 py-2 border-2 border-neo-black bg-white hover:bg-neo-yellow font-bold uppercase text-xs whitespace-nowrap cursor-pointer transition-colors">Low Stock (4)</div>
            <div className="px-4 py-2 border-2 border-neo-black bg-white hover:bg-neo-red font-bold uppercase text-xs whitespace-nowrap cursor-pointer transition-colors">Out of Stock (1)</div>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {products.map((product) => (
            <Card key={product.id} className="group hover:-translate-y-2 hover:shadow-neo-lg transition-all duration-300">
               <div className={`h-48 ${product.imageColor} border-b-2 border-neo-black relative flex items-center justify-center overflow-hidden`}>
                  <Package size={64} className="text-neo-black opacity-20 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                  <div className="absolute top-4 right-4">
                     <button className="p-1 bg-white border-2 border-neo-black hover:bg-neo-black hover:text-white transition-colors">
                        <MoreVertical size={16} />
                     </button>
                  </div>
                  {product.stock <= 10 && product.stock > 0 && (
                     <div className="absolute bottom-4 left-4 bg-neo-yellow border-2 border-neo-black px-2 py-1 flex items-center gap-1 text-xs font-bold">
                        <AlertTriangle size={12} /> LOW STOCK
                     </div>
                  )}
                  {product.stock === 0 && (
                     <div className="absolute bottom-4 left-4 bg-neo-red text-white border-2 border-neo-black px-2 py-1 flex items-center gap-1 text-xs font-bold">
                        <AlertTriangle size={12} /> SOLD OUT
                     </div>
                  )}
               </div>
               <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                     <p className="text-xs font-mono text-gray-500">{product.sku}</p>
                     <p className="font-bold font-mono text-lg">{product.price}</p>
                  </div>
                  <h3 className="font-black uppercase text-xl mb-4 truncate">{product.name}</h3>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs font-bold uppercase">
                        <span>Availability</span>
                        <span>{product.stock} Units</span>
                     </div>
                     <div className="w-full h-3 border-2 border-neo-black bg-gray-100 rounded-full overflow-hidden">
                        <div 
                           className={`h-full ${product.stock < 10 ? 'bg-neo-red' : 'bg-neo-green'}`} 
                           style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                        />
                     </div>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 flex justify-between items-center">
                     <span className="text-xs font-bold uppercase bg-gray-200 px-2 py-1">{product.category}</span>
                     <button className="text-xs font-bold uppercase hover:underline decoration-2 underline-offset-2">Edit Details</button>
                  </div>
               </div>
            </Card>
         ))}
         
         {/* Add New Placeholder */}
         <button className="h-full min-h-[400px] border-4 border-dashed border-gray-300 hover:border-neo-black hover:bg-gray-50 flex flex-col items-center justify-center gap-4 group transition-colors">
            <div className="p-4 bg-white border-2 border-gray-300 group-hover:border-neo-black rounded-full transition-colors">
               <Plus size={32} className="text-gray-400 group-hover:text-neo-black" />
            </div>
            <span className="font-bold uppercase text-gray-400 group-hover:text-neo-black">Add New Product</span>
         </button>
      </div>
    </div>
  );
};