"use client";

import React from "react";
import { motion } from "framer-motion";
import { AppId, useWindowManager } from "./WindowManager";
import { Home, Settings, FolderKanban, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const APPS = [
  { id: "welcome", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "music", label: "Music", icon: Music },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export default function Taskbar() {
  const { windows, openWindow, minimizeWindow, activeWindowId } = useWindowManager();

  const handleAppClick = (id: AppId) => {
    const appState = windows[id];
    if (appState.isOpen && !appState.isMinimized && activeWindowId === id) {
      minimizeWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-2xl shadow-2xl">
        {APPS.map((app) => {
          const isOpen = windows[app.id].isOpen;
          const isActive = activeWindowId === app.id && !windows[app.id].isMinimized;

          return (
            <div key={app.id} className="group relative flex flex-col items-center gap-1">
               {/* Tooltip */}
               <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs text-white border border-white/10 pointer-events-none">
                 {app.label}
               </span>

              <button
                onClick={() => handleAppClick(app.id)}
                className={cn(
                  "relative flex items-center justify-center rounded-xl p-3 transition-all duration-300 hover:scale-110 active:scale-95",
                  isActive ? "bg-white/10" : "hover:bg-white/5"
                )}
              >
                <app.icon 
                  size={24} 
                  className={cn(
                    "transition-colors", 
                    isActive ? "text-primary" : "text-white/80"
                  )} 
                />
                
                {/* Active Indicator Dot */}
                {isOpen && (
                    <motion.div 
                        layoutId="active-dot"
                        className="absolute -bottom-1 h-1 w-1 rounded-full bg-white" 
                    />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
