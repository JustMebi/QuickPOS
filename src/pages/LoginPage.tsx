import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Store, Lock, Mail, User, Shield, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type Role = 'admin' | 'manager' | 'cashier';

const roles: { id: Role; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'admin',
    label: 'Admin',
    icon: <Shield className="h-5 w-5" />,
    description: 'Full access to all features',
  },
  {
    id: 'manager',
    label: 'Manager',
    icon: <UserCheck className="h-5 w-5" />,
    description: 'Reports, inventory, refunds',
  },
  {
    id: 'cashier',
    label: 'Cashier',
    icon: <User className="h-5 w-5" />,
    description: 'Sales operations only',
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('admin');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Missing credentials',
        description: 'Please enter your email and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    toast({
      title: 'Welcome back!',
      description: `Logged in as ${selectedRole}`,
    });
    
    navigate('/pos');
  };

  return (
    <div className="min-h-screen bg-pos-sidebar flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Store className="h-10 w-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-pos-sidebar-foreground mb-4">
            QuickPOS
          </h1>
          <p className="text-lg text-pos-sidebar-foreground/70 max-w-md">
            Modern point of sale system for your business. Fast, reliable, and easy to use.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">QuickPOS</h1>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
            <p className="text-muted-foreground mt-1">
              Enter your credentials to access the system
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label>Select Role</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      'flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200',
                      selectedRole === role.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border bg-card hover:border-accent/50'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center mb-2',
                        selectedRole === role.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      )}
                    >
                      {role.icon}
                    </div>
                    <span className="font-medium text-sm text-foreground">{role.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {roles.find((r) => r.id === selectedRole)?.description}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-accent hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 pos-btn-primary rounded-xl text-base font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Demo credentials: any email and password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
