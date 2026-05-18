import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  TrendingDown, 
  TrendingUp, 
  Dumbbell, 
  Scale, 
  Activity, 
  Trophy, 
  Calendar,
  ChevronRight,
  Plus,
  Zap,
  Shield,
  Star,
  Award,
  History,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const weightData = [
  { name: 'Week 1', weight: 85.0 },
  { name: 'Week 2', weight: 84.2 },
  { name: 'Week 3', weight: 83.5 },
  { name: 'Week 4', weight: 82.8 },
  { name: 'Week 5', weight: 82.1 },
  { name: 'Week 6', weight: 81.5 },
  { name: 'Week 7', weight: 80.8 },
  { name: 'Week 8', weight: 79.2 },
];

const MILESTONES = [
  { id: '7d', label: '7 Days', title: 'The Ignition', icon: Zap, unlocked: true, date: 'May 10, 2026' },
  { id: '30d', label: '30 Days', title: 'Neural Lock', icon: Shield, unlocked: true, date: 'June 2, 2026' },
  { id: '90d', label: '90 Days', title: 'Iron Will', icon: Award, unlocked: false, progress: 65 },
  { id: '180d', label: '180 Days', title: 'The Architect', icon: Star, unlocked: false, progress: 0 },
  { id: '1y', label: '1 Year', title: 'God Protocol', icon: Trophy, unlocked: false, progress: 0 },
];

const checkIns = [
  { id: 1, date: 'Today', weight: 79.2, bf: 14.5, photo: 'https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=400&q=80' },
  { id: 2, date: '30 Days Ago', weight: 82.8, bf: 16.2, photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80' },
  { id: 3, date: 'Day 1', weight: 85.0, bf: 18.5, photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
];

export default function Transformation({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats' | 'milestones'>('timeline');

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono text-cyan-400">
            METRICS / EVOLUTION / ARCHIVE
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase italic text-white leading-none">
            TOTAL <span className="text-cyan-400">EVOLUTION</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 shadow-xl">
             <Camera className="w-4 h-4" /> Log Photo
           </button>
           <button className="flex items-center gap-2 px-8 py-4 bg-[#0F0F12] text-white border border-white/5 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all">
             <Plus className="w-4 h-4" /> Add Stat
           </button>
        </div>
      </header>

      {/* Stats Quick Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {[
          { label: 'WEIGHT LOSS', value: '5.8kg', trend: 'down', icon: Scale },
          { label: 'BODY FAT', value: '-4.0%', trend: 'down', icon: Activity },
          { label: 'STRENGTH', value: '+12%', trend: 'up', icon: Dumbbell },
          { label: 'LEAN MASS', value: '1.2kg', trend: 'up', icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0F0F12] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className="w-5 h-5 text-cyan-400" />
              {stat.trend === 'down' ? (
                <ArrowDownRight className="w-4 h-4 text-emerald-400" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              )}
            </div>
            <div className="text-2xl font-black italic text-white mb-1">{stat.value}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
        {[
          { id: 'timeline', label: 'Visual Timeline', icon: Camera },
          { id: 'stats', label: 'Metric Analytics', icon: History },
          { id: 'milestones', label: 'Milestone Rewards', icon: Trophy }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
              activeTab === tab.id ? "bg-cyan-400 text-black shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {checkIns.map((checkIn, i) => (
                <div key={checkIn.id} className="bg-[#0F0F12] border border-white/5 rounded-[2.5rem] overflow-hidden group shadow-2xl relative">
                  <div className="h-96 overflow-hidden relative">
                    <img src={checkIn.photo} alt={checkIn.date} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                       <span className="px-3 py-1 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">{checkIn.date}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Weight</div>
                          <div className="text-xl font-black text-white italic">{checkIn.weight}kg</div>
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Body Fat</div>
                          <div className="text-xl font-black text-white italic">{checkIn.bf}%</div>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Side-by-Side Comparison Feature */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 p-8 lg:p-12 rounded-[3.5rem] shadow-3xl">
               <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1 text-center lg:text-left">
                     <h3 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter text-white mb-6">Forge Comparison</h3>
                     <p className="text-slate-400 max-w-xl text-sm leading-relaxed mb-8">
                        Select two snapshots to generate a side-by-side metric overlay. Your neural link will analyze muscle definition and postural improvements.
                     </p>
                     <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400">Day 1</div>
                        <div className="flex items-center text-cyan-400">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <div className="px-6 py-3 bg-cyan-400/10 border border-cyan-400/20 rounded-xl text-[10px] font-bold uppercase tracking-widest text-cyan-400">Today</div>
                     </div>
                  </div>
                  <div className="relative w-full lg:w-96 aspect-square bg-[#0F0F12] border border-white/5 rounded-[2.5rem] overflow-hidden group cursor-pointer">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-16 h-16 text-cyan-400/20 group-hover:scale-110 group-hover:text-cyan-400 transition-all opacity-0 group-hover:opacity-100" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-cyan-400">Analyze Evolution</span>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-[#0F0F12] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-white mb-8">Weight Optimization Path</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightData}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#475569" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{fontWeight: 'bold', fill: '#475569'}}
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={['dataMin - 5', 'dataMax + 5']}
                      tick={{fontWeight: 'bold'}}
                    />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0F0F12', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem'}}
                      itemStyle={{color: '#22d3ee', fontWeight: 'bold'}}
                    />
                    <Area type="monotone" dataKey="weight" stroke="#22d3ee" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[2.5rem]">
                  <h4 className="text-xl font-black uppercase italic text-white mb-6">Strength Progression</h4>
                  <div className="space-y-6">
                     {[
                       { lift: 'Deadlift', val: '180kg', change: '+20kg', p: 85 },
                       { lift: 'Bench Press', val: '110kg', change: '+10kg', p: 70 },
                       { lift: 'Squat', val: '140kg', change: '+15kg', p: 75 },
                     ].map(l => (
                       <div key={l.lift}>
                         <div className="flex justify-between items-end mb-2">
                           <div>
                             <div className="text-white font-black uppercase italic text-sm">{l.lift}</div>
                             <div className="text-[10px] text-cyan-400 font-black">{l.change} improvement</div>
                           </div>
                           <div className="text-xl font-black text-white italic">{l.val}</div>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${l.p}%` }} className="h-full bg-cyan-400" />
                         </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[2.5rem]">
                  <h4 className="text-xl font-black uppercase italic text-white mb-6">Measurements (Inches)</h4>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { label: 'Chest', val: '44.5"', diff: '+1.2"' },
                       { label: 'Waist', val: '31.2"', diff: '-2.4"' },
                       { label: 'Arms', val: '16.8"', diff: '+0.5"' },
                       { label: 'Thighs', val: '24.5"', diff: '+0.8"' },
                     ].map(m => (
                       <div key={m.label} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                          <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1">{m.label}</div>
                          <div className="text-xl font-black text-white italic">{m.val}</div>
                          <div className={cn(
                            "text-[10px] font-black uppercase",
                            m.diff.startsWith('+') ? "text-cyan-400" : "text-emerald-400"
                          )}>{m.diff}</div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'milestones' && (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {MILESTONES.map((m) => (
              <div 
                key={m.id}
                className={cn(
                  "p-8 rounded-[2.5rem] border transition-all relative overflow-hidden group",
                  m.unlocked 
                    ? "bg-[#0F0F12] border-emerald-500/20" 
                    : "bg-[#0F0F12] border-white/5 opacity-60"
                )}
              >
                {m.unlocked && (
                  <div className="absolute top-0 right-0 p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                )}
                
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110",
                  m.unlocked ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500"
                )}>
                  <m.icon className="w-8 h-8" />
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{m.label} Milestone</div>
                <h3 className="text-2xl font-black uppercase italic text-white mb-2">{m.title}</h3>
                
                {m.unlocked ? (
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Achieved on {m.date}</div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} className="h-full bg-cyan-400" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>Progress</span>
                      <span>{m.progress}%</span>
                    </div>
                  </div>
                )}

                {!m.unlocked && (
                   <div className="mt-8 p-4 bg-white/5 rounded-xl text-[10px] font-bold text-slate-400 italic">
                      "Unlock to reveal elite rewards and platform features."
                   </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Addiction Psychology: Weekly Report Teaser */}
      <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-cyan-400 rounded-full blur-sm" />
        <h2 className="text-4xl font-black uppercase italic text-white mb-6">The Sunday Synthesis</h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
          The most important notification of your week. Every Sunday at 08:00 PM, we package your entire metabolic history into a visual report. <span className="text-white font-bold italic">Don't break your 12-week review streak.</span>
        </p>
        <div className="flex justify-center gap-4">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={cn(
               "w-3 h-3 rounded-full",
               i < 3 ? "bg-cyan-400" : "bg-white/5 shadow-inner"
             )} />
           ))}
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
