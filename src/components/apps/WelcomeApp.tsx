"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomeApp() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col items-center justify-center text-center p-8 space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
          The Central App
        </h1>
        <p className="max-w-md mx-auto text-lg text-muted-foreground">
          A next-generation web OS experience. Run multiple apps, manage windows, and multitask like a pro.
        </p>
      </div>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
          Get Started <ArrowRight size={16} />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
          Documentation
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-8 w-full max-w-2xl">
        {[
           { title: "Fast", desc: "Built with Next.js 14" },
           { title: "Beautiful", desc: "Glassmorphism UI" },
           { title: "Dynamic", desc: "Framer Motion" }
        ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm"
            >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
            </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
