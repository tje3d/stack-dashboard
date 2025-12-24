import React from 'react';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button, Card } from './ui';

interface ErrorPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<ErrorPageProps> = ({ onGoHome }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] p-4 text-center">
      <div className="relative">
         <h1 className="text-[150px] leading-none font-black text-neo-yellow drop-shadow-[8px_8px_0px_#181818] select-none">404</h1>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 bg-neo-red border-2 border-neo-black px-4 py-1 text-white font-black uppercase text-2xl shadow-neo">
            Not Found
         </div>
      </div>
      
      <p className="font-mono max-w-md my-8 text-lg">
         The page you are looking for has been moved, deleted, or possibly never existed in this dimension.
      </p>

      <div className="flex gap-4">
         <Button onClick={onGoHome} icon={Home} size="lg">Return Home</Button>
         <Button variant="secondary" size="lg">Report Issue</Button>
      </div>
    </div>
  );
};

export const ServerErrorPage: React.FC<ErrorPageProps> = ({ onGoHome }) => {
   return (
     <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] p-4 text-center bg-neo-black text-white relative overflow-hidden border-4 border-neo-red m-4 shadow-neo-lg">
       {/* Glitch Effect lines */}
       <div className="absolute top-10 left-0 w-full h-1 bg-neo-red opacity-50"></div>
       <div className="absolute bottom-20 left-0 w-full h-2 bg-neo-blue opacity-50"></div>
       
       <AlertTriangle size={80} className="text-neo-red mb-6" strokeWidth={2} />
       
       <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">System Failure</h1>
       <div className="bg-white text-neo-black px-2 py-0 font-mono font-bold text-xl mb-8">ERROR CODE: 500</div>
       
       <div className="font-mono text-sm max-w-lg mb-8 opacity-80 border-l-2 border-neo-red pl-4 text-left bg-white/5 p-4">
          > Initiating recovery protocol...<br/>
          > Checking server status... [FAILED]<br/>
          > The server encountered an internal error and was unable to complete your request.
       </div>
 
       <div className="flex gap-4">
          <Button onClick={onGoHome} variant="primary" icon={Home}>Safe Mode</Button>
          <Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>Retry Connection</Button>
       </div>
     </div>
   );
 };