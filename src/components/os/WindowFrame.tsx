"use client";

import React, { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square, Maximize } from "lucide-react";
import { useWindowManager, AppId } from "./WindowManager";
import { cn } from "@/lib/utils";

interface WindowFrameProps {
  appId: AppId;
  children: React.ReactNode;
}

export default function WindowFrame({ appId, children }: WindowFrameProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useWindowManager();
  const windowState = windows[appId];
  const constraintsRef = useRef(null);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const isActive = activeWindowId === appId;

  return (
    <motion.div
      drag={!windowState.isMaximized}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: windowState.isMaximized ? "100%" : "800px",
        height: windowState.isMaximized ? "100%" : "600px",
        x: windowState.isMaximized ? 0 : undefined,
        y: windowState.isMaximized ? 0 : undefined,
        top: windowState.isMaximized ? 0 : "10%",
        left: windowState.isMaximized ? 0 : "20%",
        position: windowState.isMaximized ? "fixed" : "absolute",
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{ zIndex: windowState.zIndex }}
      onMouseDown={() => focusWindow(appId)}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-colors",
        isActive ? "border-white/20 ring-1 ring-white/10" : "border-white/5 opacity-90",
        "bg-[#11111b]/80 backdrop-blur-xl" // Dark glass background
      )}
    >
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between bg-white/5 px-4 py-3 cursor-default"
        onDoubleClick={() => maximizeWindow(appId)}
      >
         <div className="flex items-center gap-2 group">
            {/* macOS-style buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(appId); }}
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] text-[#ff5f56] hover:text-black/50 transition-colors"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(appId); }}
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] text-[#ffbd2e] hover:text-black/50 transition-colors"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeWindow(appId); }}
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] text-[#27c93f] hover:text-black/50 transition-colors"
            >
               {windowState.isMaximized ? <Minus size={8} className="opacity-0 group-hover:opacity-100" /> : <Maximize size={8} className="opacity-0 group-hover:opacity-100" />}
            </button>
         </div>
         
         <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-white/70 pointer-events-none select-none">
            {windowState.title}
         </div>

         <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar relative">
        {/* Anti-interaction layer when not active to prevent capturing clicks inside iFrames or complex components if needed */}
        {!isActive && <div className="absolute inset-0 z-50 bg-transparent" />}
        {children}
      </div>
    </motion.div>
  );
}
