/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  TrendingUp, 
  Users, 
  Settings, 
  Zap, 
  Menu, 
  X,
  CreditCard,
  Target,
  LayoutDashboard,
  Trophy,
  Sparkles,
  BookOpen,
  History,
  Lock
} from 'lucide-react';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Groups from './components/Groups';
import Challenges from './components/Challenges';
import Library from './components/Library';
import Lifestyle from './components/Lifestyle';
import Transformation from './components/Transformation';
import CoachAI from './components/CoachAI';
import { cn } from './lib/utils';

type View = 'dashboard' | 'workouts' | 'groups' | 'pricing' | 'challenges' | 'lifestyle' | 'library' | 'transformation' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);

  useEffect(() => {
    const handleViewChange = (e: any) => {
      setCurrentView(e.detail);
    };
    window.addEventListener('change-view', handleViewChange);
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('change-view', handleViewChange);
    };
  }, []);
  const [user, setUser] = useState({
    name: 'Shayan',
    tier: 'Free' as 'Free' | 'Gold' | 'Platinum' | 'Diamond',
    streak: Math.floor(Math.random() * 10) + 1,
    goals: ['Fat Loss', 'Muscle Gain']
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'transformation', label: 'Evolution', icon: History },
    { id: 'library', label: 'Archive', icon: BookOpen },
    { id: 'lifestyle', label: 'Lifestyle', icon: Sparkles },
    { id: 'groups', label: 'Community', icon: Users },
    { id: 'pricing', label: 'Pro Plans', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#08080A] text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Mobile Header */}
      <header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#0F0F12]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">SADSHA PRIME</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-full sm:w-64 bg-[#0F0F12] border-r border-white/5 transition-transform lg:translate-x-0 lg:static",
            !isSidebarOpen && "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full p-6">
            <div className="hidden lg:flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase italic">SADSHA PRIME</span>
            </div>

            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as View);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
                    currentView === item.id 
                      ? "bg-white/5 text-cyan-400" 
                      : "text-slate-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", currentView === item.id ? "text-cyan-400" : "text-slate-500")} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Plan: {user.tier}</span>
                </div>
                {user.tier === 'Free' && (
                  <button 
                    onClick={() => setCurrentView('pricing')}
                    className="w-full mt-2 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:shadow-cyan-500/20 transition-all"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen relative overflow-x-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-3 sm:p-6 lg:p-10 max-w-7xl mx-auto"
            >
              {currentView === 'dashboard' && <Dashboard user={user} />}
              {currentView === 'pricing' && <Pricing onUpgrade={(tier) => { setUser({...user, tier: tier as any}); setCurrentView('dashboard'); }} />}
              {currentView === 'workouts' && <Workouts user={user} />}
              {currentView === 'challenges' && <Challenges user={user} />}
              {currentView === 'library' && <Library user={user} />}
              {currentView === 'transformation' && <Transformation user={user} />}
              {currentView === 'lifestyle' && <Lifestyle user={user} />}
              {currentView === 'groups' && <Groups user={user} />}
              {currentView === 'settings' && (
                 <div className="flex flex-col items-center justify-center min-h-[60vh] opacity-50 space-y-4">
                   <Settings className="w-16 h-16 animate-spin-slow text-cyan-400" />
                   <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase italic">System Configuration</h2>
                   <p className="text-sm font-semibold tracking-widest text-slate-400">Version 2.0.1 - Sadsha Core</p>
                 </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* AI Coach Floating Trigger */}
          <button
            onClick={() => setIsCoachOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-cyan-400 to-blue-600 text-white rounded-full shadow-2xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all group"
          >
            <div className="relative">
              <Zap className={cn("w-8 h-8 fill-white", user.tier === 'Free' && "blur-[1px] opacity-50")} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-cyan-500" />
              {user.tier === 'Free' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              )}
            </div>
          </button>
        </main>
      </div>

      {/* AI Coach Drawer */}
      <AnimatePresence>
        {isCoachOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCoachOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[59]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-black border-l border-white/10 z-[60] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-xl font-display font-black uppercase italic tracking-tighter">AI Sadsha Coach</h2>
                  <button onClick={() => setIsCoachOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <X />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden p-6">
                  <CoachAI user={user} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


