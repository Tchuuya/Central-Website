"use client";
import React from "react";

export default function MusicApp() {
    return (
        <div className="p-6 h-full flex flex-col items-center justify-center space-y-4">
             <div className="w-48 h-48 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-2xl" />
             <div className="text-center">
                 <h3 className="text-xl font-bold">Midnight City</h3>
                 <p className="text-white/50">M83</p>
             </div>
             
             <div className="flex gap-4 items-center pt-4">
                 <div className="w-8 h-8 rounded-full bg-white/10" />
                 <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">▶</div>
                 <div className="w-8 h-8 rounded-full bg-white/10" />
             </div>
        </div>
    )
}
