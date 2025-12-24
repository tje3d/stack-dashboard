import React, { useState } from 'react';
import { GitBranch, CheckCircle, Clock, AlertCircle, Plus, Filter, Calendar, MapPin, Flag, Rocket } from 'lucide-react';
import { Card, Button, Badge, Modal, Input, Label } from './ui';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming' | 'delayed';
  type: 'milestone' | 'release' | 'task' | 'alert';
}

const initialEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'v2.0 Beta Release',
    description: 'Public release of the beta version to early access users. Includes new dashboard and analytics engine.',
    date: 'Oct 24, 2023',
    status: 'completed',
    type: 'release'
  },
  {
    id: '2',
    title: 'Database Migration',
    description: 'Migrating legacy SQL database to new distributed cluster. Expected downtime: 2 hours.',
    date: 'Oct 28, 2023',
    status: 'current',
    type: 'task'
  },
  {
    id: '3',
    title: 'Q4 Marketing Campaign',
    description: 'Launch of "Neo-Future" ad campaign across social media platforms.',
    date: 'Nov 01, 2023',
    status: 'upcoming',
    type: 'milestone'
  },
  {
    id: '4',
    title: 'Security Audit',
    description: 'Annual penetration testing and security compliance review.',
    date: 'Nov 15, 2023',
    status: 'delayed',
    type: 'alert'
  },
  {
    id: '5',
    title: 'Mobile App Launch',
    description: 'iOS and Android applications go live on respective stores.',
    date: 'Dec 01, 2023',
    status: 'upcoming',
    type: 'release'
  }
];

export const TimelinePage: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-neo-green';
      case 'current': return 'bg-neo-blue';
      case 'delayed': return 'bg-neo-red text-white';
      default: return 'bg-white text-gray-500';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'release': return <Rocket size={20} />;
      case 'alert': return <AlertCircle size={20} />;
      case 'task': return <CheckCircle size={20} />;
      default: return <Flag size={20} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Roadmap</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-black text-white inline-block px-1">PROJECT TIMELINE & MILESTONES</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Filter}>Filter</Button>
          <Button icon={Plus}>Add Event</Button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-8 md:pl-0 py-8">
        
        {/* Central Line (Desktop) / Left Line (Mobile) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-neo-black -translate-x-1/2"></div>

        <div className="space-y-12">
           {events.map((event, index) => {
             const isLeft = index % 2 === 0;
             return (
               <div key={event.id} className={`relative flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''} group`}>
                  
                  {/* Date Badge (Opposite side) */}
                  <div className={`hidden md:block w-1/2 px-8 py-2 ${isLeft ? 'text-right' : 'text-left'}`}>
                     <span className="font-mono font-bold text-sm bg-neo-yellow px-2 py-1 border-2 border-neo-black shadow-neo-sm">
                        {event.date}
                     </span>
                  </div>

                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-2 border-neo-black z-10 flex items-center justify-center shadow-neo transition-transform group-hover:scale-110 group-hover:bg-neo-yellow">
                     {getIcon(event.type)}
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                     {/* Mobile Date */}
                     <div className="md:hidden mb-2">
                        <span className="font-mono font-bold text-xs bg-neo-yellow px-2 py-1 border-2 border-neo-black">
                           {event.date}
                        </span>
                     </div>

                     <Card className={`p-6 relative hover:translate-y-[-4px] hover:shadow-neo-lg transition-all ${event.status === 'current' ? 'border-l-[8px] border-l-neo-blue' : ''}`}>
                        {event.status === 'delayed' && (
                           <div className="absolute -top-3 -right-3 bg-neo-red text-white border-2 border-neo-black px-2 py-1 text-xs font-bold uppercase rotate-12 shadow-sm">
                              Delayed
                           </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-2">
                           <Badge variant="neutral">{event.type}</Badge>
                           {event.status === 'completed' && <CheckCircle size={16} className="text-neo-green" />}
                        </div>
                        
                        <h3 className="text-xl font-black uppercase mb-2 leading-tight">{event.title}</h3>
                        <p className="font-mono text-sm text-gray-600 leading-relaxed mb-4">
                           {event.description}
                        </p>

                        <div className="pt-4 border-t-2 border-neo-black border-dashed flex justify-between items-center">
                           <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full bg-neo-pink border-2 border-neo-black"></div>
                              <div className="w-8 h-8 rounded-full bg-neo-blue border-2 border-neo-black"></div>
                           </div>
                           <button className="text-xs font-bold uppercase hover:underline">View Details</button>
                        </div>
                     </Card>
                  </div>

               </div>
             );
           })}
        </div>
        
        {/* End Marker */}
        <div className="absolute left-8 md:left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-8">
           <div className="w-4 h-4 bg-neo-black rounded-full"></div>
        </div>

      </div>

    </div>
  );
};