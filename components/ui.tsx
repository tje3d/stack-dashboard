import React from 'react';
import { LucideIcon, X } from 'lucide-react';

// --- Branding ---

export const BrandLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Shadow Block */}
    <rect x="10" y="10" width="20" height="20" fill="#181818" />
    {/* Main Block */}
    <rect x="2" y="2" width="20" height="20" fill="#FFE66D" stroke="#181818" strokeWidth="3" />
    {/* Inner Detail */}
    <rect x="7" y="7" width="4" height="4" fill="#181818" />
  </svg>
);

// --- Atoms ---

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-neo-white border-2 border-neo-black shadow-neo ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, onClick, variant = 'primary', size = 'md', icon: Icon, disabled, className = '', type = 'button' }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-150 border-2 border-neo-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  
  const variants = {
    primary: "bg-neo-blue text-neo-black shadow-neo hover:bg-neo-darkBlue",
    secondary: "bg-neo-white text-neo-black shadow-neo hover:bg-gray-100",
    ghost: "bg-transparent border-transparent text-neo-black hover:bg-neo-black hover:text-white shadow-none",
    danger: "bg-neo-red text-white shadow-neo hover:bg-red-600"
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className={`mr-2 stroke-[3px] ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />}
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'danger' | 'neutral' }> = ({ children, variant = 'neutral' }) => {
  const styles = {
    success: "bg-neo-green text-neo-black",
    warning: "bg-neo-yellow text-neo-black",
    danger: "bg-neo-red text-white",
    neutral: "bg-gray-200 text-neo-black"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 border-2 border-neo-black text-xs font-bold uppercase ${styles[variant]}`}>
      {children}
    </span>
  );
};

// --- Form Atoms ---

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full bg-white border-2 border-neo-black px-4 py-2 font-mono text-sm outline-none transition-all focus:shadow-neo placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
    {...props}
  />
);

export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <label className={`block font-bold uppercase text-xs mb-2 tracking-wide text-neo-black ${className}`}>
    {children}
  </label>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label?: string }> = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between gap-4 cursor-pointer group" onClick={() => onChange(!checked)}>
    {label && <span className="font-bold uppercase text-sm select-none">{label}</span>}
    <div className={`w-14 h-8 border-2 border-neo-black relative transition-colors ${checked ? 'bg-neo-green' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 bottom-1 w-5 bg-neo-black transition-all duration-200 ${checked ? 'right-1' : 'left-1'}`} />
    </div>
  </div>
);

// --- Molecules ---

export const IconButton: React.FC<{ icon: LucideIcon; onClick?: () => void; className?: string }> = ({ icon: Icon, onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`p-2 border-2 border-neo-black bg-neo-white shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-neo-yellow transition-colors ${className}`}
  >
    <Icon size={20} strokeWidth={2.5} />
  </button>
);

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neo-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white border-2 border-neo-black shadow-neo-lg animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b-2 border-neo-black bg-neo-yellow">
          <h3 className="font-black uppercase tracking-wide text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-neo-red hover:text-white border-2 border-transparent hover:border-neo-black transition-colors">
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};