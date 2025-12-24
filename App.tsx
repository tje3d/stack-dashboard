import React, { useState } from 'react';
import { Sidebar, Header } from './components/layout';
import { StatCard, RevenueChart, UserActivityChart, ActivityTable } from './components/DashboardWidgets';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';
import { NotificationsPage } from './components/NotificationsPage';
import { CustomersPage } from './components/CustomersPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { KanbanPage } from './components/KanbanPage';
import { InventoryPage } from './components/InventoryPage';
import { BillingPage } from './components/BillingPage';
import { TicketsPage } from './components/TicketsPage';
import { ChatPage } from './components/ChatPage';
import { EmailPage } from './components/EmailPage';
import { FileManagerPage } from './components/FileManagerPage';
import { GalleryPage } from './components/GalleryPage';
import { CalendarPage } from './components/CalendarPage';
import { TimelinePage } from './components/TimelinePage';
import { CryptoMarketPage } from './components/CryptoMarketPage';
import { TradePage } from './components/TradePage';
import { WalletPage } from './components/WalletPage';
import { ConvertPage } from './components/ConvertPage';
import { NotFoundPage, ServerErrorPage } from './components/ErrorPages';
import { Metric, ChartDataPoint, ActivityItem, DashboardState } from './types';
import { Filter, Calendar } from 'lucide-react';

// --- Mock Data ---

const initialMetrics: Metric[] = [
  { id: '1', label: 'Total Revenue', value: '$42,500', change: 12.5, trend: 'up', icon: 'DollarSign' },
  { id: '2', label: 'Active Users', value: '1,240', change: 8.2, trend: 'up', icon: 'Users' },
  { id: '3', label: 'Bounce Rate', value: '42.3%', change: -2.1, trend: 'down', icon: 'Activity' },
  { id: '4', label: 'Server Uptime', value: '99.9%', change: 0.1, trend: 'up', icon: 'Server' },
];

const revenueData: ChartDataPoint[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4200 },
  { name: 'Sep', value: 5100 },
  { name: 'Oct', value: 4800 },
  { name: 'Nov', value: 5600 },
  { name: 'Dec', value: 6100 },
];

const activityData: ChartDataPoint[] = [
  { name: 'Mon', value: 320 },
  { name: 'Tue', value: 450 },
  { name: 'Wed', value: 410 },
  { name: 'Thu', value: 560 },
  { name: 'Fri', value: 520 },
  { name: 'Sat', value: 280 },
  { name: 'Sun', value: 240 },
];

const recentActivity: ActivityItem[] = [
  { id: '1', user: 'Alice Smith', action: 'Purchased', target: 'Pro Plan', timestamp: '2 mins ago', status: 'success' },
  { id: '2', user: 'Bob Jones', action: 'Login', target: 'Dashboard', timestamp: '15 mins ago', status: 'success' },
  { id: '3', user: 'Charlie Day', action: 'Failed Payment', target: 'Invoice #402', timestamp: '1 hour ago', status: 'failed' },
  { id: '4', user: 'Diana Prince', action: 'Updated', target: 'Profile Settings', timestamp: '2 hours ago', status: 'success' },
  { id: '5', user: 'Evan Wright', action: 'Request', target: 'Refund', timestamp: '3 hours ago', status: 'pending' },
];

// --- Sub-components for Views ---

interface DashboardViewProps {
  data: DashboardState;
}

const DashboardView: React.FC<DashboardViewProps> = ({ data }) => (
  <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Title Section */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
      <div>
        <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Dashboard</h1>
        <p className="text-neo-black font-mono text-sm mt-2 bg-neo-yellow inline-block px-1">REAL-TIME ANALYTICS MODULE v2.0</p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 bg-white border-2 border-neo-black px-4 py-2 font-bold uppercase shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg transition-all text-sm">
          <Calendar size={16} strokeWidth={2.5}/> This Year
        </button>
          <button className="flex items-center gap-2 bg-neo-black text-white border-2 border-neo-black px-4 py-2 font-bold uppercase shadow-neo hover:translate-y-[-2px] hover:shadow-neo-lg transition-all text-sm">
          <Filter size={16} strokeWidth={2.5}/> Filter
        </button>
      </div>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.metrics.map((metric, index) => (
        <StatCard key={metric.id} metric={metric} index={index} />
      ))}
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Charts */}
      <RevenueChart data={data.revenueData} />
      <UserActivityChart data={data.userActivityData} />

      {/* Table */}
      <ActivityTable activities={data.recentActivity} />
    </div>
  </div>
);


const App: React.FC = () => {
  // Authentication is TRUE by default to show dashboard immediately
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const dashboardData: DashboardState = {
    metrics: initialMetrics,
    revenueData,
    userActivityData: activityData,
    recentActivity
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setSidebarOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  // If not authenticated, force show Login Page (full screen)
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <SettingsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'kanban':
        return <KanbanPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'billing':
        return <BillingPage />;
      case 'tickets':
        return <TicketsPage />;
      case 'chat':
        return <ChatPage />;
      case 'email':
        return <EmailPage />;
      case 'files':
        return <FileManagerPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'crypto-market':
        return <CryptoMarketPage />;
      case 'crypto-trade':
        return <TradePage />;
      case 'crypto-convert':
        return <ConvertPage />;
      case 'crypto-wallet':
        return <WalletPage />;
      case '404_demo':
        return <NotFoundPage onGoHome={() => setCurrentView('dashboard')} />;
      case '500_demo':
        return <ServerErrorPage onGoHome={() => setCurrentView('dashboard')} />;
      case 'login_demo':
        return <LoginPage onLogin={() => setCurrentView('dashboard')} initialMode="login" />;
      case 'register_demo':
        return <LoginPage onLogin={() => setCurrentView('dashboard')} initialMode="register" />;
      case 'dashboard':
      default:
        return (
          <DashboardView
            data={dashboardData}
          />
        );
    }
  };

  const getPageTitle = () => {
    switch(currentView) {
      case 'settings': return 'Settings';
      case 'notifications': return 'Notifications';
      case 'customers': return 'Customers';
      case 'analytics': return 'Analytics';
      case 'kanban': return 'Project Board';
      case 'inventory': return 'Inventory';
      case 'billing': return 'Billing & Pricing';
      case 'tickets': return 'Support Desk';
      case 'chat': return 'Messages';
      case 'email': return 'Inbox';
      case 'files': return 'File Manager';
      case 'gallery': return 'Media Gallery';
      case 'calendar': return 'Schedule';
      case 'timeline': return 'Roadmap';
      case 'crypto-market': return 'Crypto Market';
      case 'crypto-trade': return 'Trade Terminal';
      case 'crypto-convert': return 'Convert Asset';
      case 'crypto-wallet': return 'My Wallet';
      case 'login_demo': return 'Login Page';
      case 'register_demo': return 'Register Page';
      case '404_demo': return '404 Error';
      case '500_demo': return '500 Error';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-neo-bg text-neo-black font-sans overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title={getPageTitle()}
          onNavigate={setCurrentView}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          {renderContent()}

          {/* Footer */}
          {/* Hide footer on error pages or kanban (which needs full height) for cleaner look */}
          {!['kanban', 'tickets', 'chat', 'email', 'files', 'calendar', 'timeline', 'crypto-trade', '404_demo', '500_demo'].includes(currentView) && (
            <footer className="mt-8 pt-8 border-t-2 border-neo-black text-center text-neo-black font-mono text-xs uppercase pb-4">
              <span className="bg-white border-2 border-neo-black px-3 py-1">
                  &copy; {new Date().getFullYear()} STACK Open Source. MIT License.
              </span>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;