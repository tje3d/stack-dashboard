import React from 'react';
import { LayoutDashboard, Users, Settings, PieChart, Bell, Search, Menu, X, LogOut, Lock, FileText, Trello, Package, CreditCard, AlertTriangle, LifeBuoy, MessageSquare, Mail, Folder, Image as ImageIcon, Calendar, GitBranch, Bitcoin, TrendingUp, Wallet, ArrowLeftRight } from 'lucide-react';
import { IconButton, Button, BrandLogo } from './ui';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, onNavigate, onLogout }) => {
  const mainItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'dashboard' },
    { icon: Users, label: 'Customers', id: 'customers' },
    { icon: PieChart, label: 'Analytics', id: 'analytics' },
    { icon: LifeBuoy, label: 'Support', id: 'tickets' },
  ];

  const appItems = [
    { icon: MessageSquare, label: 'Chat', id: 'chat' },
    { icon: Mail, label: 'Email', id: 'email' },
    { icon: Folder, label: 'Files', id: 'files' },
    { icon: Trello, label: 'Kanban', id: 'kanban' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: GitBranch, label: 'Timeline', id: 'timeline' },
    { icon: Package, label: 'Inventory', id: 'inventory' },
    { icon: ImageIcon, label: 'Gallery', id: 'gallery' },
    { icon: CreditCard, label: 'Billing', id: 'billing' },
    { icon: Bell, label: 'Notifications', id: 'notifications' },
  ];

  const cryptoItems = [
    { icon: Bitcoin, label: 'Market', id: 'crypto-market' },
    { icon: TrendingUp, label: 'Trade', id: 'crypto-trade' },
    { icon: ArrowLeftRight, label: 'Convert', id: 'crypto-convert' },
    { icon: Wallet, label: 'Wallet', id: 'crypto-wallet' },
  ];

  const utilityItems = [
    { icon: AlertTriangle, label: '404 Page', id: '404_demo' },
    { icon: AlertTriangle, label: '500 Page', id: '500_demo' },
    { icon: Lock, label: 'Login', id: 'login_demo' },
    { icon: FileText, label: 'Register', id: 'register_demo' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-neo-black/80 backdrop-grayscale lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r-2 border-neo-black transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo */}
          <div className="h-20 flex-shrink-0 flex items-center px-6 border-b-2 border-neo-black bg-neo-yellow">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <BrandLogo size={32} />
              <span className="text-2xl font-black text-neo-black tracking-tighter uppercase">Stack</span>
            </div>
            <button className="ml-auto lg:hidden text-neo-black border-2 border-neo-black p-1 hover:bg-neo-red hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-8 space-y-6">
            
            {/* Dashboard */}
            <div className="space-y-2">
              <p className="px-2 text-xs font-black uppercase text-gray-500 tracking-wider">Dashboards</p>
              {mainItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-2 text-sm font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    currentView === item.id
                      ? 'bg-neo-black text-white border-neo-black' 
                      : 'bg-white text-neo-black border-neo-black hover:bg-neo-blue'
                  }`}
                >
                  <item.icon size={20} strokeWidth={2.5} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Crypto */}
            <div className="space-y-2">
              <p className="px-2 text-xs font-black uppercase text-gray-500 tracking-wider">Fintech</p>
              {cryptoItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-2 text-sm font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    currentView === item.id
                      ? 'bg-neo-black text-white border-neo-black' 
                      : 'bg-white text-neo-black border-neo-black hover:bg-neo-green'
                  }`}
                >
                  <item.icon size={20} strokeWidth={2.5} />
                  {item.label}
                </button>
              ))}
            </div>

             {/* Apps */}
             <div className="space-y-2">
              <p className="px-2 text-xs font-black uppercase text-gray-500 tracking-wider">Apps</p>
              {appItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-2 text-sm font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    currentView === item.id
                      ? 'bg-neo-black text-white border-neo-black' 
                      : 'bg-white text-neo-black border-neo-black hover:bg-neo-purple'
                  }`}
                >
                  <item.icon size={20} strokeWidth={2.5} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Utility */}
            <div className="space-y-2">
              <p className="px-2 text-xs font-black uppercase text-gray-500 tracking-wider">Pages & Utils</p>
              {utilityItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-2 text-sm font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    currentView === item.id
                      ? 'bg-neo-black text-white border-neo-black' 
                      : 'bg-white text-neo-black border-neo-black hover:bg-neo-pink'
                  }`}
                >
                  <item.icon size={20} strokeWidth={2.5} />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile / Footer */}
          <div className="p-4 border-t-2 border-neo-black bg-gray-50 flex-shrink-0">
            <div 
              className="flex items-center gap-3 px-3 py-2 border-2 border-neo-black bg-white shadow-neo-sm cursor-pointer hover:bg-neo-red hover:text-white transition-colors group"
              onClick={onLogout}
            >
              <div className="w-10 h-10 border-2 border-neo-black bg-neo-green flex items-center justify-center text-sm font-bold text-neo-black group-hover:bg-white">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate uppercase">John Doe</p>
                <p className="text-xs truncate font-mono opacity-80">LOGOUT</p>
              </div>
              <LogOut size={18} className="text-neo-black group-hover:text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title, onNavigate }) => {
  return (
    <header className="h-20 border-b-2 border-neo-black bg-white flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 border-2 border-neo-black hover:bg-neo-yellow transition-colors shadow-neo-sm">
          <Menu size={24} strokeWidth={2.5} />
        </button>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar - Hidden on small screens */}
        <div className="hidden md:block relative w-64">
           <Search className="absolute left-3 top-2.5 text-neo-black" size={18} strokeWidth={2.5} />
           <input 
             type="text" 
             placeholder="SEARCH..." 
             className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-neo-black focus:bg-white focus:shadow-neo outline-none font-mono text-sm transition-all"
           />
        </div>

        <IconButton icon={Search} className="md:hidden" />
        <IconButton icon={Bell} onClick={() => onNavigate('notifications')} />
        
        <button 
          onClick={() => onNavigate('settings')}
          className="w-10 h-10 border-2 border-neo-black bg-neo-purple flex items-center justify-center text-white font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all"
        >
          JD
        </button>
      </div>
    </header>
  );
};
