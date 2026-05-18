import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  Star, 
  Clock, 
  Zap,
  Bookmark,
  Share2,
  Trophy,
  Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  tier: 'Free' | 'Gold' | 'Platinum' | 'Diamond';
  description: string;
  readTime: string;
  chapters: number;
  rating: number;
  image: string;
}

const BOOKS: Book[] = [
  {
    id: 'muscle-science-01',
    title: 'Hypertrophy Mechanics',
    author: 'Dr. Aris Vane',
    category: 'Workout Science',
    tier: 'Platinum',
    description: 'The definitive guide to muscle fiber recruitment and mechanical tension optimization.',
    readTime: '12 min summary',
    chapters: 8,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80'
  },
  {
    id: 'nutrition-deep-dive',
    title: 'Anabolic Kitchen',
    author: 'Chef Marcus',
    category: 'Nutrition',
    tier: 'Platinum',
    description: 'Bite-sized nutritional strategies for maximal recovery and lean mass retention.',
    readTime: '8 min summary',
    chapters: 12,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80'
  },
  {
    id: 'discipline-manual',
    title: 'The Stoic Athlete',
    author: 'Leonidas Gray',
    category: 'Motivation',
    tier: 'Gold',
    description: 'Building an unbreakable mind through ancient philosophy and modern training.',
    readTime: '15 min summary',
    chapters: 6,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400&q=80'
  },
  {
    id: 'biohacking-diamond',
    title: 'Neural Recovery Protocols',
    author: 'SADSHA Elite Council',
    category: 'Elite Science',
    tier: 'Diamond',
    description: 'Advanced sleep/stress optimization for 1% performers. Using tech to recover faster.',
    readTime: '20 min guide',
    chapters: 15,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'
  },
  {
    id: 'beginner-basics',
    title: 'Genesis Foundations',
    author: 'Coach Shayan',
    category: 'Workout Science',
    tier: 'Free',
    description: 'The first steps into the SADSHA ecosystem. Form, breathing, and basic loading.',
    readTime: '5 min summary',
    chapters: 3,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'
  }
];

export default function Library({ user }: { user: any }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Workout Science', 'Nutrition', 'Motivation', 'Elite Science', 'Lifestyle'];

  const getTierPriority = (tier: string) => {
    switch(tier) {
      case 'Free': return 0;
      case 'Gold': return 1;
      case 'Platinum': return 2;
      case 'Diamond': return 3;
      default: return 0;
    }
  };

  const userTierPriority = getTierPriority(user.tier);

  const filteredBooks = BOOKS.filter(book => {
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-slate-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono text-cyan-400">
            KNOWLEDGE / POWER / ARCHIVE
          </h2>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase italic text-white leading-none">
            THOUGHT <span className="text-cyan-400">ENGINE</span>
          </h1>
        </div>
        <div className="relative group w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search the archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F0F12] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700 font-bold uppercase tracking-widest"
          />
        </div>
      </header>

      {/* Daily Wisdom Card */}
      <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center gap-8">
        <div className="w-20 h-20 rounded-2xl bg-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <Lightbulb className="w-10 h-10 text-black fill-black" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Daily Fitness Wisdom</span>
            <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Protocol 04-B</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white uppercase italic tracking-tight mb-2">Muscle Memory & Neural Loading</h3>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
            Did you know? Consistency in lifting tempo increases neural drive by 12% in the first 4 weeks, effectively "teaching" your nervous system how to produce force.
          </p>
        </div>
        <button className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all active:scale-95 shadow-xl">
          Learn More
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
              activeCategory === cat ? "bg-cyan-400 text-black" : "text-slate-500 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.map((book, idx) => {
          const isLocked = getTierPriority(book.tier) > userTierPriority;
          
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-[#0F0F12] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                     {book.category}
                   </span>
                </div>
                {isLocked && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Lock className="w-8 h-8 text-cyan-400 mb-2" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{book.tier} Access Required</span>
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-extrabold uppercase italic tracking-tighter text-white group-hover:text-cyan-400 transition-colors leading-none">
                    {book.title}
                  </h3>
                </div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  By {book.author}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-8 flex-1">
                  {book.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                   <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                         <Clock className="w-3 h-3 text-cyan-500" />
                         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{book.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                         <BookOpen className="w-3 h-3 text-cyan-500" />
                         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{book.chapters} Chapters</span>
                      </div>
                   </div>
                   <button 
                     disabled={isLocked}
                     className={cn(
                       "flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                       isLocked 
                         ? "bg-white/5 text-slate-700 cursor-not-allowed" 
                         : "bg-white text-black hover:bg-cyan-400 active:scale-95"
                     )}
                   >
                     {isLocked ? 'Locked' : 'Read Now'} <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade Call to Action if user is not Diamond */}
      {user.tier !== 'Diamond' && (
        <div className="mt-12 bg-white text-black p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
           <Zap className="absolute -left-12 -bottom-12 w-64 h-64 text-black/5" />
           <div className="flex-1 relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter mb-4">Unlock Premium Secrets</h2>
              <p className="text-black/60 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xl">
                Read what most gym-goers never learn. Access our complete library of expert strategies, biohacking manuals, and transformation psychology.
              </p>
           </div>
           <button 
             onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'pricing' }))}
             className="bg-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shrink-0"
           >
             Upgrade to Continue Reading
           </button>
        </div>
      )}

      {/* Reading Progress / Gamification Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-8">
           <div className="w-32 h-32 rounded-full border-[10px] border-white/5 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[10px] border-cyan-400 border-t-transparent -rotate-45"></div>
              <div className="text-center">
                <div className="text-3xl font-black italic text-white leading-none">64%</div>
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Mastery</div>
              </div>
           </div>
           <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-black uppercase italic text-white mb-2">Knowledge Streak: 7 Days</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                You've completed 4 books this month. Finish 2 more to earn the "Archive Master" badge and 500 bonus XP.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                 <div className="text-center">
                   <div className="text-xl font-bold italic text-white">420</div>
                   <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Pages Read</div>
                 </div>
                 <div className="text-center">
                   <div className="text-xl font-bold italic text-white">18</div>
                   <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Highlights</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
           <Bookmark className="absolute -top-6 -right-6 w-32 h-32 text-cyan-400/5 rotate-12" />
           <div className="relative z-10">
              <h4 className="text-2xl font-black uppercase italic text-white mb-6">Saved Highlights</h4>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 border border-white/5 rounded-2xl italic text-xs text-slate-300 relative group-hover:bg-white/10 transition-all">
                   "Progress isn't just about weight on the bar; it's about neural efficiency per gram of lean mass."
                   <div className="mt-2 text-[8px] text-cyan-400 font-black uppercase">Hypertrophy Mechanics</div>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/5 rounded-2xl italic text-xs text-slate-300 relative group-hover:bg-white/10 transition-all">
                   "The mind breaks before the muscle. Train the mind to ignore the first three signals of fatigue."
                   <div className="mt-2 text-[8px] text-cyan-400 font-black uppercase">The Stoic Athlete</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
