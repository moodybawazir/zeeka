
import React from 'react';
import { ViewState } from '../types';
import { Home, Coffee, Percent, Info } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

const navItems: { id: ViewState, icon: any, label: string }[] = [
  { id: 'home', icon: Home, label: 'الرئيسية' },
  { id: 'menu', icon: Coffee, label: 'المنيو' },
  { id: 'offers', icon: Percent, label: 'العروض' },
  { id: 'about', icon: Info, label: 'عن زيكا' }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="hidden md:flex flex-col items-center py-8 w-20 fixed right-0 top-1/2 -translate-y-1/2 h-[70%] bg-white/70 backdrop-blur-xl rounded-l-[3rem] border-l border-stone-200 z-40 shadow-2xl">
      <div className="flex flex-col space-y-12 items-center flex-1 justify-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className="group relative flex flex-col items-center space-y-2"
          >
            <div className={`p-4 rounded-2xl transition-all duration-300 ${
              currentView === item.id 
                ? 'bg-[#FF007F] text-white shadow-lg shadow-[#FF007F]/30 scale-110' 
                : 'text-stone-400 hover:text-[#4A3E30] hover:bg-stone-100'
            }`}>
              <item.icon size={22} />
            </div>
            <span className={`rotate-[90deg] absolute -right-20 top-1/2 -translate-y-1/2 text-[11px] font-black uppercase tracking-widest transition-opacity duration-300 ${
              currentView === item.id ? 'opacity-100 text-[#FF007F]' : 'opacity-0'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Branding Dot */}
      <div className="w-2 h-2 rounded-full bg-[#C19A6B]" />
    </div>
  );
};
