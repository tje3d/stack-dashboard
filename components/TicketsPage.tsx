import React, { useState } from 'react';
import { 
  LifeBuoy, Search, Filter, Plus, MessageSquare, 
  CheckCircle, AlertCircle, Clock, MoreVertical, 
  Send, User, ArrowLeft, Paperclip 
} from 'lucide-react';
import { Card, Button, Input, Badge, Modal, Label } from './ui';

// --- Types ---

type Priority = 'low' | 'medium' | 'high' | 'critical';
type Status = 'open' | 'pending' | 'resolved' | 'closed';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  name: string;
  text: string;
  timestamp: string;
  internal?: boolean;
}

interface Ticket {
  id: string;
  subject: string;
  requester: string;
  email: string;
  priority: Priority;
  status: Status;
  category: string;
  lastUpdated: string;
  messages: Message[];
}

// --- Mock Data ---

const initialTickets: Ticket[] = [
  {
    id: 'TICK-2491',
    subject: 'Cannot access API endpoint via CORS',
    requester: 'Sarah Connor',
    email: 'sarah@skynet.com',
    priority: 'high',
    status: 'open',
    category: 'Technical',
    lastUpdated: '10 mins ago',
    messages: [
      { id: 'm1', sender: 'user', name: 'Sarah Connor', text: 'I am getting a 403 error when trying to fetch data from the analytics endpoint. Is this a CORS issue?', timestamp: '10 mins ago' }
    ]
  },
  {
    id: 'TICK-2490',
    subject: 'Billing invoice discrepancy',
    requester: 'Walter White',
    email: 'walt@chemistry.edu',
    priority: 'medium',
    status: 'pending',
    category: 'Billing',
    lastUpdated: '2 hours ago',
    messages: [
      { id: 'm1', sender: 'user', name: 'Walter White', text: 'My invoice shows $500 but my plan is $29. Please explain.', timestamp: '3 hours ago' },
      { id: 'm2', sender: 'agent', name: 'Support Team', text: 'Hi Walter, looking into this now. It might be overage charges.', timestamp: '2 hours ago' }
    ]
  },
  {
    id: 'TICK-2488',
    subject: 'Feature Request: Dark Mode export',
    requester: 'Bruce Wayne',
    email: 'bruce@wayne.ent',
    priority: 'low',
    status: 'resolved',
    category: 'Feature Request',
    lastUpdated: '1 day ago',
    messages: [
      { id: 'm1', sender: 'user', name: 'Bruce Wayne', text: 'Can we get PDF exports in dark mode? My eyes hurt.', timestamp: '1 day ago' },
      { id: 'm2', sender: 'agent', name: 'Support Team', text: 'Done. Check your settings panel.', timestamp: '1 day ago' }
    ]
  }
];

export const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  // New Ticket Form State
  const [newTicketForm, setNewTicketForm] = useState({ subject: '', category: 'Technical', priority: 'medium' as Priority, description: '' });

  // Derived State
  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  // --- Actions ---

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TICK-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: newTicketForm.subject,
      category: newTicketForm.category,
      priority: newTicketForm.priority,
      requester: 'Current User', // Simulated
      email: 'user@example.com',
      status: 'open',
      lastUpdated: 'Just now',
      messages: [
        { id: `m-${Date.now()}`, sender: 'user', name: 'Current User', text: newTicketForm.description, timestamp: 'Just now' }
      ]
    };
    setTickets([newTicket, ...tickets]);
    setIsNewTicketModalOpen(false);
    setNewTicketForm({ subject: '', category: 'Technical', priority: 'medium', description: '' });
  };

  const handleSendMessage = () => {
    if (!replyText.trim() || !selectedTicketId) return;
    
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      sender: 'agent',
      name: 'You',
      text: replyText,
      timestamp: 'Just now'
    };

    setTickets(tickets.map(t => {
      if (t.id === selectedTicketId) {
        return { ...t, messages: [...t.messages, newMessage], lastUpdated: 'Just now' };
      }
      return t;
    }));
    setReplyText('');
  };

  const handleStatusChange = (status: Status) => {
    if (!selectedTicketId) return;
    setTickets(tickets.map(t => t.id === selectedTicketId ? { ...t, status } : t));
  };

  // --- Helpers ---

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'critical': return 'bg-neo-red text-white';
      case 'high': return 'bg-neo-yellow';
      case 'medium': return 'bg-neo-blue';
      case 'low': return 'bg-gray-200';
    }
  };

  const getStatusBadge = (s: Status) => {
    switch (s) {
      case 'open': return <Badge variant="danger">Open</Badge>;
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'resolved': return <Badge variant="success">Resolved</Badge>;
      case 'closed': return <Badge variant="neutral">Closed</Badge>;
    }
  };

  // --- Views ---

  if (selectedTicket) {
    // === TICKET DETAIL VIEW ===
    return (
      <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        
        {/* Detail Header */}
        <div className="flex items-center gap-4 border-b-2 border-neo-black pb-4 mb-4 flex-shrink-0">
          <Button variant="ghost" onClick={() => setSelectedTicketId(null)} className="px-2">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-gray-500">{selectedTicket.id}</span>
                {getStatusBadge(selectedTicket.status)}
             </div>
             <h2 className="text-2xl font-black uppercase truncate">{selectedTicket.subject}</h2>
          </div>
          <div className="flex gap-2">
             {selectedTicket.status !== 'resolved' && (
                <Button variant="secondary" icon={CheckCircle} onClick={() => handleStatusChange('resolved')}>Resolve</Button>
             )}
             <Button variant="ghost" icon={MoreVertical} className="px-2" />
          </div>
        </div>

        <div className="flex-1 flex gap-6 overflow-hidden">
           
           {/* Chat Area */}
           <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-neo-bg">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {selectedTicket.messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.sender === 'agent' ? 'flex-row-reverse' : ''}`}>
                       <div className={`w-10 h-10 flex-shrink-0 border-2 border-neo-black flex items-center justify-center font-bold ${msg.sender === 'agent' ? 'bg-neo-black text-white' : 'bg-white'}`}>
                          {msg.sender === 'agent' ? 'You' : msg.name.charAt(0)}
                       </div>
                       <div className={`max-w-[80%] space-y-1 ${msg.sender === 'agent' ? 'items-end' : ''}`}>
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-500">
                             <span>{msg.name}</span>
                             <span>•</span>
                             <span>{msg.timestamp}</span>
                          </div>
                          <div className={`p-4 border-2 border-neo-black shadow-neo text-sm leading-relaxed ${msg.sender === 'agent' ? 'bg-neo-yellow' : 'bg-white'}`}>
                             {msg.text}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              {/* Reply Box */}
              <div className="p-4 bg-white border-t-2 border-neo-black">
                 <div className="relative">
                    <textarea 
                      className="w-full h-32 p-4 bg-gray-50 border-2 border-neo-black resize-none outline-none focus:shadow-neo transition-all font-mono text-sm"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                       <button className="p-2 hover:bg-gray-200 transition-colors">
                          <Paperclip size={20} />
                       </button>
                       <Button icon={Send} size="sm" onClick={handleSendMessage} disabled={!replyText.trim()}>Send Reply</Button>
                    </div>
                 </div>
              </div>
           </Card>

           {/* Sidebar Info */}
           <Card className="w-80 p-6 flex-shrink-0 h-fit space-y-6 hidden lg:block bg-white">
              <div>
                 <Label className="text-gray-500">Requester</Label>
                 <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 border-2 border-neo-black bg-neo-pink flex items-center justify-center font-bold">
                       {selectedTicket.requester.charAt(0)}
                    </div>
                    <div>
                       <div className="font-bold uppercase text-sm">{selectedTicket.requester}</div>
                       <div className="text-xs font-mono text-gray-500">{selectedTicket.email}</div>
                    </div>
                 </div>
              </div>

              <div>
                 <Label className="text-gray-500">Attributes</Label>
                 <div className="space-y-3 mt-2">
                    <div className="flex justify-between items-center text-sm border-b-2 border-gray-100 pb-2">
                       <span className="font-bold">Priority</span>
                       <span className={`px-2 py-0.5 border-2 border-neo-black text-xs font-bold uppercase ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                       </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b-2 border-gray-100 pb-2">
                       <span className="font-bold">Category</span>
                       <span>{selectedTicket.category}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b-2 border-gray-100 pb-2">
                       <span className="font-bold">Created</span>
                       <span className="font-mono">Oct 24, 2023</span>
                    </div>
                 </div>
              </div>

              <div>
                 <Label className="text-gray-500">Actions</Label>
                 <div className="flex flex-col gap-2 mt-2">
                     {['open', 'pending', 'closed'].map((status) => (
                        selectedTicket.status !== status && (
                          <button 
                            key={status}
                            onClick={() => handleStatusChange(status as Status)}
                            className="text-left px-3 py-2 border-2 border-transparent hover:border-neo-black hover:bg-gray-50 text-xs font-bold uppercase transition-all"
                          >
                             Mark as {status}
                          </button>
                        )
                     ))}
                 </div>
              </div>
           </Card>
        </div>
      </div>
    );
  }

  // === TICKET LIST VIEW ===
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Support Desk</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-red text-white inline-block px-1">TICKET MANAGEMENT SYSTEM</p>
        </div>
        <Button icon={Plus} onClick={() => setIsNewTicketModalOpen(true)}>Create Ticket</Button>
      </div>

      {/* Toolbar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-neo-black" size={20} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="SEARCH TICKETS..." 
            className="w-full pl-10 pr-4 py-2 bg-white border-2 border-neo-black focus:shadow-neo outline-none font-mono text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
           {['All', 'Open', 'Pending', 'Resolved', 'Closed'].map((filter, i) => (
              <button 
                key={filter}
                className={`px-4 py-2 border-2 border-neo-black font-bold uppercase text-xs whitespace-nowrap transition-all ${i === 0 ? 'bg-neo-black text-white' : 'bg-white hover:bg-neo-yellow'}`}
              >
                {filter}
              </button>
           ))}
        </div>
      </Card>

      {/* Ticket Table */}
      <Card className="p-0 overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neo-black text-white uppercase font-bold text-xs font-mono">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Requester</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neo-black">
              {tickets.map((ticket) => (
                <tr 
                  key={ticket.id} 
                  className="hover:bg-neo-blue/10 cursor-pointer transition-colors group"
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <td className="px-6 py-4 font-mono font-bold">{ticket.id}</td>
                  <td className="px-6 py-4">
                     <div className="font-bold text-neo-black">{ticket.subject}</div>
                     <div className="text-xs font-mono text-gray-500">{ticket.category}</div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <User size={16} />
                        <span className="text-sm font-bold">{ticket.requester}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-block w-3 h-3 border-2 border-neo-black mr-2 ${getPriorityColor(ticket.priority)}`}></span>
                     <span className="text-xs font-bold uppercase">{ticket.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-gray-600 group-hover:text-neo-black">
                    {ticket.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Ticket Modal */}
      <Modal 
        isOpen={isNewTicketModalOpen} 
        onClose={() => setIsNewTicketModalOpen(false)} 
        title="Open New Ticket"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div className="space-y-1">
            <Label>Subject</Label>
            <Input 
              placeholder="Brief summary of the issue" 
              required 
              value={newTicketForm.subject}
              onChange={e => setNewTicketForm({...newTicketForm, subject: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <Label>Category</Label>
                <select 
                  className="w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo"
                  value={newTicketForm.category}
                  onChange={e => setNewTicketForm({...newTicketForm, category: e.target.value})}
                >
                  <option>Technical</option>
                  <option>Billing</option>
                  <option>Feature Request</option>
                  <option>Account Access</option>
                </select>
             </div>
             <div className="space-y-1">
                <Label>Priority</Label>
                <select 
                  className="w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo"
                  value={newTicketForm.priority}
                  onChange={e => setNewTicketForm({...newTicketForm, priority: e.target.value as Priority})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
             </div>
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <textarea 
               className="w-full h-32 p-4 bg-white border-2 border-neo-black resize-none outline-none focus:shadow-neo font-mono text-sm"
               placeholder="Please describe the issue in detail..."
               required
               value={newTicketForm.description}
               onChange={e => setNewTicketForm({...newTicketForm, description: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsNewTicketModalOpen(false)} type="button">Cancel</Button>
            <Button type="submit">Submit Ticket</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
