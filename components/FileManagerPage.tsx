import React, { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Music, Video, MoreVertical, Search, HardDrive, Upload, Cloud, Clock, Star, Trash2, Home, ChevronRight, Download, Share2 } from 'lucide-react';
import { Card, Button, Input, IconButton } from './ui';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'doc' | 'video' | 'audio';
  size: string;
  modified: string;
  starred?: boolean;
}

const initialFiles: FileItem[] = [
  { id: '1', name: 'Project Assets', type: 'folder', size: '12 items', modified: '2 mins ago', starred: true },
  { id: '2', name: 'Design Specs', type: 'folder', size: '8 items', modified: '1 hour ago' },
  { id: '3', name: 'Marketing', type: 'folder', size: '24 items', modified: 'Yesterday' },
  { id: '4', name: 'proposal_v2.pdf', type: 'doc', size: '2.4 MB', modified: 'Oct 24, 2023', starred: true },
  { id: '5', name: 'hero_banner.png', type: 'image', size: '4.1 MB', modified: 'Oct 23, 2023' },
  { id: '6', name: 'intro_video.mp4', type: 'video', size: '124 MB', modified: 'Oct 20, 2023' },
  { id: '7', name: 'meeting_notes.docx', type: 'doc', size: '14 KB', modified: 'Oct 18, 2023' },
  { id: '8', name: 'podcast_intro.mp3', type: 'audio', size: '8.5 MB', modified: 'Oct 15, 2023' },
];

export const FileManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my_drive' | 'recent' | 'starred' | 'trash'>('my_drive');
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedFileIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedFileIds(newSet);
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'folder': return <Folder size={40} className="text-neo-yellow fill-neo-yellow" strokeWidth={1.5} />;
      case 'image': return <ImageIcon size={40} className="text-neo-purple" strokeWidth={1.5} />;
      case 'video': return <Video size={40} className="text-neo-red" strokeWidth={1.5} />;
      case 'audio': return <Music size={40} className="text-neo-green" strokeWidth={1.5} />;
      default: return <FileText size={40} className="text-neo-blue" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-6">
         <Card className="p-4 bg-neo-black text-white">
             <Button variant="primary" className="w-full mb-4" icon={Upload}>Upload New</Button>
             <div className="space-y-1">
                 {[
                   { id: 'my_drive', label: 'My Drive', icon: HardDrive },
                   { id: 'recent', label: 'Recent', icon: Clock },
                   { id: 'starred', label: 'Starred', icon: Star },
                   { id: 'trash', label: 'Trash', icon: Trash2 },
                 ].map(item => (
                   <button 
                     key={item.id}
                     onClick={() => setActiveTab(item.id as any)}
                     className={`w-full flex items-center gap-3 px-3 py-2 font-bold uppercase text-sm transition-colors border-l-4 ${activeTab === item.id ? 'bg-white/10 border-neo-yellow text-neo-yellow' : 'border-transparent text-gray-400 hover:text-white'}`}
                   >
                      <item.icon size={18} />
                      {item.label}
                   </button>
                 ))}
             </div>
         </Card>

         <Card className="p-6">
            <h3 className="font-black uppercase mb-4 flex items-center gap-2">
               <Cloud size={20} /> Storage
            </h3>
            <div className="mb-2 flex justify-between text-xs font-bold font-mono">
               <span>75 GB used</span>
               <span>100 GB total</span>
            </div>
            <div className="w-full h-4 border-2 border-neo-black bg-gray-100 mb-4 relative">
               <div className="absolute top-0 left-0 h-full bg-neo-green w-3/4 border-r-2 border-neo-black"></div>
            </div>
            <Button variant="secondary" size="sm" className="w-full">Upgrade Plan</Button>
         </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border-2 border-neo-black p-4 shadow-neo">
            <div className="flex items-center gap-2 text-sm font-bold uppercase overflow-hidden">
               {currentPath.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                     {idx > 0 && <ChevronRight size={16} className="text-gray-400" />}
                     <span className={`cursor-pointer hover:text-neo-blue ${idx === currentPath.length - 1 ? 'text-neo-black' : 'text-gray-500'}`}>{crumb}</span>
                  </React.Fragment>
               ))}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 text-neo-black" size={16} strokeWidth={2.5} />
                  <input className="w-full bg-gray-50 border-2 border-neo-black pl-10 pr-4 py-2 font-mono text-sm outline-none focus:shadow-neo" placeholder="SEARCH FILES..." />
               </div>
               <IconButton icon={MoreVertical} />
            </div>
         </div>

         {/* File Grid */}
         <Card className="flex-1 p-6 bg-neo-bg overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {initialFiles.map((file) => (
                 <div 
                   key={file.id}
                   onClick={() => toggleSelection(file.id)}
                   className={`p-4 border-2 flex flex-col items-center text-center gap-3 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-neo group relative bg-white ${selectedFileIds.has(file.id) ? 'border-neo-blue shadow-neo bg-neo-blue/5' : 'border-neo-black'}`}
                 >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <MoreVertical size={16} />
                    </div>
                    <div className="mt-2 group-hover:scale-110 transition-transform duration-300">
                       {getIcon(file.type)}
                    </div>
                    <div className="w-full">
                       <p className="font-bold text-sm truncate w-full mb-1">{file.name}</p>
                       <p className="text-xs font-mono text-gray-500">{file.size}</p>
                    </div>
                    {file.starred && (
                       <div className="absolute top-2 left-2 text-neo-yellow">
                          <Star size={12} fill="#FFE66D" strokeWidth={0} />
                       </div>
                    )}
                 </div>
               ))}
            </div>
         </Card>
      </div>
      
    </div>
  );
};