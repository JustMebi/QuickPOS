import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePOS } from '@/contexts/POSContext';

const navItems = [
  { icon: ShoppingCart, label: 'POS', path: '/pos' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const POSSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = usePOS();

  return (
    <aside className="w-20 lg:w-64 bg-pos-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 lg:px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Store className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="hidden lg:block text-lg font-bold text-pos-sidebar-foreground">
            QuickPOS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2 lg:px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                    'hover:bg-white/10',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-pos-sidebar-foreground/70'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="hidden lg:block font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 lg:px-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
            {user.name.charAt(0)}
          </div>
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="text-sm font-medium text-pos-sidebar-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-pos-sidebar-foreground/60 capitalize">
              {user.role}
            </p>
          </div>
          <button className="hidden lg:block p-2 text-pos-sidebar-foreground/60 hover:text-pos-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
