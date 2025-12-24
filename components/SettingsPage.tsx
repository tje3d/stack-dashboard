import React, { useState } from 'react';
import { Save, User, Bell, Shield, Key, Trash2, Mail, Briefcase, Globe, Lock, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, Button, Input, Label, Toggle, Badge, Modal } from './ui';

export const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });
  
  const [apiKey, setApiKey] = useState('sk-............................');

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus('saving');
    setErrorMessage('');
    
    // Basic validation
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordStatus('error');
      setErrorMessage('All fields are required.');
      return;
    }

    if (passwordForm.new !== passwordForm.confirm) {
        setPasswordStatus('error');
        setErrorMessage('New passwords do not match.');
        return;
    }

    if (passwordForm.new.length < 8) {
      setPasswordStatus('error');
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    // Simulate API call
    setTimeout(() => {
        setPasswordStatus('success');
        setTimeout(() => {
            setIsPasswordModalOpen(false);
            setPasswordStatus('idle');
            setPasswordForm({ current: '', new: '', confirm: '' });
            setErrorMessage('');
        }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Settings</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-purple text-white inline-block px-1">SYSTEM CONFIGURATION</p>
        </div>
        <Button icon={Save}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Column */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="p-0 overflow-hidden">
            <div className="h-24 bg-neo-blue border-b-2 border-neo-black relative">
               <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                 <div className="w-20 h-20 bg-neo-yellow border-2 border-neo-black flex items-center justify-center shadow-neo">
                    <span className="font-black text-2xl">JD</span>
                 </div>
               </div>
            </div>
            <div className="pt-12 pb-6 px-6 text-center">
              <h2 className="font-black text-xl uppercase">John Doe</h2>
              <p className="font-mono text-sm text-gray-600 mb-4">ADMINISTRATOR</p>
              <div className="flex justify-center gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="neutral">Pro Plan</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-neo-white">
             <div className="flex items-center gap-3 mb-6 border-b-2 border-neo-black pb-2">
                <Shield size={20} strokeWidth={2.5} />
                <h3 className="font-bold uppercase">Security</h3>
             </div>
             <div className="space-y-4">
               <Button 
                variant="secondary" 
                className="w-full justify-between" 
                icon={Key}
                onClick={() => setIsPasswordModalOpen(true)}
               >
                Change Password
               </Button>
               <Button variant="secondary" className="w-full justify-between" icon={Briefcase}>Manage Team</Button>
             </div>
          </Card>
        </div>

        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Information */}
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neo-yellow border-2 border-neo-black shadow-neo-sm">
                  <User size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black uppercase">Profile Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-1">
                <Label>Job Title</Label>
                <Input defaultValue="Senior Developer" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <Input defaultValue="john.doe@example.com" className="pl-10" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-1">
                <Label>Bio</Label>
                <textarea className="w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none focus:shadow-neo h-24 resize-none" defaultValue="Building the next generation of dashboard tools." />
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-8 bg-neo-bg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neo-pink border-2 border-neo-black shadow-neo-sm">
                  <Bell size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black uppercase">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <Toggle 
                label="Email Notifications" 
                checked={notifications.email} 
                onChange={(c) => setNotifications({...notifications, email: c})} 
              />
              <div className="h-px bg-neo-black opacity-10" />
              <Toggle 
                label="Push Notifications" 
                checked={notifications.push} 
                onChange={(c) => setNotifications({...notifications, push: c})} 
              />
              <div className="h-px bg-neo-black opacity-10" />
              <Toggle 
                label="Marketing Updates" 
                checked={notifications.marketing} 
                onChange={(c) => setNotifications({...notifications, marketing: c})} 
              />
            </div>
          </Card>

           {/* API Config */}
           <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neo-green border-2 border-neo-black shadow-neo-sm">
                  <Globe size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black uppercase">API Configuration</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-neo-blue/20 border-2 border-neo-blue p-4 text-sm font-mono mb-4">
                <p><strong>Note:</strong> API keys are masked for security. Use the verify button to test connection.</p>
              </div>
              <div className="space-y-1">
                <Label>Google Gemini API Key</Label>
                <div className="flex gap-2">
                   <Input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                   <Button variant="secondary">Verify</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-8 border-neo-red bg-red-50">
             <div className="flex items-start justify-between">
                <div>
                   <h3 className="font-black text-xl text-neo-red uppercase mb-2">Danger Zone</h3>
                   <p className="text-sm font-mono text-neo-black">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <Button variant="danger" icon={Trash2}>Delete Account</Button>
             </div>
          </Card>

        </div>
      </div>

      {/* Change Password Modal */}
      <Modal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
        title="Change Password"
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          
          {passwordStatus === 'error' && (
             <div className="bg-neo-red text-white p-3 border-2 border-neo-black flex items-center gap-2 text-sm font-bold">
               <AlertTriangle size={18} />
               {errorMessage}
             </div>
          )}

          {passwordStatus === 'success' ? (
             <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in">
               <div className="inline-flex p-4 bg-neo-green border-2 border-neo-black rounded-full text-neo-black shadow-neo">
                 <CheckCircle size={48} strokeWidth={3} />
               </div>
               <h3 className="text-xl font-black uppercase">Password Updated!</h3>
               <p className="text-sm font-mono text-gray-600">Your secure access key has been refreshed.</p>
             </div>
          ) : (
            <>
              <div className="space-y-1">
                <Label>Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <Input 
                    type="password" 
                    className="pl-10" 
                    placeholder="Enter current password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>New Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <Input 
                    type="password" 
                    className="pl-10" 
                    placeholder="Min 8 characters"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <Input 
                    type="password" 
                    className="pl-10" 
                    placeholder="Re-enter new password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsPasswordModalOpen(false)} type="button">Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={passwordStatus === 'saving'}
                  icon={passwordStatus === 'saving' ? Loader2 : Save}
                >
                  {passwordStatus === 'saving' ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>

    </div>
  );
};
