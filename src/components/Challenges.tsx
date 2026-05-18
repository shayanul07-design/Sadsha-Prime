import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Zap, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Lock, 
  CheckCircle2,
  Clock,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Challenge {
  id: string;
  title: string;
  days: number;
  description: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Elite';
  xp: number;
  reward: string;
  isCustom?: boolean;
}

const PRESET_CHALLENGES: Challenge[] = [
  {
    id: '10-day-spark',
    title: '10-Day Metabolic Spark',
    days: 10,
    description: 'Jumpstart your metabolic rate with high-frequency, short-duration sessions.',
    intensity: 'Medium',
    xp: 500,
    reward: 'Bronze Badge'
  },
  {
    id: '20-day-momentum',
    title: '20-Day Momentum Builder',
    days: 20,
    description: 'Focus on consistency and volume to build sustainable fitness habits.',
    intensity: 'Medium',
    xp: 1200,
    reward: 'Silver Badge'
  },
  {
    id: '30-day-shred',
    title: '30-Day Protocol Shred',
    days: 30,
    description: 'Intense fat-burning protocol with integrated neural-link tracking.',
    intensity: 'High',
    xp: 2500,
    reward: 'Gold Badge'
  },
  {
    id: '75-hard-genesis',
    title: '75-Hard Genesis',
    days: 75,
    description: 'The ultimate tests of physical and mental fortitude. No excuses. No shortcuts.',
    intensity: 'Elite',
    xp: 10000,
    reward: 'Legendary Status'
  }
];

export default function Challenges({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [showCreator, setShowCreator] = useState(false);
  const [customDays, setCustomDays] = useState(30);
  const [customTitle, setCustomTitle] = useState('');

  const isPremium = user.tier === 'Diamond' || user.tier === 'Platinum';

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">
            PROTOCOL / EVOLUTION / CHALLENGES
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase italic text-white leading-none">
            LIMIT <span className="text-cyan-400">BREAKER</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('presets')}
            className={cn(
              "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === 'presets' ? "bg-white text-black shadow-xl" : "text-slate-500 hover:text-white"
            )}
          >
            Tactical Presets
          </button>
          <button 
            onClick={() => setActiveTab('custom')}
            className={cn(
              "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === 'custom' ? "bg-white text-black shadow-xl" : "text-slate-500 hover:text-white"
            )}
          >
            {!isPremium && <Lock className="w-3 h-3" />}
            Custom Forge
          </button>
        </div>
      </header>

      {activeTab === 'presets' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRESET_CHALLENGES.map((challenge, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={challenge.id}
              className="group relative bg-[#0F0F12] border border-white/5 rounded-[2rem] p-8 hover:border-cyan-500/50 transition-all shadow-xl hover:shadow-cyan-500/5 overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 text-sm font-black italic">+{challenge.xp} XP</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Protocol Reward</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  {challenge.days} Days Operation
                </div>
                <h3 className="text-3xl font-extrabold uppercase italic tracking-tighter text-white mb-3 leading-none group-hover:text-cyan-400 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  {challenge.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  <div>
                    <div className="text-white font-black text-sm uppercase italic">{challenge.intensity}</div>
                    <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Intensity</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all active:scale-95 shadow-lg">
                  Initiate <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {!isPremium ? (
            <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 blur-3xl"></div>
              <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-4xl font-extrabold uppercase italic tracking-tight text-white mb-4">Diamond Access Required</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                Custom Protocol Creation is restricted to Diamond Level operators. Forge your own destiny by upgrading your neural clearance.
              </p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'pricing' }))}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl active:scale-95"
              >
                Upgrade to Diamond
              </button>
            </div>
          ) : (
            <div className="bg-[#0F0F12] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px]"></div>
               
               <div className="flex items-center gap-4 mb-10">
                 <div className="w-14 h-14 rounded-2xl bg-cyan-400 flex items-center justify-center shadow-lg">
                   <Target className="w-8 h-8 text-black" />
                 </div>
                 <div>
                   <h3 className="text-3xl font-extrabold uppercase italic tracking-tighter text-white">Sadsha Forge</h3>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Custom Protocol Designer</p>
                 </div>
               </div>

               <div className="space-y-10">
                 <div className="space-y-4">
                   <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-1">Identity Code (Title)</label>
                   <input 
                     type="text" 
                     placeholder="e.g. SUMMER PEAK PROTOCOL"
                     value={customTitle}
                     onChange={(e) => setCustomTitle(e.target.value)}
                     className="w-full bg-[#08080A] border border-white/5 rounded-2xl py-6 px-8 text-xl font-black uppercase italic tracking-tight text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800"
                   />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-1">Temporal Duration (Days)</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="1" 
                          max="365" 
                          value={customDays}
                          onChange={(e) => setCustomDays(parseInt(e.target.value))}
                          className="flex-1 accent-cyan-400"
                        />
                        <div className="text-3xl font-black italic text-cyan-400 w-20 text-center">{customDays}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-1">Intensity Vector</label>
                      <div className="flex gap-2">
                        {['Standard', 'Advanced', 'Apex'].map(lv => (
                          <button 
                            key={lv}
                            className="flex-1 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:border-cyan-500 transition-all"
                          >
                            {lv}
                          </button>
                        ))}
                      </div>
                    </div>
                 </div>

                 <div className="pt-10 border-t border-white/5">
                    <button className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-2xl">
                      Forge Protocol
                    </button>
                 </div>
               </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard/Stats for Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 bg-[#0F0F12] border border-white/5 rounded-[2.5rem] p-8 flex flex-col sm:flex-row items-center gap-8 shadow-2xl">
           <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
              <Trophy className="w-12 h-12 text-cyan-400" />
           </div>
           <div className="flex-1 text-center sm:text-left">
              <h4 className="text-2xl font-extrabold uppercase italic italic tracking-tight text-white mb-2 leading-none">Global Performance Index</h4>
              <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                Athletes who complete the 30-Day Shred show a 14% increase in metabolic velocity compared to standard tracking.
              </p>
           </div>
           <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center min-w-[140px]">
              <div className="text-3xl font-extrabold italic text-white leading-none mb-1">12,402</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Challengers</div>
           </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
          <Zap className="absolute -bottom-12 -right-12 w-48 h-48 text-cyan-400/5 rotate-12" />
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Limited Window</span>
             </div>
             <h4 className="text-2xl font-black uppercase italic mb-4 leading-none text-white">Weekend <br /> Overdrive</h4>
             <p className="text-slate-400 text-xs mb-6 leading-relaxed">
               Complete 3 workouts this weekend to earn the Hyper-Drive badge and 250 bonus XP.
             </p>
             <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                Accept Mission
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
