import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus, MoreHorizontal } from 'lucide-react';
import { Card, Button, Badge, Modal, Input, Label } from './ui';

interface CalendarEvent {
  id: string;
  title: string;
  day: number;
  time: string;
  type: 'work' | 'personal' | 'urgent';
}

const initialEvents: CalendarEvent[] = [
  { id: '1', title: 'Team Sync', day: 5, time: '10:00 AM', type: 'work' },
  { id: '2', title: 'Project Deadline', day: 12, time: '5:00 PM', type: 'urgent' },
  { id: '3', title: 'Lunch with Client', day: 15, time: '12:30 PM', type: 'work' },
  { id: '4', title: 'Dentist Appt', day: 22, time: '3:00 PM', type: 'personal' },
  { id: '5', title: 'Product Launch', day: 28, time: '9:00 AM', type: 'urgent' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('October 2023');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', day: '1', time: '', type: 'work' });

  // Simplified calendar grid generation for demo
  const generateCalendarDays = () => {
    const days = [];
    // Padding for start of month
    for (let i = 0; i < 2; i++) days.push(null);
    // 31 Days
    for (let i = 1; i <= 31; i++) days.push(i);
    // Padding for end
    for (let i = 0; i < 2; i++) days.push(null);
    return days;
  };

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'work': return 'bg-neo-blue border-neo-black text-neo-black';
      case 'urgent': return 'bg-neo-red border-neo-black text-white';
      case 'personal': return 'bg-neo-yellow border-neo-black text-neo-black';
      default: return 'bg-white border-neo-black text-neo-black';
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const evt: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        day: parseInt(newEvent.day),
        time: newEvent.time,
        type: newEvent.type as any
    };
    setEvents([...events, evt]);
    setIsAddModalOpen(false);
    setNewEvent({ title: '', day: '1', time: '', type: 'work' });
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed mb-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Schedule</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-purple text-white inline-block px-1">CALENDAR & EVENTS</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-white border-2 border-neo-black px-2 mr-2 shadow-neo-sm">
             <button className="p-1 hover:bg-gray-100"><ChevronLeft size={20} /></button>
             <span className="font-bold uppercase w-32 text-center select-none">{currentMonth}</span>
             <button className="p-1 hover:bg-gray-100"><ChevronRight size={20} /></button>
          </div>
          <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>Add Event</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* Sidebar Mini */}
        <div className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-6 overflow-y-auto">
           <Card className="p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                 <span className="font-bold uppercase text-sm">Upcoming</span>
                 <MoreHorizontal size={16} className="text-gray-400" />
              </div>
              <div className="space-y-3">
                 {events.sort((a,b) => a.day - b.day).slice(0, 4).map(evt => (
                    <div key={evt.id} className="flex gap-3 items-start border-l-4 border-neo-black pl-3 py-1">
                       <div className="text-center min-w-[2rem]">
                          <span className="block text-xs font-bold uppercase text-gray-500">Oct</span>
                          <span className="block text-lg font-black leading-none">{evt.day}</span>
                       </div>
                       <div>
                          <p className="font-bold text-sm leading-tight">{evt.title}</p>
                          <p className="text-xs font-mono text-gray-500 mt-0.5">{evt.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>

           <Card className="p-4 bg-neo-bg">
              <h3 className="font-bold uppercase text-sm mb-3">Categories</h3>
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neo-blue border border-neo-black"></div>
                    <span className="text-sm font-mono">Work</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neo-red border border-neo-black"></div>
                    <span className="text-sm font-mono">Urgent</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neo-yellow border border-neo-black"></div>
                    <span className="text-sm font-mono">Personal</span>
                 </div>
              </div>
           </Card>
        </div>

        {/* Main Calendar Grid */}
        <Card className="flex-1 p-0 flex flex-col overflow-hidden bg-white">
           {/* Weekday Header */}
           <div className="grid grid-cols-7 border-b-2 border-neo-black bg-neo-yellow text-neo-black">
              {daysOfWeek.map(day => (
                 <div key={day} className="py-2 text-center font-black uppercase text-sm border-r border-neo-black/10 last:border-r-0">
                    {day}
                 </div>
              ))}
           </div>
           
           {/* Days Grid */}
           <div className="grid grid-cols-7 grid-rows-5 flex-1 bg-neo-black gap-[1px] border-b-2 border-neo-black">
              {generateCalendarDays().map((day, idx) => {
                 const dayEvents = day ? events.filter(e => e.day === day) : [];
                 return (
                    <div key={idx} className={`bg-white relative p-2 min-h-[80px] group transition-colors hover:bg-gray-50 flex flex-col gap-1`}>
                       {day && (
                          <>
                             <span className={`text-sm font-mono font-bold ${day === 24 ? 'bg-neo-black text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-500'}`}>
                                {day}
                             </span>
                             <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
                                {dayEvents.map(evt => (
                                   <div key={evt.id} className={`text-[10px] px-1 py-0.5 font-bold truncate border ${getEventTypeColor(evt.type)} shadow-sm cursor-pointer hover:scale-105 transition-transform`}>
                                      {evt.time.split(' ')[0]} {evt.title}
                                   </div>
                                ))}
                             </div>
                             {/* Add Button on Hover */}
                             <button className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-neo-black">
                                <Plus size={14} />
                             </button>
                          </>
                       )}
                    </div>
                 );
              })}
           </div>
        </Card>

      </div>

      {/* Add Event Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Event">
         <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="space-y-1">
               <Label>Event Title</Label>
               <Input required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} placeholder="Meeting name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <Label>Day (Oct)</Label>
                  <Input type="number" min="1" max="31" required value={newEvent.day} onChange={e => setNewEvent({...newEvent, day: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <Label>Time</Label>
                  <Input type="text" placeholder="10:00 AM" required value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
               </div>
            </div>
            <div className="space-y-1">
               <Label>Type</Label>
               <select className="w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo" value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="urgent">Urgent</option>
               </select>
            </div>
            <div className="pt-4 flex justify-end gap-2">
               <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} type="button">Cancel</Button>
               <Button type="submit">Save Event</Button>
            </div>
         </form>
      </Modal>

    </div>
  );
};