"use client";

import React from "react";

export default function SettingsApp() {
  return (
    <div className="h-full p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-4">
        <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Appearance</h3>
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5">
                <span>Dark Mode</span>
                <div className="h-6 w-10 rounded-full bg-primary relative cursor-pointer">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5">
                <span>Wallpaper</span>
                <span className="text-sm text-white/50">Abstract Waves</span>
            </div>
        </section>

        <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">System</h3>
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5">
                <span>Notifications</span>
                <div className="h-6 w-10 rounded-full bg-white/10 relative cursor-pointer">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white/50 shadow-sm" />
                </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5">
                <span>Sound</span>
                 <span className="text-sm text-white/50">100%</span>
            </div>
        </section>
      </div>
    </div>
  );
}
