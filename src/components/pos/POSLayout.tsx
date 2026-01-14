import React from 'react';
import { POSSidebar } from './POSSidebar';
import { POSProvider } from '@/contexts/POSContext';

interface POSLayoutProps {
  children: React.ReactNode;
}

export const POSLayout: React.FC<POSLayoutProps> = ({ children }) => {
  return (
    <POSProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <POSSidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
    </POSProvider>
  );
};
