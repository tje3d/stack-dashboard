import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, Check, CheckCheck, Circle } from 'lucide-react';
import { Card, Button, Input, IconButton } from './ui';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: string;
  name: string;
  avatarColor: string;
  status: 'online' | 'offline' | 'busy';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const currentUser = 'me';

const initialContacts: Contact[] = [
  { id: '1', name: 'Sarah Connor', avatarColor: 'bg-neo-pink', status: 'online', lastMessage: 'The project files are ready.', lastMessageTime: '10:42 AM', unreadCount: 2 },
  { id: '2', name: 'Kyle Reese', avatarColor: 'bg-neo-blue', status: 'busy', lastMessage: 'Did you see the latest stats?', lastMessageTime: 'Yesterday', unreadCount: 0 },
  { id: '3', name: 'Dr. Silberman', avatarColor: 'bg-neo-yellow', status: 'offline', lastMessage: 'We need to reschedule.', lastMessageTime: 'Mon', unreadCount: 0 },
  { id: '4', name: 'Miles Dyson', avatarColor: 'bg-neo-green', status: 'online', lastMessage: 'Neural net processor updated.', lastMessageTime: 'Sun', unreadCount: 1 },
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', senderId: '1', text: 'Hey, are you free to chat?', timestamp: '10:30 AM', status: 'read' },
    { id: 'm2', senderId: 'me', text: 'Sure, just finishing up a deploy.', timestamp: '10:32 AM', status: 'read' },
    { id: 'm3', senderId: '1', text: 'Great! I uploaded the assets.', timestamp: '10:40 AM', status: 'read' },
    { id: 'm4', senderId: '1', text: 'The project files are ready.', timestamp: '10:42 AM', status: 'delivered' },
  ]
};

export const ChatPage: React.FC = () => {
  const [activeContactId, setActiveContactId] = useState<string>(initialContacts[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = initialContacts.find(c => c.id === activeContactId);
  const currentMessages = messages[activeContactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, activeContactId]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sidebar List */}
      <Card className="w-full md:w-80 flex flex-col p-0 flex-shrink-0 h-full overflow-hidden">
        <div className="p-4 border-b-2 border-neo-black bg-neo-yellow">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Messages</h2>
          <div className="relative">
             <Search className="absolute left-3 top-2.5 text-neo-black" size={16} strokeWidth={2.5} />
             <input 
               className="w-full bg-white border-2 border-neo-black pl-10 pr-4 py-2 text-sm font-mono outline-none focus:shadow-neo"
               placeholder="SEARCH CONTACTS..."
             />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
           {initialContacts.map(contact => (
             <div 
               key={contact.id}
               onClick={() => setActiveContactId(contact.id)}
               className={`p-4 border-b-2 border-neo-black cursor-pointer transition-all hover:bg-gray-50 flex gap-3 items-center group ${activeContactId === contact.id ? 'bg-neo-blue/10 border-l-[6px] border-l-neo-blue' : 'border-l-0'}`}
             >
                <div className="relative">
                   <div className={`w-12 h-12 border-2 border-neo-black ${contact.avatarColor} flex items-center justify-center font-bold text-lg`}>
                      {contact.name.charAt(0)}
                   </div>
                   <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-neo-black rounded-full ${contact.status === 'online' ? 'bg-neo-green' : contact.status === 'busy' ? 'bg-neo-red' : 'bg-gray-400'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold uppercase text-sm truncate">{contact.name}</h4>
                      <span className="text-xs font-mono text-gray-500">{contact.lastMessageTime}</span>
                   </div>
                   <p className="text-sm text-gray-600 truncate font-mono">{contact.lastMessage}</p>
                </div>
             </div>
           ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col p-0 h-full overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b-2 border-neo-black flex justify-between items-center bg-white">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 border-2 border-neo-black ${activeContact?.avatarColor} flex items-center justify-center font-bold`}>
                 {activeContact?.name.charAt(0)}
              </div>
              <div>
                 <h3 className="font-black uppercase text-lg leading-none">{activeContact?.name}</h3>
                 <span className="text-xs font-mono flex items-center gap-1 text-gray-500">
                    <Circle size={8} fill={activeContact?.status === 'online' ? '#95E1D3' : '#ccc'} className={activeContact?.status === 'online' ? 'text-neo-green' : 'text-gray-400'} />
                    {activeContact?.status.toUpperCase()}
                 </span>
              </div>
           </div>
           <div className="flex gap-2">
              <IconButton icon={Phone} />
              <IconButton icon={Video} />
              <IconButton icon={MoreVertical} />
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neo-bg">
           {currentMessages.map((msg, idx) => {
             const isMe = msg.senderId === 'me';
             return (
               <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                     <div className={`p-4 border-2 border-neo-black shadow-neo relative text-sm leading-relaxed ${isMe ? 'bg-neo-blue text-neo-black' : 'bg-white text-neo-black'}`}>
                        {msg.text}
                     </div>
                     <div className="flex items-center gap-1 mt-1 text-xs font-mono text-gray-500">
                        {msg.timestamp}
                        {isMe && (
                           <span className="ml-1">
                              {msg.status === 'read' ? <CheckCheck size={14} className="text-neo-blue" /> : <Check size={14} />}
                           </span>
                        )}
                     </div>
                  </div>
               </div>
             );
           })}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-neo-black">
           <form onSubmit={handleSendMessage} className="flex gap-4">
              <button type="button" className="p-2 hover:bg-gray-100 rounded border-2 border-transparent hover:border-neo-black transition-all">
                 <Paperclip size={20} />
              </button>
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="TYPE A MESSAGE..."
                className="flex-1 bg-gray-50 border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo transition-all"
              />
              <Button type="submit" icon={Send} disabled={!inputText.trim()}>Send</Button>
           </form>
        </div>

      </Card>
    </div>
  );
};