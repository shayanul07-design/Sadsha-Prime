import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Zap, User, Bot, Loader2, Target, Lock } from 'lucide-react';
import { getAICoaching } from '../services/api';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

export default function CoachAI({ user }: { user: any }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([
    { role: 'model', parts: [{ text: `Identity confirmed. Welcome back, ${user.name}. I am AI Sadsha-04. Ready to optimize your protocols?` }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: 'Bulking Logic', query: 'Give me a hyper-efficient bulking protocol for a skinny-fat physique.' },
    { label: 'PCOS Weight Loss', query: 'Synthesize a fat loss strategy for someone with PCOS. Focus on insulin sensitivity.' },
    { label: 'Home Workout', query: 'Optimize a full-body home workout with zero equipment. Focus on metabolic stress.' },
    { label: 'Form Check', query: 'What are the common 3 errors in barbell back squats that kill progress?' },
    { label: 'Neural Recovery', query: 'Explain the 3 layers of neural recovery for elite athletes.' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customQuery?: string) => {
    const userMessage = customQuery || input.trim();
    if (!userMessage || isLoading) return;

    if (!customQuery) setInput('');
    
    const newMessages = [...messages, { role: 'user', parts: [{ text: userMessage }] }] as any;
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await getAICoaching(newMessages, user);
      if (response.error) {
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Neural link interrupted. Re-establishing connection... [Error: " + response.error + "]" }] } as any]);
      } else {
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: response.text }] } as any]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "System Error: " + (err as Error).message }] } as any]);
    } finally {
      setIsLoading(false);
    }
  };

  if (user.tier === 'Free') {
    return (
      <div className="flex flex-col h-full bg-[#0F0F12] rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 overflow-hidden shadow-3xl items-center justify-center p-8 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 max-w-sm space-y-8">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center mx-auto shadow-2xl relative group">
             <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
             <Lock className="w-10 h-10 text-cyan-400 relative z-10" />
          </div>
          
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">Neural Link <span className="text-cyan-400">Locked</span></h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
              AI SADSHA-04 requires high-bandwidth neural processing. Access to the coach is reserved for <span className="text-white font-bold italic">Gold, Platinum, and Diamond</span> tiers.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'pricing' }))}
              className="w-full py-5 bg-cyan-400 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-cyan-400/20 active:scale-95"
            >
              Upgrade for AI Protocols
            </button>
            <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em]">Unlock Research-Backed Intelligence</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0F0F12] rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 overflow-hidden shadow-3xl">
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
             <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h3 className="font-extrabold uppercase tracking-widest text-xs italic leading-none text-white">AI SADSHA-04</h3>
            <span className="text-[8px] text-cyan-400 font-black uppercase tracking-[0.2em]">Neural Path Optimization</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[8px] font-black text-cyan-400 uppercase tracking-widest">
             {user.tier} ACCESS
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/5 via-transparent to-transparent"
      >
        {messages.length === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleSend(action.query)}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-left hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all group"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">{action.label}</div>
                <div className="text-[10px] text-slate-500 line-clamp-1 group-hover:text-slate-300">Run Protocol...</div>
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[90%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg",
                msg.role === 'user' ? "bg-white" : "bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-black" /> : <Bot className="w-4 h-4 text-cyan-400" />}
              </div>
              <div className={cn(
                "p-5 rounded-[1.5rem] text-sm leading-relaxed mb-1 shadow-xl",
                msg.role === 'user' 
                  ? "bg-white text-black font-semibold rounded-tr-none" 
                  : "bg-slate-800/50 backdrop-blur-md text-slate-100 border border-white/10 rounded-tl-none markdown-container"
              )}>
                <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 rounded-tl-none">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-white/[0.02] border-t border-white/10">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query protocols, diet logic, or tactical data..."
            className="w-full bg-[#08080A] border border-white/5 rounded-2xl py-5 pl-7 pr-16 text-xs font-medium focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 text-white shadow-inner"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-50 active:scale-95 shadow-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[9px] text-slate-500 flex items-center gap-2 px-1 font-black uppercase tracking-[0.2em]">
             <Target className="w-3 h-3 text-cyan-400" />
             Access Protocol: {user.tier} Intelligence Level
          </p>
          {user.tier === 'Free' && (
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'pricing' }))}
              className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest hover:underline"
            >
              Upgrade for Platinum AI Protocols
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
