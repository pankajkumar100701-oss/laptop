"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenu } from "../components/HamburgerMenu";

const navItems = [
  { label: 'How it Works', href: '#how-it-works', icon: '⚙️' },
  { label: 'FAQ', href: '#faq', icon: '❓' },
  { label: 'Who is it for?', href: '#target', icon: '👥' },
  { label: 'Founder Letter', href: '#founder', icon: '✉️' },
  { label: 'Pricing', href: '#pricing', icon: '💎' },
  { label: 'Blog', href: '#blog', icon: '📝' },
];

const ImagePlaceholder = ({ className }: { className?: string }) => (
  <div className={`bg-[#fdfbf7] border-4 border-[#d4a373] rounded-3xl flex items-center justify-center text-[#d4a373] shadow-2xl relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-[#d4a373]/10" />
    <span className="text-6xl z-10">✨</span>
    <span className="absolute bottom-4 text-xs font-bold uppercase tracking-widest text-[#d4a373]/70">Visualizing AI</span>
  </div>
);

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (showOverlay && window.scrollY > 100) {
        setShowOverlay(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOverlay]);

  const handlePrompt = () => {
    if (!input.trim()) {
      setResponse("Please type an input first to let Gemini process the multi-modal parameters!");
      return;
    }
    setResponse(`Gemini suggests: This is a sophisticated response to your query: "${input}". Gemini's multimodal power allows for deep contextual reasoning, integrating language semantics, image pixels, and audio waveforms in a single unified flow.`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#4a4035] selection:bg-[#d4a373] selection:text-white">
      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .hero-gradient { background: linear-gradient(135deg, #fdfbf7 0%, #f2efe9 100%); }
      `}</style>

      {/* Screen Loader Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[#fdfbf7] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-32 h-32 rounded-3xl bg-[#d4a373] flex items-center justify-center font-bold text-5xl text-white shadow-2xl"
            >
              G
            </motion.div>
            <p className="mt-8 text-[#7a6d60] font-medium animate-pulse">Scroll to explore</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#fdfbf7]/80 backdrop-blur-md border-b border-[#eaddcf]/50 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4a373] animate-spin-slow flex items-center justify-center font-bold text-lg text-white shadow-lg">G</div>
            <span className="font-bold text-xl md:text-2xl tracking-tight">Gemini<span className="text-[#d4a373]">Explorer</span></span>
          </div>
          
          {/* Right-aligned Navigation Controls */}
          <div className="flex items-center gap-6">
            {/* Desktop-only Nav Links */}
            <div className="hidden lg:flex gap-6 font-medium text-xs uppercase tracking-wider text-[#7a6d60]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative flex items-center gap-1.5 hover:text-[#d4a373] transition duration-200"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4a373] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Separator Line (Only visible on Desktop to distinguish standard links from the full menu drawer) */}
            <span className="hidden lg:block w-px h-6 bg-[#eaddcf]/80" />

            {/* Hamburger Menu (Always visible on mobile & desktop) */}
            <HamburgerMenu items={navItems} />
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="hero-gradient pt-28 pb-16 md:pt-36 md:py-24 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tighter"
        >
          Master the Art of <span className="text-[#d4a373]">Gemini</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-[#7a6d60] max-w-2xl mx-auto leading-relaxed"
        >
          Unlock the full potential of multimodal AI with precise prompting, advanced reasoning, and seamless integration.
        </motion.p>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-28">
        
        {/* Intro Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="intro" 
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Gemini?</h2>
            <p className="text-base md:text-lg text-[#7a6d60] leading-relaxed">
              Gemini is Google&apos;s most capable AI model, built from the ground up to be multimodal. It understands text, code, audio, images, and video with unprecedented precision.
            </p>
          </div>
          <ImagePlaceholder className="h-64" />
        </motion.section>

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="features"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Multimodal Power', desc: 'Seamlessly connects visuals, sound, code syntax, and raw language natively in one run.', icon: '✨' },
              { title: 'Advanced Reasoning', desc: 'Solves heavy logical problems, complex math equations, and systems-level debugging with ease.', icon: '🧠' },
              { title: 'Global Scaling', desc: 'Deploy across edge devices or massive hyper-scale environments with optimal latency control.', icon: '🌐' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="p-6 md:p-8 bg-white rounded-3xl border border-[#eaddcf] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#fdfbf7] rounded-xl flex items-center justify-center mb-6 text-2xl border border-[#eaddcf]/40 shadow-sm">{f.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-sm md:text-base text-[#7a6d60] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Models Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="models"
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Model</h2>
            <p className="text-sm md:text-base text-[#7a6d60]">
              Gemini is engineered to run optimally across a wide spectrum of devices, from mobile integration to hyperscale cloud processing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Gemini 1.5 Ultra',
                badge: 'Ultimate Power',
                desc: 'Our largest and most capable model for highly complex reasoning, logical deduction, and system orchestration tasks.',
                token: '2M+ context',
                speed: 'Standard',
                icon: '🌌',
                color: 'from-purple-500/5 to-indigo-500/5 border-purple-200/60'
              },
              {
                name: 'Gemini 1.5 Pro',
                badge: 'Most Popular',
                desc: 'The optimal balance of intelligence, latency, and context depth. Ideal for coding assistance and translation.',
                token: '1M context',
                speed: 'Fast',
                icon: '🌟',
                color: 'from-amber-500/5 to-orange-500/5 border-[#d4a373]/40 shadow-md'
              },
              {
                name: 'Gemini 1.5 Flash',
                badge: 'Blazing Speed',
                desc: 'Highly lightweight and cost-efficient. Tailored for high-frequency, low-latency, and real-time streaming pipelines.',
                token: '1M context',
                speed: 'Instantaneous',
                icon: '⚡',
                color: 'from-teal-500/5 to-emerald-500/5 border-emerald-200/60'
              }
            ].map((model, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-8 bg-gradient-to-br ${model.color} bg-white rounded-3xl border flex flex-col justify-between h-full transition-all duration-300`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl">{model.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[#7a6d60] shadow-sm">
                      {model.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{model.name}</h3>
                  <p className="text-xs md:text-sm text-[#7a6d60] leading-relaxed mb-6">{model.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#eaddcf]/40 flex justify-between text-xs font-semibold text-[#4a4035]/80">
                  <span>Capacity: <span className="text-[#d4a373]">{model.token}</span></span>
                  <span>Speed: <span className="text-[#d4a373]">{model.speed}</span></span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo Section (Playground) */}
        <motion.div
          whileHover={{ rotateX: 1 }}
          style={{ perspective: 1000 }}
        >
          <motion.section 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            id="demo" 
            className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-[#eaddcf]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#d4a373]">Playable Session</h2>
                <p className="text-xs md:text-sm text-[#7a6d60] mt-1">Simulate live responses from Gemini Multimodal APIs.</p>
              </div>
              <span className="self-start md:self-center text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 uppercase tracking-widest">
                API Sandbox Active
              </span>
            </div>
            
            <div className="space-y-6">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gemini to translate, write code, or reason about data..."
                className="w-full p-4 md:p-6 border-2 border-[#eaddcf] rounded-2xl bg-[#fdfbf7] text-[#4a4035] focus:border-[#d4a373] outline-none text-base md:text-lg transition"
              />
              <button
                onClick={handlePrompt}
                className="w-full md:w-auto px-8 py-4 bg-[#d4a373] text-white rounded-2xl font-bold hover:bg-[#c49363] active:scale-98 transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>⚡</span> Analyze Prompt with Gemini
              </button>
              {response && (
                <div className="p-6 md:p-8 mt-6 bg-[#fdfbf7] rounded-2xl border border-[#eaddcf] flex flex-col md:flex-row justify-between items-start gap-4 shadow-inner">
                  <p className="text-base md:text-lg text-[#4a4035] leading-relaxed flex-1">{response}</p>
                  <button onClick={copyToClipboard} className="shrink-0 text-[#d4a373] hover:text-[#c49363] font-bold text-sm uppercase tracking-widest border border-[#d4a373]/30 px-3 py-1.5 rounded-xl hover:bg-[#d4a373]/5 transition">
                    Copy
                  </button>
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>

        {/* Pricing Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="pricing"
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Pricing</h2>
            <p className="text-sm md:text-base text-[#7a6d60]">
              Start building for free or scale your operations with premium multimodal keys.
            </p>
            
            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-[#f2efe9] p-1.5 rounded-2xl border border-[#eaddcf]/50 mt-6">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-[#4a4035]' : 'text-[#7a6d60]'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-[#4a4035]' : 'text-[#7a6d60]'}`}
              >
                Annually <span className="text-[10px] text-[#d4a373] font-extrabold ml-1">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: 'Starter',
                price: '$0',
                period: '/ month',
                desc: 'Perfect for learning, hobby development, and prototyping conversational ideas.',
                features: ['15 Requests Per Minute', 'Standard Gemini 1.5 Flash keys', 'Web-based sandbox playground', 'Community assistance channel'],
                cta: 'Get API Key',
                popular: false,
              },
              {
                title: 'Developer Pro',
                price: billingCycle === 'monthly' ? '$29' : '$23',
                period: '/ month',
                desc: 'Engineered for growing digital apps and developers demanding high query reliability.',
                features: ['360 Requests Per Minute', 'Gemini 1.5 Pro & Flash access', 'Priority API SLA uptime', 'Email customer support response'],
                cta: 'Upgrade to Pro',
                popular: true,
              },
              {
                title: 'Custom Enterprise',
                price: 'Custom',
                period: '',
                desc: 'Tailored for enterprise organizations needing compliance, dedicated host nodes, and custom fine-tuning.',
                features: ['Unlimited custom throughput', 'Fine-tune model adapters', 'Dedicated security auditor', '24/7 technical hotline access'],
                cta: 'Contact Sales',
                popular: false,
              }
            ].map((plan, idx) => (
              <div 
                key={idx}
                className={`p-8 bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  plan.popular 
                    ? 'border-[#d4a373] shadow-xl relative md:scale-105 z-10' 
                    : 'border-[#eaddcf]/60 shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#d4a373] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    Recommended
                  </span>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#4a4035] mb-2">{plan.title}</h3>
                  <p className="text-xs text-[#7a6d60] mb-6 leading-relaxed">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-[#4a4035]">{plan.price}</span>
                    <span className="text-xs text-[#7a6d60] font-medium">{plan.period}</span>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-xs text-[#7a6d60]">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#d4a373] text-white hover:bg-[#c49363] shadow-lg'
                      : 'bg-[#f2efe9] text-[#4a4035] hover:bg-[#eaddcf]'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          id="faq"
          className="max-w-3xl mx-auto space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-sm md:text-base text-[#7a6d60]">
              Quick answers to the questions developers ask most.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is a multimodal AI model?',
                a: 'A multimodal AI model is trained from the ground up to recognize, process, and correlate different information modalities simultaneously, including written text, images, video recordings, codebase syntax, and audio waveforms.'
              },
              {
                q: 'How does Gemini compare to earlier models?',
                a: 'Unlike models that stitch separate systems together for vision and language, Gemini is natively multimodal, leading to superior logic deduction across multiple input types and drastically increased context window capacities.'
              },
              {
                q: 'What is the maximum context length of Gemini models?',
                a: 'Gemini 1.5 Pro features an industry-leading context window capable of ingestion of up to 2 million tokens of source data in real time, equivalent to hours of video, massive audio logs, or hundreds of thousands of lines of code.'
              },
              {
                q: 'Are custom fine-tuning services available?',
                a: 'Yes, through our Custom Enterprise plan, clients can fine-tune adapter weights directly on their proprietary datasets in fully isolated, private cloud environments with guaranteed safety guardrails.'
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#eaddcf]/60 rounded-2xl overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center font-bold text-sm md:text-base text-[#4a4035] hover:bg-[#fbf9f4]/50 transition"
                >
                  <span>{faq.q}</span>
                  <span className={`text-[#d4a373] text-sm transform transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-[#eaddcf]/30"
                    >
                      <div className="p-6 text-xs md:text-sm text-[#7a6d60] leading-relaxed bg-[#fdfbf7]/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Modern Footer */}
      <footer className="border-t border-[#eaddcf]/60 bg-[#fdfbf7] py-12 px-6 mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#d4a373] flex items-center justify-center font-bold text-sm text-white">G</div>
            <span className="font-bold text-lg tracking-tight">Gemini<span className="text-[#d4a373]">Explorer</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#7a6d60]">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#d4a373] transition duration-150">{item.label}</a>
            ))}
          </div>
          <p className="text-xs text-[#7a6d60]/70">© 2026 Gemini Explorer. Built for deep modal reasoning.</p>
        </div>
      </footer>
    </div>
  );
}
