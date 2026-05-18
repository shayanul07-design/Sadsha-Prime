import { motion } from 'motion/react';
import { 
  Plus, 
  Flame, 
  Clock, 
  Target, 
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Zap,
  Users,
  Droplets,
  MessageSquare,
  Calendar,
  History
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', calories: 2100 },
  { name: 'Tue', calories: 1800 },
  { name: 'Wed', calories: 2400 },
  { name: 'Thu', calories: 1600 },
  { name: 'Fri', calories: 2800 },
  { name: 'Sat', calories: 2200 },
  { name: 'Sun', calories: 1900 },
];

const workoutHistory = [
  { id: 1, type: 'HIIT Protocol 04', date: 'Yesterday', duration: '45 min', calories: 420, intensity: 'High' },
  { id: 2, type: 'Extreme hypertrophy', date: '3 days ago', duration: '60 min', calories: 580, intensity: 'Extreme' },
  { id: 3, type: 'Neural recovery', date: '5 days ago', duration: '30 min', calories: 150, intensity: 'Low' },
];

export default function Dashboard({ user }: { user: any }) {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">
            COMMAND CENTER / {user.tier.toUpperCase()} LEVEL
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase text-white leading-tight">
            READY FOR <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">WAR</span>, {user.name}?
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-[#0F0F12] p-4 rounded-3xl border border-white/5 flex items-center gap-4 group hover:border-cyan-500/50 transition-colors">
            <div className="bg-cyan-500/10 p-3 rounded-2xl group-hover:bg-cyan-500 transition-colors">
              <Flame className="w-6 h-6 text-cyan-400 group-hover:text-black" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{user.streak}</div>
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Day Streak</div>
            </div>
          </div>
          <button className="btn-sleek-primary px-8">
            <Plus className="w-5 h-5 mr-2 inline-block" />
            Log Session
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'CALORIES', value: '2,400', unit: 'kcal', icon: Activity, color: 'text-cyan-400' },
          { label: 'WORKOUTS', value: '12', unit: 'this month', icon: Award, color: 'text-blue-400' },
          { label: 'HYDRATION', value: '1,200', unit: 'ml today', icon: Droplets, color: 'text-cyan-400' },
          { label: 'WEIGHT', value: '78.2', unit: 'kg', icon: TrendingUp, color: 'text-emerald-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0F0F12] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.02] transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-500 text-[10px] font-black tracking-widest uppercase">{stat.label}</span>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white italic tracking-tight">{stat.value}</span>
              <span className="text-slate-500 text-[10px] font-bold uppercase">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 bg-[#0F0F12] border border-white/5 p-4 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase italic">Performance</h3>
            <select className="w-full sm:w-auto bg-black border border-white/10 rounded-xl text-[10px] font-black p-2 focus:border-cyan-500 outline-none uppercase tracking-widest text-slate-400">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={10} 
                  fontWeight={700}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f12', border: '1px solid #ffffff10', borderRadius: '16px' }}
                  itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#06b6d4" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorCal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 p-4 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
          <Zap className="absolute -top-12 -right-12 w-64 h-64 text-cyan-400/5 rotate-12" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-cyan-400 p-2 rounded-xl">
                <Target className="w-5 h-5 text-black" />
              </div>
              <span className="font-black uppercase tracking-widest text-[10px] text-cyan-400 italic">Sadsha Neuro-Link</span>
            </div>
            
            <h4 className="text-2xl font-black mb-4 leading-none uppercase italic text-white">Your Optimal Path: HIIT Session 04</h4>
            <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">
              Biometric analysis suggests peak recovery window. A 20-minute Sprint Finish is required to maintain metabolic velocity.
            </p>
            
            {user.tier === 'Free' ? (
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Upgrade for daily neuro-guidance</p>
                <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-cyan-500/20 transition-all">
                  Get Pro Feedback
                </button>
              </div>
            ) : (
              <button className="flex items-center justify-between w-full p-4 bg-white text-black rounded-2xl group-hover:bg-cyan-400 transition-colors">
                <span className="font-black uppercase tracking-widest text-[10px]">Start Tactical Session</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Workout History Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-cyan-400" />
            Neural History
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
            View All Logs
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workoutHistory.map((workout) => (
            <div key={workout.id} className="bg-[#0F0F12] border border-white/5 p-6 rounded-[2.5rem] hover:bg-white/[0.02] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                 <span className={cn(
                   "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em]",
                   workout.intensity === 'Extreme' ? "bg-red-500/10 text-red-500" :
                   workout.intensity === 'High' ? "bg-orange-500/10 text-orange-500" :
                   "bg-emerald-500/10 text-emerald-500"
                 )}>
                   {workout.intensity} LOAD
                 </span>
                 <span className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em]">{workout.date}</span>
              </div>
              <h4 className="text-xl font-bold text-white uppercase italic mb-6">{workout.type}</h4>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-sm font-bold text-slate-400 tracking-tighter">{workout.duration}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-sm font-bold text-slate-400 tracking-tighter">{workout.calories} kcal</span>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges & Daily Loop */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-3xl font-black uppercase italic tracking-tight">Active Challenges</h3>
          </div>
          <div className="space-y-6">
            {[
              { title: 'The Summer Shred', participants: '4.2k', progress: 65, daysLeft: 12, bg: 'from-orange-500/10' },
              { title: 'Morning Warriors 5AM', participants: '820', progress: 30, daysLeft: 5, bg: 'from-blue-500/10' }
            ].map(challenge => (
              <div key={challenge.title} className={cn("bg-gradient-to-r to-black border border-white/5 p-6 rounded-[32px] hover:border-white/20 transition-all cursor-pointer", challenge.bg)}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-black text-xl mb-1 uppercase italic">{challenge.title}</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">Global Event</span>
                    </div>
                  </div>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{challenge.daysLeft}d Left</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-black rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-display text-3xl font-black uppercase italic tracking-tight">Sadsha Rewards</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl flex flex-col items-center">
                 <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-orange-500" />
                 </div>
                 <div className="text-xl font-black">2,450</div>
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">XP Points</div>
              </div>
              <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl flex flex-col items-center">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                 </div>
                 <div className="text-xl font-black">Level 14</div>
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Global Rank</div>
              </div>
           </div>

           {user.tier === 'Free' && (
             <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-orange-500 transition-all">
                <div className="flex items-center gap-4">
                   <div className="bg-orange-500 p-2 rounded-xl group-hover:bg-black transition-colors">
                      <Plus className="w-5 h-5 text-black group-hover:text-white" />
                   </div>
                   <div>
                      <div className="font-black text-sm uppercase italic">Watch Rewarded Ad</div>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest group-hover:text-black">Unlock 1 Pro Workout</div>
                   </div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:text-black" />
             </div>
           )}

           <div className="bg-cyan-500 text-black p-6 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-xl shadow-cyan-500/20"
                onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'transformation' }))}
           >
              <div className="flex items-center gap-4">
                 <div className="bg-black p-2 rounded-xl">
                    <History className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <div className="font-black text-sm uppercase italic">Visual Evolution</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-none">Track Transformation</div>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5" />
           </div>

           <div className="bg-[#25D366] text-black p-6 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-xl shadow-[#25D366]/20">
              <a 
                 href="https://whatsapp.com/channel/0029Vb8KWmb0VycOcT5Kn71B" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-4 w-full"
              >
                 <div className="bg-black p-2 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <div className="font-black text-sm uppercase italic">Global Council</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-none">Join the WhatsApp Network</div>
                 </div>
                 <ChevronRight className="w-5 h-5 ml-auto" />
              </a>
           </div>

           <div className="bg-orange-500 text-black p-6 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
              <div className="flex items-center gap-4">
                 <div className="bg-black p-2 rounded-xl">
                    <Users className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <div className="font-black text-sm uppercase italic">Refer a Friend</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Get 1 Month Free</div>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5" />
           </div>
        </div>
      </section>
    </div>
  );
}
