import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Github, Twitter } from 'lucide-react';
import { Card, Button, Input, Label, BrandLogo } from './ui';

interface LoginPageProps {
  onLogin: () => void;
  initialMode?: 'login' | 'register';
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, initialMode = 'login' }) => {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsRegister(initialMode === 'register');
  }, [initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="w-full h-full min-h-[calc(100vh-6rem)] flex items-center justify-center bg-neo-bg p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[0%] left-[0%] w-[40%] h-[40%] bg-neo-yellow rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-neo-blue rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      <Card className="w-full max-w-md relative animate-in zoom-in-95 duration-300 shadow-neo-lg border-2 z-10">
        {/* Header */}
        <div className="bg-neo-black p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-neo-yellow"></div>
           <div className="absolute top-0 left-0 w-2 h-full bg-neo-red"></div>
           <div className="absolute bottom-0 right-0 w-full h-2 bg-neo-blue"></div>
           <div className="absolute bottom-0 right-0 w-2 h-full bg-neo-green"></div>
           
           <div className="flex justify-center mb-4">
             <div className="p-4 bg-neo-white border-2 border-white shadow-[4px_4px_0px_0px_#FFF]">
                <BrandLogo size={48} />
             </div>
           </div>
           <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-1">Stack</h1>
           <p className="text-white font-mono text-xs tracking-widest opacity-80">OPEN SOURCE DASHBOARD v1.0</p>
        </div>

        {/* Form Body */}
        <div className="p-8 bg-white">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 font-bold uppercase border-b-4 transition-colors ${!isRegister ? 'border-neo-black text-neo-black' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 font-bold uppercase border-b-4 transition-colors ${isRegister ? 'border-neo-black text-neo-black' : 'border-gray-200 text-gray-400 hover:text-gray-600'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="space-y-1 animate-in slide-in-from-left-2">
                <Label>Username</Label>
                <Input placeholder="Create a username" required />
              </div>
            )}
            
            <div className="space-y-1">
              <Label>Email Access</Label>
              <Input type="email" placeholder="dev@stack.opensource" required defaultValue="admin@stack.dev" />
            </div>

            <div className="space-y-1">
              <Label>Security Key</Label>
              <Input type="password" placeholder="••••••••" required defaultValue="password" />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-neo-yellow hover:bg-neo-yellow text-neo-black border-neo-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    {isRegister ? 'Initialize' : 'Access Stack'} <ArrowRight strokeWidth={3} size={20} />
                  </span>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-bold">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 flex justify-center items-center py-2 border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo transition-all bg-white">
                <Github size={20} strokeWidth={2.5} />
              </button>
              <button className="flex-1 flex justify-center items-center py-2 border-2 border-neo-black shadow-neo hover:translate-y-[-2px] hover:shadow-neo transition-all bg-white">
                <Twitter size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="absolute bottom-4 text-center w-full z-0">
         <p className="font-mono text-xs text-neo-black opacity-60">SECURE CONNECTION // ENCRYPTED 256-BIT</p>
      </div>
    </div>
  );
};
