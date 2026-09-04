"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HamburgerMenu = ({ items }: { items: { label: string; href: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden p-2 z-[60] relative text-[#4a4035]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-6 h-0.5 bg-[#4a4035] transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'}`} />
        <div className={`w-6 h-0.5 bg-[#4a4035] transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`w-6 h-0.5 bg-[#4a4035] transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'}`} />
      </button>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#fdfbf7] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-2xl font-bold text-[#4a4035] hover:text-[#d4a373]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
