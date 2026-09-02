import React from 'react';
import { Plus } from 'lucide-react';

const FloatingActionButton = ({ onClick, label = 'Add', icon: Icon = Plus }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 lg:hidden z-40 bg-ping text-white p-4 rounded-full shadow-lg hover:bg-ping-dark hover:shadow-xl transition-all active:scale-95"
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
};

export default FloatingActionButton;
