import React, { useState } from 'react';
import { Mail, Star, Trash2, Send, Archive, RefreshCw, MoreHorizontal, Search, Paperclip, CornerUpLeft, CornerUpRight, Reply, Forward } from 'lucide-react';
import { Card, Button, Input, IconButton, Badge, Modal, Label } from './ui';

interface Email {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  tag?: string;
  tagColor?: string;
}

const initialEmails: Email[] = [
  {
    id: '1',
    sender: 'Neo UI Team',
    email: 'team@neoui.com',
    subject: 'Welcome to the future of design',
    preview: 'Hey John, thanks for downloading the Stack template...',
    body: 'Hey John,\n\nThanks for downloading the Stack template. We really hope you like the brutalist aesthetic we put together.\n\nRemember to check the documentation for customization options.\n\nCheers,\nNeo UI Team',
    date: '10:42 AM',
    read: false,
    starred: true,
    tag: 'Important',
    tagColor: 'bg-neo-red'
  },
  {
    id: '2',
    sender: 'GitHub',
    email: 'noreply@github.com',
    subject: '[GitHub] A new personal access token was added',
    preview: 'A new personal access token (classic) was added to...',
    body: 'A new personal access token was added to your account.\n\nIf this was you, you can ignore this email. If not, please revoke the token immediately.',
    date: 'Yesterday',
    read: true,
    starred: false,
    tag: 'Dev',
    tagColor: 'bg-neo-blue'
  },
  {
    id: '3',
    sender: 'Dribbble',
    email: 'shots@dribbble.com',
    subject: 'Daily inspiration for you',
    preview: 'Check out these popular shots from yesterday...',
    body: 'Here is your daily dose of design inspiration. Check out the top shots from yesterday.',
    date: 'Oct 24',
    read: true,
    starred: false,
    tag: 'Social',
    tagColor: 'bg-neo-yellow'
  },
  {
    id: '4',
    sender: 'Server Monitor',
    email: 'alert@stack.dev',
    subject: 'CPU Usage Alert: Server 01',
    preview: 'CPU usage has exceeded 90% for 5 minutes...',
    body: 'Alert: High CPU usage detected on Server 01.\n\nValue: 92%\nTime: 08:30 UTC\n\nPlease investigate.',
    date: 'Oct 23',
    read: true,
    starred: false,
    tag: 'Alert',
    tagColor: 'bg-neo-red'
  }
];

export const EmailPage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'starred' | 'sent' | 'trash'>('inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const selectedEmail = emails.find(e => e.id === selectedEmailId);

  // Filter logic could be expanded
  const displayEmails = emails.filter(e => {
    if (activeFolder === 'starred') return e.starred;
    return true; // Simple mock, shows all for inbox/sent/trash for now
  });

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails(emails.map(email => email.id === id ? { ...email, starred: !email.starred } : email));
  };

  const deleteEmail = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails(emails.filter(email => email.id !== id));
    if (selectedEmailId === id) setSelectedEmailId(null);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Toolbar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-neo-black border-dashed flex-shrink-0">
         <div className="flex items-center gap-4">
             <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Inbox</h1>
             <Button icon={RefreshCw} variant="ghost" className="hidden sm:flex">Sync</Button>
         </div>
         <div className="flex gap-2">
            <div className="relative hidden md:block w-64">
               <Search className="absolute left-3 top-2.5 text-neo-black" size={16} strokeWidth={2.5} />
               <input className="w-full bg-white border-2 border-neo-black pl-10 pr-4 py-2 font-mono text-sm outline-none focus:shadow-neo" placeholder="SEARCH MAILS..." />
            </div>
            <Button icon={Mail} onClick={() => setIsComposeOpen(true)}>Compose</Button>
         </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left Sidebar (Folders) */}
        <div className="w-16 lg:w-48 flex-shrink-0 flex flex-col gap-2">
           {[
             { id: 'inbox', label: 'Inbox', icon: Mail, count: 4 },
             { id: 'starred', label: 'Starred', icon: Star, count: 1 },
             { id: 'sent', label: 'Sent', icon: Send, count: 0 },
             { id: 'trash', label: 'Trash', icon: Trash2, count: 12 },
           ].map(folder => (
             <button
               key={folder.id}
               onClick={() => setActiveFolder(folder.id as any)}
               className={`flex items-center gap-3 p-3 border-2 border-transparent hover:border-neo-black transition-all group ${activeFolder === folder.id ? 'bg-neo-black text-white border-neo-black shadow-neo' : 'hover:bg-white hover:shadow-neo'}`}
             >
                <folder.icon size={20} strokeWidth={2.5} />
                <span className="font-bold uppercase hidden lg:block flex-1 text-left">{folder.label}</span>
                {folder.count > 0 && <span className={`text-xs font-mono font-bold px-1.5 py-0.5 border-2 border-current hidden lg:block ${activeFolder === folder.id ? 'bg-white text-neo-black' : 'bg-neo-black text-white'}`}>{folder.count}</span>}
             </button>
           ))}
        </div>

        {/* Email List */}
        <Card className={`flex-1 flex flex-col p-0 overflow-hidden ${selectedEmailId ? 'hidden md:flex md:w-1/3 md:flex-none' : 'w-full'}`}>
           <div className="flex-1 overflow-y-auto">
              {displayEmails.map(email => (
                <div 
                  key={email.id}
                  onClick={() => setSelectedEmailId(email.id)}
                  className={`p-4 border-b-2 border-neo-black cursor-pointer hover:bg-neo-yellow/20 transition-colors group ${selectedEmailId === email.id ? 'bg-neo-yellow/30' : ''} ${!email.read ? 'bg-white' : 'bg-gray-50'}`}
                >
                   <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {!email.read && <div className="w-2 h-2 bg-neo-red rounded-full border border-neo-black"></div>}
                        <span className={`text-sm truncate max-w-[120px] ${!email.read ? 'font-black' : 'font-bold text-gray-700'}`}>{email.sender}</span>
                      </div>
                      <span className="text-xs font-mono text-gray-500 flex-shrink-0">{email.date}</span>
                   </div>
                   <h4 className={`text-sm mb-1 truncate ${!email.read ? 'font-bold' : ''}`}>{email.subject}</h4>
                   <p className="text-xs text-gray-500 truncate font-mono mb-2">{email.preview}</p>
                   <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {email.tag && (
                          <span className={`text-[10px] font-bold uppercase px-1 border border-neo-black ${email.tagColor}`}>{email.tag}</span>
                        )}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={(e) => toggleStar(e, email.id)} className={`hover:scale-110 transition-transform ${email.starred ? 'text-neo-yellow fill-neo-yellow' : 'text-gray-400'}`}>
                            <Star size={16} />
                         </button>
                         <button onClick={(e) => deleteEmail(e, email.id)} className="text-gray-400 hover:text-neo-red hover:scale-110 transition-transform">
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </Card>

        {/* Reading Pane */}
        {selectedEmail ? (
          <Card className="flex-[2] flex flex-col p-0 overflow-hidden relative bg-white">
             {/* Read Header */}
             <div className="p-6 border-b-2 border-neo-black bg-neo-bg">
                <div className="flex justify-between items-start mb-4">
                   <h2 className="text-2xl font-black uppercase leading-tight">{selectedEmail.subject}</h2>
                   <div className="flex gap-2">
                      <IconButton icon={Archive} />
                      <IconButton icon={Trash2} onClick={(e: any) => deleteEmail(e, selectedEmail.id)} />
                      <Button variant="ghost" className="md:hidden" onClick={() => setSelectedEmailId(null)}>Close</Button>
                   </div>
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-neo-black bg-neo-black text-white flex items-center justify-center font-bold text-lg">
                         {selectedEmail.sender.charAt(0)}
                      </div>
                      <div>
                         <div className="font-bold text-sm">{selectedEmail.sender}</div>
                         <div className="text-xs font-mono text-gray-500">&lt;{selectedEmail.email}&gt;</div>
                      </div>
                   </div>
                   <div className="text-xs font-mono text-gray-500">{selectedEmail.date}</div>
                </div>
             </div>
             
             {/* Read Body */}
             <div className="flex-1 p-8 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEmail.body}
             </div>

             {/* Read Footer / Actions */}
             <div className="p-4 border-t-2 border-neo-black bg-gray-50 flex gap-4">
                <Button variant="secondary" icon={Reply}>Reply</Button>
                <Button variant="ghost" icon={Forward}>Forward</Button>
             </div>
          </Card>
        ) : (
          <Card className="flex-[2] hidden md:flex items-center justify-center bg-gray-50 border-dashed">
             <div className="text-center opacity-50">
                <Mail size={48} className="mx-auto mb-4" strokeWidth={1.5} />
                <p className="font-bold uppercase text-lg">Select an email to read</p>
             </div>
          </Card>
        )}

      </div>

      {/* Compose Modal */}
      <Modal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} title="New Message">
         <form className="space-y-4">
            <div className="space-y-1">
               <Label>To</Label>
               <Input placeholder="recipient@example.com" />
            </div>
            <div className="space-y-1">
               <Label>Subject</Label>
               <Input placeholder="What's this about?" />
            </div>
            <div className="space-y-1">
               <Label>Message</Label>
               <textarea className="w-full h-48 p-4 bg-white border-2 border-neo-black resize-none outline-none focus:shadow-neo font-mono text-sm" placeholder="Write your message..."></textarea>
            </div>
            <div className="flex justify-between items-center pt-4">
               <button type="button" className="p-2 hover:bg-gray-100 rounded">
                  <Paperclip size={20} />
               </button>
               <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setIsComposeOpen(false)}>Discard</Button>
                  <Button icon={Send}>Send Message</Button>
               </div>
            </div>
         </form>
      </Modal>

    </div>
  );
};