import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, X, Trash2, Check, Clock } from 'lucide-react';
import { Card, Button, Badge, IconButton } from './ui';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Report Generated',
    message: 'Your monthly analytics report is ready for download.',
    time: '2 mins ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Storage Limit',
    message: 'You have used 85% of your allocated storage space.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'error',
    title: 'Payment Failed',
    message: 'We could not process your payment for the Pro Plan.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'System Update',
    message: 'Nexus v2.5 will be deployed on Sunday at 02:00 UTC.',
    time: '1 day ago',
    read: true,
  },
];

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-neo-green" size={24} strokeWidth={2.5} />;
      case 'warning': return <AlertTriangle className="text-neo-yellow" size={24} strokeWidth={2.5} />;
      case 'error': return <X className="text-neo-red" size={24} strokeWidth={2.5} />;
      default: return <Info className="text-neo-blue" size={24} strokeWidth={2.5} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-12 h-12 bg-neo-pink border-2 border-neo-black flex items-center justify-center shadow-neo">
               <Bell size={24} strokeWidth={2.5} />
             </div>
             {unreadCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-neo-red text-white text-xs font-bold w-6 h-6 flex items-center justify-center border-2 border-neo-black">
                 {unreadCount}
               </span>
             )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-neo-black uppercase tracking-tighter">Notifications</h1>
            <p className="text-neo-black font-mono text-sm">STAY UPDATED WITH SYSTEM EVENTS</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <Button variant="ghost" size="sm" onClick={markAllAsRead} icon={Check}>Mark all read</Button>
              <Button variant="danger" size="sm" onClick={clearAll} icon={Trash2}>Clear All</Button>
            </>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-neo-white border-2 border-neo-black border-dashed opacity-70">
            <Bell className="mx-auto mb-4 text-gray-400" size={48} strokeWidth={1.5} />
            <p className="font-bold uppercase text-lg">All caught up!</p>
            <p className="font-mono text-sm">No new notifications to display.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`relative flex gap-4 p-4 border-2 border-neo-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] ${notification.read ? 'bg-white' : 'bg-neo-white shadow-neo'}`}
            >
              {!notification.read && (
                 <div className="absolute top-2 right-2 w-3 h-3 bg-neo-red border-2 border-neo-black rounded-full" />
              )}
              
              <div className="flex-shrink-0 pt-1">
                <div className="p-2 border-2 border-neo-black bg-white shadow-[2px_2px_0px_0px_#000]">
                  {getIcon(notification.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                   <h3 className={`text-lg font-bold uppercase ${notification.read ? 'text-gray-700' : 'text-neo-black'}`}>
                     {notification.title}
                   </h3>
                   <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> {notification.time}
                   </span>
                </div>
                <p className="text-sm font-mono text-gray-600 leading-relaxed">
                  {notification.message}
                </p>
                <div className="mt-3 flex gap-2">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs font-bold uppercase underline hover:text-neo-blue"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center">
                 <button 
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 text-gray-400 hover:text-neo-red transition-colors"
                >
                   <X size={20} strokeWidth={2.5} />
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
