"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    setResponse(`Gemini suggests: This is a sophisticated response to your query: "${input}". Gemini's multimodal power allows for deep contextual reasoning.`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    alert("Copied!");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#4a4035] selection:bg-[#d4a373] selection:text-white">
      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .hero-gradient { background: linear-gradient(135deg, #fdfbf7 0%, #f2efe9 100%); }
      `}</style>

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

      {/* Nav */}
      <nav className="sticky top-0 bg-[#fdfbf7]/90 backdrop-blur-lg border-b border-[#eaddcf] z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4a373] animate-spin-slow flex items-center justify-center font-bold text-lg text-white shadow-lg">G</div>
            <span className="font-bold text-2xl tracking-tight">Gemini<span className="text-[#d4a373]">Explorer</span></span>
          </div>
          <div className="flex gap-8 font-medium text-sm uppercase tracking-widest text-[#7a6d60]">
            <a href="#intro" className="hover:text-[#d4a373] transition">Intro</a>
            <a href="#features" className="hover:text-[#d4a373] transition">Features</a>
            <a href="#demo" className="hover:text-[#d4a373] transition">Interactive</a>
          </div>
        </div>
      </nav>
      
      {/* Hero */}
      <header className="hero-gradient py-24 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tighter"
        >
          Master the Art of <span className="text-[#d4a373]">Gemini</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-[#7a6d60] max-w-2xl mx-auto leading-relaxed"
        >
          Unlock the full potential of multimodal AI with precise prompting, advanced reasoning, and seamless integration.
        </motion.p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Intro */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="intro" 
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">What is Gemini?</h2>
            <p className="text-lg text-[#7a6d60] leading-relaxed">
              Gemini is Google&apos;s most capable AI model, built from the ground up to be multimodal. It understands text, code, audio, images, and video with unprecedented precision.
            </p>
          </div>
          <ImagePlaceholder className="h-64" />
        </motion.section>

        {/* Features */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="features"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Multimodal Power', 'Advanced Reasoning', 'Global Scaling'].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="p-8 bg-white rounded-3xl border border-[#eaddcf] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#fdfbf7] rounded-xl flex items-center justify-center mb-6 text-2xl">✨</div>
                <h3 className="text-xl font-bold mb-3">{f}</h3>
                <p className="text-[#7a6d60]">High-level capabilities enabling complex tasks and creative workflows.</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo */}
        <motion.div
          whileHover={{ rotateX: 2 }}
          style={{ perspective: 1000 }}
        >
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            id="demo" 
            className="bg-white p-12 rounded-3xl shadow-xl border border-[#eaddcf]"
          >
            <h2 className="text-4xl font-bold mb-8 text-[#d4a373]">Playable Session</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="w-full p-6 border-2 border-[#eaddcf] rounded-2xl bg-[#fdfbf7] text-[#4a4035] focus:border-[#d4a373] outline-none text-lg"
              />
              <button
                onClick={handlePrompt}
                className="px-8 py-4 bg-[#d4a373] text-white rounded-2xl font-bold hover:bg-[#c49363] transition shadow-lg"
              >
                Analyze Prompt
              </button>
              {response && (
                <div className="p-8 mt-6 bg-[#fdfbf7] rounded-2xl border border-[#eaddcf] flex justify-between items-start gap-4">
                  <p className="text-lg text-[#4a4035]">{response}</p>
                  <button onClick={copyToClipboard} className="shrink-0 text-[#d4a373] hover:underline font-bold text-sm uppercase tracking-widest">Copy</button>
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
