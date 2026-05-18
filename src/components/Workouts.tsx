import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Dumbbell, 
  Sparkles, 
  ChevronRight, 
  Play, 
  Clock, 
  Calendar,
  Lock,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

const categories = ['All', 'Strength', 'Cardio', 'Mobility', 'Hybrid'];

const mockRoutines = [
  { id: '1', title: 'Full Body Ignition', category: 'Strength', level: 'Beginner', duration: '45m', tier: 'Free' },
  { id: '2', title: 'Elite Shred 2.0', category: 'Cardio', level: 'Advanced', duration: '30m', tier: 'Gold' },
  { id: '3', title: 'Olympian Mobility', category: 'Mobility', level: 'Intermediate', duration: '20m', tier: 'Platinum' },
  { id: '4', title: 'Diamond Hypertrophy', category: 'Strength', level: 'Expert', duration: '60m', tier: 'Diamond' },
];

export default function Workouts({ user }: { user: any }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);

  const filtered = mockRoutines.filter(r => 
    (activeCategory === 'All' || r.category === activeCategory) &&
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canAccess = (tier: string) => {
    const weights: Record<string, number> = { 'Free': 0, 'Gold': 1, 'Platinum': 2, 'Diamond': 3 };
    return weights[user.tier] >= weights[tier];
  };

  if (selectedRoutine) {
    return (
      <div className="space-y-8">
        <button 
          onClick={() => setSelectedRoutine(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-black text-[10px]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </button>

        <div className="relative h-[250px] sm:h-[400px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-2xl">
          <img 
            src={`https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80`} 
            alt="Workout"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 right-4 sm:right-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full leading-none flex items-center shadow-lg">
                  {selectedRoutine.category}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full leading-none flex items-center backdrop-blur-md border border-white/10">
                   {selectedRoutine.level}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase italic tracking-tight text-white mb-2 leading-tight">{selectedRoutine.title}</h1>
              <div className="flex gap-4 text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> {selectedRoutine.duration}</span>
                <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> 12 EXERCISES</span>
              </div>
            </div>
            <button className="bg-white text-black h-14 w-14 sm:h-20 sm:w-20 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/40 active:scale-95 group/play self-end">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-black translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-extrabold uppercase italic tracking-tight text-white">Neural Protocol</h3>
            {[
              { name: 'Warmup Burpees', sets: 3, reps: '20', benefit: 'Cardiovascular priming and metabolic ignition.' },
              { name: 'Dumbbell Chest Press', sets: 4, reps: '12', benefit: 'Targeted pectoral hypertrophy and core stability.' },
              { name: 'Weighted Pullups', sets: 3, reps: 'FAILURE', benefit: 'Upper body pulling strength and lat development.' },
              { name: 'Romanian Deadlifts', sets: 4, reps: '10', benefit: 'Posterior chain loading and hamstring flexibility.' }
            ].map((ex, i) => (
              <div key={i} className="bg-[#0F0F12] border border-white/5 p-6 rounded-3xl group hover:bg-white/[0.02] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <span className="text-cyan-500/20 font-black text-3xl italic tracking-tighter">0{i+1}</span>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-white">{ex.name}</h4>
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Type: Hypertrophy</span>
                    </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="text-center w-12">
                       <div className="text-xl font-extrabold text-white">{ex.sets}</div>
                       <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Sets</div>
                     </div>
                     <div className="text-center w-12">
                       <div className="text-xl font-extrabold text-white">{ex.reps}</div>
                       <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Reps</div>
                     </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-xs text-slate-400 leading-relaxed italic">
                     <span className="text-cyan-400 font-black uppercase text-[10px] not-italic mr-2">Benefit:</span>
                     {ex.benefit}
                   </p>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 p-8 rounded-[2.5rem]">
              <h4 className="font-black uppercase tracking-widest text-[10px] italic mb-4 text-cyan-400">Tactical Guidance</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
                "Keep your eccentric controlled on the pullups. If you're missing reps, drop the help weight and focus on the squeeze."
              </p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                   <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white">AI Genesis-04</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest tracking-tighter">Neural Optimization</div>
                </div>
              </div>
            </div>
            
            <button className="btn-sleek-outline w-full px-6">
              Save To Repository
            </button>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">RELIABLE / PERFORMANCE / PROTOCOLS</h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase italic text-white leading-none">
            WORKOUT <span className="text-cyan-400">ENGINE</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search Protocols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F0F12] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white focus:border-cyan-500 outline-none transition-all"
            />
          </div>
          <button 
            disabled={user.tier === 'Free'}
            className="w-full md:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:shadow-cyan-500/20 transition-all disabled:opacity-50 shadow-xl"
          >
            {user.tier === 'Free' ? <Lock className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            Build Protocol
          </button>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
              activeCategory === cat 
                ? "bg-white text-black border-white" 
                : "bg-[#0F0F12] text-slate-500 border-white/5 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((routine, idx) => {
            const locked = !canAccess(routine.tier);
            return (
              <motion.div
                layout
                key={routine.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !locked && setSelectedRoutine(routine)}
                className={cn(
                  "flex flex-col bg-[#0F0F12] border rounded-[2.5rem] p-8 transition-all relative overflow-hidden group border-white/5",
                  locked ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-cyan-500/50 hover:bg-white/[0.02] transform-gpu hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/5"
                )}
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <Dumbbell className="w-8 h-8" />
                  </div>
                  {locked && (
                    <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {routine.tier} REQ.
                    </div>
                  )}
                </div>
                
                <div className="flex-1 mb-10">
                  <h3 className="text-3xl font-extrabold uppercase italic tracking-tighter leading-none mb-2 text-white">{routine.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                     <span>{routine.category}</span>
                     <span className="w-1 h-1 bg-white/20 rounded-full" />
                     <span className="text-cyan-400 leading-none">{routine.level}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-white/5">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-white">{routine.duration}</span>
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none">Timing</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    {locked ? <Lock className="w-4 h-4 text-slate-600" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {user.tier === 'Free' && (
        <div className="bg-gradient-to-br from-cyan-950 to-black border border-cyan-500/20 p-12 rounded-[3.5rem] relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-12 group shadow-3xl">
           <Zap className="absolute -right-20 -top-20 w-80 h-80 text-cyan-400/5 rotate-12" />
           <div className="relative z-10 flex-1">
             <div className="inline-block px-3 py-1 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">PLATINUM FEATURE</div>
             <h2 className="text-4xl lg:text-5xl font-extrabold uppercase italic tracking-tighter mb-4 leading-none text-white">
               NEURAL <br /> TRAINING <span className="text-cyan-400">ENGINE.</span>
             </h2>
             <p className="text-slate-400 text-sm font-medium max-w-md leading-relaxed">
               Stop guessing. Let our neuro-link engine craft high-precision protocols based on real-time biometric feedback.
             </p>
           </div>
           <button className="relative z-10 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl active:scale-95">
             Unlock Engine
           </button>
        </div>
      )}
    </div>
  );
}
