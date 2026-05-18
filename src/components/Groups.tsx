import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Plus, 
  Award, 
  Trophy, 
  MessageSquare, 
  Zap,
  Lock,
  ChevronRight,
  TrendingUp,
  MapPin,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockGroups = [
  { id: '1', name: 'India Iron Tribe', members: 1240, type: 'Open', region: 'India', activeChallenges: 2, icon: '🇮🇳' },
  { id: '2', name: 'Elite Diamond 1% ', members: 42, type: 'Diamond Only', region: 'Global', activeChallenges: 1, icon: '💎' },
  { id: '3', name: 'Bangalore Runners', members: 890, type: 'Open', region: 'South India', activeChallenges: 3, icon: '👟' },
  { id: '4', name: 'Muscle Mania Pro', members: 5400, type: 'Open', region: 'Global', activeChallenges: 5, icon: '🔥' },
];

export default function Groups({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'explore' | 'my-groups'>('explore');

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">SOCIAL / SYNERGY / COMPETITION</h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase italic text-white leading-none">
            IRON <span className="text-cyan-400">COUNCIL</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all active:scale-95 shadow-xl">
            <Plus className="w-4 h-4" />
            Create Tribe
          </button>
        </div>
      </header>

      <div className="flex border-b border-white/5 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('explore')}
          className={cn(
            "pb-4 px-4 sm:px-8 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap",
            activeTab === 'explore' ? "text-cyan-400" : "text-slate-500 hover:text-white"
          )}
        >
          Explore Tribes
          {activeTab === 'explore' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />}
        </button>
        <button 
          onClick={() => setActiveTab('my-groups')}
          className={cn(
            "pb-4 px-4 sm:px-8 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap",
            activeTab === 'my-groups' ? "text-cyan-400" : "text-slate-500 hover:text-white"
          )}
        >
          My Network
          {activeTab === 'my-groups' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Find your tribe..."
              className="w-full bg-[#0F0F12] border border-white/5 rounded-[2.5rem] py-6 pl-16 pr-8 text-sm font-bold focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockGroups.map((group) => {
              const diamondOnly = group.type === 'Diamond Only';
              const locked = diamondOnly && user.tier !== 'Diamond';
              
              return (
                <div 
                  key={group.id}
                  className={cn(
                    "flex flex-col bg-[#0F0F12] border rounded-[2.5rem] p-8 transition-all hover:bg-white/[0.02] group border-white/5 shadow-xl hover:shadow-cyan-500/5",
                    locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  )}
                >
                  <div className="flex justify-between items-start mb-12">
                    <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">{group.icon}</div>
                    {locked ? (
                      <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 border border-purple-500/30">
                        <Lock className="w-3 h-3" /> Diamond Plan
                      </div>
                    ) : (
                      <div className="bg-white/5 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/5">
                        {group.type}
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-3xl font-extrabold uppercase italic tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors text-white">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3 text-cyan-400" /> {group.members} Elite</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> {group.region}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <Zap className="w-4 h-4 text-cyan-400" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         {group.activeChallenges} Tactical Operations
                       </span>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-[#25D366] p-2 rounded-xl">
                   <MessageSquare className="w-5 h-5 text-white" />
                 </div>
                 <span className="font-black uppercase tracking-widest text-[10px] italic text-[#25D366]">Official Global Council</span>
               </div>
               <h4 className="text-3xl font-extrabold uppercase mb-2 leading-none italic text-white flex items-center gap-2">
                 SADSHA <span className="text-[#25D366]">WHATSAPP</span>
               </h4>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 leading-relaxed">
                 Connect with 150k+ athletes worldwide. Real-time motivation & strategy.
               </p>
               <a 
                 href="https://whatsapp.com/channel/0029Vb8KWmb0VycOcT5Kn71B" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full py-5 bg-[#25D366] text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-[#25D366]/20 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
               >
                  JOIN GLOBAL NETWORK <ChevronRight className="w-4 h-4" />
               </a>
             </div>
          </div>

          <div className="bg-white text-black p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
             <Trophy className="absolute -right-8 -bottom-8 w-40 h-40 text-black/5" />
             <h4 className="font-black uppercase tracking-widest text-[10px] italic mb-6 opacity-60">National Leaderboard</h4>
             <div className="space-y-6">
                {[
                  { name: 'Sameer K.', xp: '12,400', rank: 1 },
                  { name: 'Ananya R.', xp: '10,200', rank: 2 },
                  { name: 'Rohit M.', xp: '9,850', rank: 3 }
                ].map((pilot) => (
                  <div key={pilot.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <span className="font-black text-xl italic w-4 opacity-30">0{pilot.rank}</span>
                      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <span className="font-black text-sm uppercase tracking-tight">{pilot.name}</span>
                    </div>
                    <div className="text-right">
                       <div className="font-black text-xs italic text-cyan-600 uppercase">{pilot.xp} XP</div>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-4 border-2 border-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all">
               Full Rankings
             </button>
          </div>

          <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl"></div>
             <div className="flex items-center gap-2 mb-6">
               <Award className="w-5 h-5 text-cyan-400" />
               <span className="font-black uppercase tracking-widest text-[10px] italic text-slate-500">Active Operation</span>
             </div>
             <h4 className="text-3xl font-extrabold uppercase mb-2 leading-none italic text-white">
               THE MONSOON <br /> <span className="text-cyan-400">VALOR</span>
             </h4>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-6">
               30 Days • Daily protocols • +1500 XP
             </p>
             <button className="w-full py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-cyan-500/20 transition-all active:scale-95 shadow-xl">
                Join Operation
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
