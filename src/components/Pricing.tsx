import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Zap, Rocket, Crown, Star, X, CreditCard, Smartphone, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const tiers = [
  {
    name: 'Gold',
    price: { 
      '1': 499, 
      '6': 2499, 
      '12': 3999 
    },
    emi: {
      '3': 1449,
      '6': 799,
      '12': 399
    },
    description: 'Perfect for beginners starting their journey.',
    features: [
      'Basic Workout Logging',
      'Archive Basics (Free Samples)',
      'Community Group Access',
      'AI Recommendation (Weekly)',
      'Basic Goal Setting'
    ],
    icon: Star,
    color: 'border-zinc-800'
  },
  {
    name: 'Platinum',
    price: { 
      '1': 1299, 
      '6': 5999, 
      '12': 9999 
    },
    emi: {
      '3': 3699,
      '6': 1999,
      '12': 999
    },
    description: 'Most Popular for serious transformations.',
    features: [
      'Everything in Gold',
      'Skin Forge Protocol',
      'Full Premium Library Access',
      'AI Form Feedback (Real-time)',
      'Smart Skincare Reminders',
      'Dermal Diet Optimization',
      'Group Challenges Access'
    ],
    mostPopular: true,
    icon: Rocket,
    color: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
  },
  {
    name: 'Diamond',
    price: { 
      '1': 4499, 
      '6': 19999, 
      '12': 34999 
    },
    emi: {
      '3': 12999,
      '6': 6999,
      '12': 3499
    },
    description: 'Luxury coaching for elite results.',
    features: [
      'Everything in Platinum',
      'Follicle Mastery (Hair Care)',
      'Elite Council Knowledge Archive',
      'VIP Personal Accountability',
      'WhatsApp/Telegram Support',
      'Diamond Partner Access (30% Rewards)',
      'Corporate Partner Discounts'
    ],
    icon: Crown,
    color: 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
  }
];

interface PricingProps {
  onUpgrade: (tier: string) => void;
}

export default function Pricing({ onUpgrade }: PricingProps) {
  const [duration, setDuration] = useState<'1' | '6' | '12'>('12');
  const [paymentMethod, setPaymentMethod] = useState<'upfront' | 'emi'>('upfront');
  const [emiMonths, setEmiMonths] = useState<'3' | '6' | '12'>('12');
  const [selectedTier, setSelectedTier] = useState<typeof tiers[0] | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'select' | 'processing'>('select');

  const handleCheckout = (tierName: string) => {
    const tier = tiers.find(t => t.name === tierName);
    if (tier) {
      setSelectedTier(tier);
      setShowCheckout(true);
    }
  };

  const confirmPayment = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      if (selectedTier) onUpgrade(selectedTier.name);
      setShowCheckout(false);
      setCheckoutStep('select');
    }, 2500);
  };

  const getPrice = () => {
    if (!selectedTier) return 0;
    return paymentMethod === 'upfront' 
      ? selectedTier.price[duration as keyof typeof selectedTier.price]
      : selectedTier.emi[emiMonths as keyof typeof selectedTier.emi];
  };

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white uppercase italic leading-tight">
          Forge Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Legend</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 font-medium px-4">
          Choose a plan that fits your ambition. Join 245,000+ athletes in the ultimate transformation.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex p-1 bg-[#0F0F12] rounded-2xl border border-white/5 shadow-2xl">
            <button
              onClick={() => setPaymentMethod('upfront')}
              className={cn(
                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                paymentMethod === 'upfront' ? "bg-white text-black" : "text-slate-500 hover:text-white"
              )}
            >
              Pay Upfront
            </button>
            <button
              onClick={() => setPaymentMethod('emi')}
              className={cn(
                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                paymentMethod === 'emi' ? "bg-white text-black underline decoration-cyan-500 decoration-2 underline-offset-4" : "text-slate-500 hover:text-white"
              )}
            >
              Easy Installments <span className="text-[8px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full">New</span>
            </button>
          </div>

          {paymentMethod === 'upfront' ? (
            <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-[#0F0F12] rounded-2xl w-fit mx-auto border border-white/5 shadow-2xl">
              {[
                { id: '1', label: '1 Month' },
                { id: '6', label: '6 Months', tag: 'Save 20%' },
                { id: '12', label: '12 Months', tag: 'Best Value' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDuration(opt.id as any)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
                    duration === opt.id ? "bg-white text-black" : "text-slate-500 hover:text-white"
                  )}
                >
                  {opt.label}
                  {opt.tag && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-black text-[8px] font-black rounded-full shadow-lg">
                      {opt.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-[#0F0F12] rounded-2xl w-fit mx-auto border border-white/5 shadow-2xl">
              {[
                { id: '3', label: '3 Months' },
                { id: '6', label: '6 Months' },
                { id: '12', label: '12 Months', tag: 'Most Affordable' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setEmiMonths(opt.id as any)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
                    emiMonths === opt.id ? "bg-white text-black" : "text-slate-500 hover:text-white"
                  )}
                >
                  {opt.label}
                  {opt.tag && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-black text-[8px] font-black rounded-full shadow-lg">
                      {opt.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "relative flex flex-col p-8 rounded-[2.5rem] bg-[#0F0F12] border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
              tier.mostPopular 
                ? "border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)] scale-105 z-10 bg-[#14141A]" 
                : "border-white/5"
            )}
          >
            {tier.mostPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-600 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <tier.icon className={cn("w-8 h-8", tier.name === 'Diamond' ? "text-purple-500" : tier.name === 'Platinum' ? "text-cyan-400" : "text-slate-100")} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight italic text-white">{tier.name}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{tier.description}</p>
            </div>

            <div className="mb-8">
              {paymentMethod === 'upfront' ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-6xl font-extrabold italic text-white">₹{tier.price[duration as keyof typeof tier.price].toLocaleString('en-IN')}</span>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">
                      / {duration === '1' ? 'month' : `${duration} months`}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Start today for just</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-6xl font-extrabold italic text-white">₹{tier.emi[emiMonths as keyof typeof tier.emi].toLocaleString('en-IN')}</span>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">
                      / month
                    </span>
                  </div>
                  <div className="mt-2 text-[8px] text-slate-500 font-bold uppercase tracking-widest">
                    Total Cost: ₹{(tier.emi[emiMonths as keyof typeof tier.emi] * parseInt(emiMonths)).toLocaleString('en-IN')} over {emiMonths} months
                  </div>
                </div>
              )}
              <p className="mt-2 text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                International Support Enabled
              </p>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 group">
                  <div className={cn(
                    "mt-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors",
                    tier.name === 'Diamond' ? "bg-purple-500/20 text-purple-400" : "bg-cyan-500/20 text-cyan-400"
                  )}>
                    ✓
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(tier.name)}
              className={cn(
                "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95",
                tier.mostPopular 
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40" 
                  : "border border-white/10 text-white hover:bg-white/5"
              )}
            >
              {paymentMethod === 'emi' ? `Start for ₹${tier.emi[emiMonths as keyof typeof tier.emi]}/mo` : (tier.name === 'Diamond' ? 'Prestige Access' : tier.mostPopular ? 'Go Pro Now' : 'Begin Journey')}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowCheckout(false)}
               className="absolute inset-0 bg-black/90 backdrop-blur-md"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-5xl bg-[#08080A] border border-white/10 rounded-[3rem] overflow-hidden shadow-3xl"
             >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                   {/* Left Panel: Plan Summary */}
                   <div className="p-8 lg:p-12 bg-white/[0.02] border-r border-white/5">
                      <div className="flex justify-between items-start mb-12">
                         <div>
                            <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 font-mono">Order Selection</h2>
                            <h3 className="text-3xl font-black uppercase italic text-white leading-none">Checkout <span className="text-cyan-400">Secure</span></h3>
                         </div>
                         <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                            <X className="w-6 h-6 text-slate-500" />
                         </button>
                      </div>

                      <div className="space-y-6">
                         <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                            <div className="flex items-center gap-4 mb-4">
                               <div className="p-3 bg-cyan-500/10 rounded-2xl">
                                  {selectedTier?.icon && <selectedTier.icon className="w-8 h-8 text-cyan-400" />}
                               </div>
                               <div>
                                  <div className="text-white font-black uppercase italic text-xl">{selectedTier?.name} Plan</div>
                                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{paymentMethod === 'upfront' ? `${duration} Months Subscription` : `EMI: ${emiMonths} Months`}</div>
                               </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                               <div className="text-slate-400 text-xs font-bold uppercase">Amount Payable</div>
                               <div className="text-2xl font-black text-white italic">₹{getPrice().toLocaleString('en-IN')}</div>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                               <ShieldCheck className="w-3 h-3 text-cyan-400" /> Secure Protocol Details
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                               {selectedTier?.features.slice(0, 4).map(f => (
                                 <div key={f} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                                    <span className="text-[10px] text-slate-400 font-medium">{f}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right Panel: Payment Methods */}
                   <div className="p-8 lg:p-12">
                      {checkoutStep === 'select' ? (
                        <>
                           <h4 className="text-xl font-black uppercase italic text-white mb-8">Select Payment Method</h4>
                           
                           {/* Indian Payments Section */}
                           <div className="mb-8">
                              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <Smartphone className="w-3 h-3 text-emerald-400" /> Indian Gateway (UPI/Netbanking)
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                 {['Google Pay', 'PhonePe', 'Paytm', 'UPI ID', 'RuPay Card', 'Net Banking'].map(method => (
                                   <button 
                                     key={method}
                                     onClick={confirmPayment}
                                     className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-400/50 transition-all text-left group"
                                   >
                                      <div className="text-[9px] font-black uppercase tracking-widest text-white group-hover:text-cyan-400">{method}</div>
                                      <div className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter">Instant Activation</div>
                                   </button>
                                 ))}
                              </div>
                           </div>

                           {/* International Payments Section */}
                           <div className="mb-10">
                              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <Globe className="w-3 h-3 text-cyan-400" /> International Gateway (Stripe/PayPal)
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 <button onClick={confirmPayment} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-400/50 transition-all group">
                                    <div className="flex items-center gap-3">
                                       <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                                       <div className="text-[9px] font-black uppercase tracking-widest text-white">Global Visa/Mastercard</div>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                 </button>
                                 <button onClick={confirmPayment} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-400/50 transition-all group">
                                    <div className="flex items-center gap-3">
                                       <Globe className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                                       <div className="text-[9px] font-black uppercase tracking-widest text-white">PayPal / Crypto</div>
                                    </div>
                                 </button>
                              </div>
                           </div>

                           <p className="text-[9px] text-slate-600 text-center uppercase font-bold tracking-widest">
                              By proceeding, you agree to the Sadsha Protocols & Terms of Service.
                           </p>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                           <div className="relative">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-cyan-400"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
                              </div>
                           </div>
                           <div>
                              <h4 className="text-2xl font-black uppercase italic text-white mb-2">Syncing Neural Connection</h4>
                              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Securing payment through global gateway...</p>
                           </div>
                        </div>
                      )}
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pricing Psychology Section */}
      <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
           <h3 className="text-2xl font-black uppercase italic text-white mb-6">Pricing Intelligence</h3>
           <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-cyan-400 font-black text-xs uppercase tracking-widest">Why Installments?</div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our installment logic allows you to access elite-tier protocols without the heavy upfront burden. While single payments offer the "Purest Value," installments prioritize your monthly cash flow efficiency.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-cyan-400 font-black text-xs uppercase tracking-widest">The Mathematics of Growth</div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Installment pricing includes a minor 10-15% "Convenience Vector" to support the decentralized financing infrastructure.
                </p>
              </div>
           </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <Zap className="absolute -top-12 -right-12 w-64 h-64 text-cyan-400/5 rotate-12" />
           <h3 className="text-2xl font-black uppercase italic text-white mb-6">SaaS Strategy Matrix</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-white font-black text-lg italic mb-1">20% ↑</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Conversion Uplift</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-white font-black text-lg italic mb-1">0%</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hidden Fees</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-white font-black text-lg italic mb-1">Secure</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Gateway</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-white font-black text-lg italic mb-1">Verified</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">PCI Compliant</div>
              </div>
           </div>
        </div>
      </div>
      <div className="mt-24 text-center p-12 bg-white/[0.02] rounded-[3rem] border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h2 className="text-3xl font-black tracking-tighter mb-4 italic uppercase text-white">
          Why <span className="text-cyan-400">Sadsha Prime</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'AI COACHING', desc: 'Personalized feedback powered by Gemini 3' },
            { label: 'GLOBAL NETWORK', desc: '150k+ Elite athletes across 40 countries' },
            { label: 'NEURAL LOOPS', desc: 'Addictive reward systems for consistency' },
            { label: 'ELITE ACCESS', desc: 'Direct logic from top-tier trainers' }
          ].map(item => (
            <div key={item.label} className="relative z-10">
              <div className="text-cyan-400 font-black mb-2 text-sm">{item.label}</div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-16 border-t border-white/5 relative z-10 flex flex-col items-center">
           <div className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-400 to-green-600 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 italic">EARN AS YOU SHRED</div>
           <h3 className="text-4xl font-extrabold uppercase italic tracking-tighter text-white mb-4">Become a Sadsha Ambassador</h3>
           <p className="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed text-sm">
             Promote Sadsha Prime to your network and <span className="text-white font-bold">earn up to 30% recurring commission</span> on every subscription. Join the elite partner council today.
           </p>
           <button className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl active:scale-95">
              Launch Partner Dashboard
           </button>
        </div>
      </div>
    </div>
  );
}
