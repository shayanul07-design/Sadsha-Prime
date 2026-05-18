import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Quote, 
  User, 
  Lock, 
  CheckCircle2, 
  Circle,
  Plus,
  Minus,
  Wind,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const MOTIVATIONAL_QUOTES = [
  { text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'", author: "Muhammad Ali", tag: "Persistence" },
  { text: "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.", author: "Arnold Schwarzenegger", tag: "Discipline" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins", tag: "Mental Toughness" },
  { text: "Your love makes me strong. Your hate makes me unstoppable.", author: "Cristiano Ronaldo", tag: "Mindset" },
  { text: "I've failed over and over and over again in my life and that is why I succeed.", author: "Michael Jordan", tag: "Success" },
  { text: "Be happy, but never satisfied.", author: "Bruce Lee", tag: "Growth" },
  { text: "Self-belief and hard work will always earn you success.", author: "Virat Kohli", tag: "Confidence" }
];

export default function Lifestyle({ user }: { user: any }) {
  const [waterAmount, setWaterAmount] = useState(1200); // ml
  const [dailyGoal] = useState(3500); // ml
  const [activeQuote, setActiveQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [habits, setHabits] = useState([
    { id: '1', title: 'Morning Sunlight', time: '07:00 AM', completed: false, category: 'Energy' },
    { id: '2', title: 'Post-Workout Skin Cleanse', time: '10:00 AM', completed: false, category: 'Skin' },
    { id: '3', title: 'Deep Hydration Protocol', time: '12:00 PM', completed: true, category: 'Metabolism' },
    { id: '4', title: 'Scalp Massage', time: '09:00 PM', completed: false, category: 'Grooming' }
  ]);

  const isPlatinum = user.tier === 'Platinum' || user.tier === 'Diamond';
  const isDiamond = user.tier === 'Diamond';

  const waterPercentage = Math.min((waterAmount / dailyGoal) * 100, 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">
            LIFESTYLE / NEURAL / OPTIMIZATION
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase italic text-white leading-none">
            TOTAL <span className="text-cyan-400">COMMAND</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hydration Tracker */}
        <div className="lg:col-span-1 bg-[#0F0F12] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Daily Goal: {dailyGoal}ml
              </div>
            </div>

            <div className="mb-10 text-center">
              <div className="text-6xl font-black italic text-white mb-2">{waterAmount}<span className="text-xl text-slate-500 not-italic ml-2">ml</span></div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Hydration Levels: {waterPercentage.toFixed(0)}%</div>
            </div>

            <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-10 border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${waterPercentage}%` }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setWaterAmount(prev => Math.max(0, prev - 250))}
                className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
              >
                <Minus className="w-5 h-5 text-slate-400" />
              </button>
              <button 
                onClick={() => setWaterAmount(prev => prev + 250)}
                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-xl active:scale-95"
              >
                <Plus className="w-5 h-5" /> Add 250ml
              </button>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="lg:col-span-2 bg-[#0F0F12] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl flex flex-col justify-center min-h-[350px]">
          <Quote className="absolute -top-10 -left-10 w-48 h-48 text-cyan-400/5 rotate-12" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuote.text}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            >
              <div className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[8px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
                {activeQuote.tag} Logic
              </div>
              <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-white mb-8 leading-[1.1]">
                "{activeQuote.text}"
              </blockquote>
              <cite className="text-slate-400 text-sm font-bold uppercase tracking-widest not-italic flex items-center gap-4">
                <span className="w-8 h-px bg-cyan-500/30"></span>
                {activeQuote.author}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Habits & Reminders */}
        <div className="bg-[#0F0F12] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tight text-white flex items-center gap-3">
              <Bell className="w-6 h-6 text-cyan-400" />
              Daily Protocols
            </h3>
            <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-400/10 rounded-full">
              {habits.filter(h => h.completed).length}/{habits.length} Done
            </div>
          </div>

          <div className="space-y-4">
            {habits.map((habit) => (
              <div 
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={cn(
                  "p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group",
                  habit.completed 
                    ? "bg-cyan-500/5 border-cyan-500/20" 
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-xl transition-all",
                    habit.completed ? "bg-cyan-500 text-black" : "bg-white/5 text-slate-500 group-hover:text-white"
                  )}>
                    {habit.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className={cn(
                      "font-bold uppercase italic text-sm transition-all",
                      habit.completed ? "text-cyan-400" : "text-white"
                    )}>
                      {habit.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{habit.time} • {habit.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Lifestyle Tiers (Skin & Hair) */}
        <div className="space-y-8">
          {/* Skin Protocol (Platinum) */}
          <div className={cn(
            "relative bg-[#0F0F12] border rounded-[2.5rem] p-8 overflow-hidden shadow-2xl transition-all",
            isPlatinum ? "border-white/5" : "border-slate-800 opacity-60 grayscale"
          )}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase italic text-white leading-none">Skin Forge</h4>
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Dermal Optimization</p>
                </div>
              </div>
              {!isPlatinum && <Lock className="w-5 h-5 text-slate-600" />}
            </div>

            {isPlatinum ? (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Sun className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-300">AM Routine: Hydrate + Vitamin C</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-all" />
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Moon className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-slate-300">PM Routine: Cleanse + Repair</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-all" />
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Elite Dermal Logic Required</p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'pricing' }))}
                  className="px-6 py-2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-400 transition-all"
                >
                  Upgrade to Platinum
                </button>
              </div>
            )}
          </div>

          {/* Hair & Grooming (Diamond) */}
          <div className={cn(
            "relative bg-[#0F0F12] border rounded-[2.5rem] p-8 overflow-hidden shadow-2xl transition-all",
            isDiamond ? "border-white/5" : "border-slate-800 opacity-60 grayscale"
          )}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase italic text-white leading-none">Follicle Mastery</h4>
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Diamond Grooming System</p>
                </div>
              </div>
              {!isDiamond && <Lock className="w-5 h-5 text-slate-600" />}
            </div>

            {isDiamond ? (
              <div className="space-y-4">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold text-slate-300">Scalp Protection Protocol</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex gap-2">
                   <div className="flex-1 bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <div className="text-xs font-black text-white">Beard Care</div>
                      <div className="text-[8px] text-slate-500 uppercase font-black">Active</div>
                   </div>
                   <div className="flex-1 bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <div className="text-xs font-black text-white">Oil Cycle</div>
                      <div className="text-[8px] text-slate-500 uppercase font-black">Day 4/7</div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Diamond Clearance Required</p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'pricing' }))}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:shadow-orange-500/20 transition-all"
                >
                  Upgrade to Diamond
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gamification/Streaks Footer Section */}
      <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 p-8 lg:p-12 rounded-[3rem] shadow-3xl text-center relative overflow-hidden">
        <Zap className="absolute -top-12 -left-12 w-64 h-64 text-cyan-400/5 rotate-12" />
        <Zap className="absolute -bottom-12 -right-12 w-64 h-64 text-cyan-400/5 -rotate-12" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Ethical Growth Psychology
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold uppercase italic tracking-tighter text-white mb-6">
            The {user.streak} Day <span className="text-cyan-400">Warpath</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-sm lg:text-lg">
            Consistency is the only variable that matters. You have opened Sadsha Prime for {user.streak} days straight. 
            Keep the fire burning to unlock <span className="text-white font-bold">Elite Badge 04</span> in 3 days.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-black italic text-white mb-1">94%</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Protocol Adherence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black italic text-white mb-1">12</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black italic text-white mb-1">Top 4%</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Ranking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
