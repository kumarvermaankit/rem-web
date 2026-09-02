import React from 'react';
import { Bell, StickyNote, KeyRound, CreditCard, User } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'passwords', label: 'Passwords', icon: KeyRound },
  { id: 'subscription', label: 'Plans', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: User },
];

const BottomNav = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb lg:hidden z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === id
                ? 'text-ping'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="h-5 w-5 mb-1" strokeWidth={activeTab === id ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${activeTab === id ? 'font-semibold' : ''}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
