"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

interface HamburgerMenuProps {
  items: NavItem[];
}

export const HamburgerMenu = ({ items }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModel, setActiveModel] = useState("Gemini 1.5 Pro");

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Framer Motion Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as const;

  const drawerVariants = {
    hidden: { x: "100%", transition: { type: "tween", duration: 0.3, ease: "easeInOut" } },
    visible: { x: 0, transition: { type: "spring", damping: 25, stiffness: 220 } },
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  } as const;

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="p-2.5 z-[60] relative rounded-xl hover:bg-[#eaddcf]/30 active:scale-95 transition-all focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-5 flex flex-col justify-between items-center relative">
          <span
            className={`w-6 h-0.5 bg-[#4a4035] rounded-full transition-all duration-300 transform origin-center ${
              isOpen ? "rotate-45 translate-y-[9px] bg-[#d4a373]" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#4a4035] rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#4a4035] rounded-full transition-all duration-300 transform origin-center ${
              isOpen ? "-rotate-45 -translate-y-[9px] bg-[#d4a373]" : ""
            }`}
          />
        </div>
      </button>

      {/* Slideout Side Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark/Blurred Backdrop overlay */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-[#4a4035]/30 backdrop-blur-md"
            />

            {/* Floating Drawer */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 h-full w-[340px] max-w-[85vw] z-50 bg-[#fdfbf7] border-l border-[#eaddcf]/60 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Brand Header */}
              <div className="p-6 border-b border-[#eaddcf]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#d4a373] flex items-center justify-center font-extrabold text-sm text-white shadow-md">
                  G
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-none text-[#4a4035]">
                    Gemini<span className="text-[#d4a373]">Explorer</span>
                  </span>
                  <span className="text-[10px] text-[#7a6d60] font-medium tracking-wider uppercase mt-0.5">
                    Multimodal Portal
                  </span>
                </div>
              </div>

              {/* Drawer Content Area */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-thin">
                
                {/* Model Selector Section */}
                <div className="bg-[#f2efe9] rounded-2xl p-4 border border-[#eaddcf]/50">
                  <label className="text-[10px] font-bold text-[#7a6d60] uppercase tracking-wider block mb-2">
                    Active Model Configuration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Gemini 1.5 Pro", "Gemini 1.5 Flash"].map((model) => (
                      <button
                        key={model}
                        onClick={() => setActiveModel(model)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                          activeModel === model
                            ? "bg-[#d4a373] text-white border-[#d4a373] shadow-sm"
                            : "bg-[#fdfbf7] text-[#4a4035] border-[#eaddcf]/80 hover:bg-white"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Navigation Links */}
                <div>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-1.5"
                  >
                    {items.map((item) => (
                      <motion.div key={item.label} variants={itemVariants}>
                        <a
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-[#d4a373]/10 text-[#4a4035] hover:text-[#d4a373] transition-all group duration-200"
                        >
                          <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                            {item.icon || "✨"}
                          </span>
                          <span className="font-semibold text-sm">
                            {item.label}
                          </span>
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Drawer Footer Status Area */}
              <div className="p-5 border-t border-[#eaddcf]/40 bg-[#fbf9f4] flex flex-col gap-6">
                {/* Download App CTA */}
                <button
                  className="w-full py-3.5 bg-[#1a1f2e] text-white rounded-2xl font-bold hover:bg-[#2d344a] transition-all duration-300 shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Download App
                </button>

                {/* Socials & Legal */}
                <div className="flex flex-col gap-4">
                  {/* Social Icons */}
                  <div className="flex justify-center gap-6 text-[12px] font-semibold text-[#7a6d60]">
                    <span className="hover:text-[#d4a373] cursor-pointer transition">Twitter</span>
                    <span className="hover:text-[#d4a373] cursor-pointer transition">Instagram</span>
                    <span className="hover:text-[#d4a373] cursor-pointer transition">LinkedIn</span>
                  </div>
                  {/* Legal Links */}
                  <div className="flex justify-center gap-4 text-[10px] text-[#7a6d60]">
                    <a href="#" className="hover:underline hover:text-[#d4a373] transition">Privacy Policy</a>
                    <span className="text-[#eaddcf]">|</span>
                    <a href="#" className="hover:underline hover:text-[#d4a373] transition">Terms of Service</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
