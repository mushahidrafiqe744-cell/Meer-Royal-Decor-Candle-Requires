import React from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const getIcon = () => {
    if (toast.type === 'info') return <Info className="w-4 h-4 text-blue-400" />;
    if (toast.type === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    return <CheckCircle className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="fixed top-24 right-5 z-50 animate-bounce-short">
      <div className="bg-[#2C241E] text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-900/40 flex items-center gap-2.5 text-xs font-medium">
        {getIcon()}
        <span>{toast.text}</span>
      </div>
    </div>
  );
};
