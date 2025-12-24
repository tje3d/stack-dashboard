import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Filter, Download, Trash2, Mail, Phone, MapPin, Edit2, CheckCircle, XCircle, User } from 'lucide-react';
import { Card, Button, Input, Badge, IconButton, Modal, Label } from './ui';

interface Customer {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'flagged';
  spent: string;
  lastActive: string;
  avatarColor: string;
}

const initialCustomers: Customer[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Admin', status: 'active', spent: '$4,500', lastActive: '2 mins ago', avatarColor: 'bg-neo-blue' },
  { id: '2', name: 'Maria Garcia', email: 'm.garcia@design.co', role: 'Editor', status: 'active', spent: '$1,200', lastActive: '1 hour ago', avatarColor: 'bg-neo-pink' },
  { id: '3', name: 'James Wilson', email: 'j.wilson@corp.org', role: 'Viewer', status: 'inactive', spent: '$0', lastActive: '5 days ago', avatarColor: 'bg-neo-yellow' },
  { id: '4', name: 'Linda Chen', email: 'linda.c@tech.net', role: 'Admin', status: 'flagged', spent: '$8,900', lastActive: '1 day ago', avatarColor: 'bg-neo-red' },
  { id: '5', name: 'Robert Fox', email: 'r.fox@example.com', role: 'Viewer', status: 'active', spent: '$250', lastActive: '3 hours ago', avatarColor: 'bg-neo-green' },
  { id: '6', name: 'Sarah Miller', email: 'sarah.m@studio.io', role: 'Editor', status: 'active', spent: '$3,400', lastActive: '1 week ago', avatarColor: 'bg-neo-purple' },
];

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', role: 'Viewer' });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customer: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCustomer.name,
      email: newCustomer.email,
      role: newCustomer.role,
      status: 'active',
      spent: '$0',
      lastActive: 'Just now',
      avatarColor: 'bg-neo-blue'
    };
    setCustomers([customer, ...customers]);
    setIsModalOpen(false);
    setNewCustomer({ name: '', email: '', role: 'Viewer' });
  };

  const handleDelete = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Customers</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-blue inline-block px-1">USER MANAGEMENT DATABASE</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Download}>Export CSV</Button>
          <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Add Customer</Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-neo-black" size={20} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="SEARCH USERS..." 
            className="w-full pl-10 pr-4 py-2 bg-white border-2 border-neo-black focus:shadow-neo outline-none font-mono text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <Button variant="secondary" size="sm" icon={Filter} className="flex-1 md:flex-none">Filter</Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neo-black text-white uppercase font-bold text-xs font-mono">
              <tr>
                <th className="px-6 py-4">User Profile</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neo-black">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neo-bg transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${customer.avatarColor} border-2 border-neo-black flex items-center justify-center font-bold text-neo-black shadow-[2px_2px_0px_0px_#181818]`}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-neo-black uppercase text-sm">{customer.name}</div>
                        <div className="text-xs font-mono text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={customer.status === 'active' ? 'success' : customer.status === 'flagged' ? 'danger' : 'neutral'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{customer.role}</td>
                  <td className="px-6 py-4 font-bold font-mono">{customer.spent}</td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{customer.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 border-2 border-neo-black bg-white hover:bg-neo-yellow transition-colors shadow-neo-sm">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="p-2 border-2 border-neo-black bg-white hover:bg-neo-red hover:text-white transition-colors shadow-neo-sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t-2 border-neo-black bg-gray-50 flex justify-between items-center">
            <span className="text-sm font-mono font-bold">Showing {filteredCustomers.length} results</span>
            <div className="flex gap-2">
                <Button variant="secondary" size="sm" disabled>Prev</Button>
                <Button variant="secondary" size="sm">Next</Button>
            </div>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer} className="space-y-4">
          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input 
              placeholder="e.g. John Doe" 
              value={newCustomer.name} 
              onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-1">
            <Label>Email Address</Label>
            <Input 
              type="email" 
              placeholder="user@example.com" 
              value={newCustomer.email} 
              onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} 
              required 
            />
          </div>
          <div className="space-y-1">
            <Label>Role</Label>
            <select 
              className="w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo"
              value={newCustomer.role}
              onChange={e => setNewCustomer({...newCustomer, role: e.target.value})}
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
