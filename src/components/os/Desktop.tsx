"use client";

import React from "react";
import { WindowProvider, useWindowManager } from "./WindowManager";
import WindowFrame from "./WindowFrame";
import Taskbar from "./Taskbar";
import WelcomeApp from "../apps/WelcomeApp";
import SettingsApp from "../apps/SettingsApp";
import ProjectsApp from "../apps/ProjectsApp";
import MusicApp from "../apps/MusicApp";

function DesktopContent() {
  const { windows } = useWindowManager();

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1614850523060-8da1d56e37def?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
      {/* Background Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Windows Layer */}
      <div className="relative h-full w-full z-10">
        <WindowFrame appId="welcome">
          <WelcomeApp />
        </WindowFrame>
        
        <WindowFrame appId="settings">
          <SettingsApp />
        </WindowFrame>

        <WindowFrame appId="projects">
            <ProjectsApp />
        </WindowFrame>

        <WindowFrame appId="music">
            <MusicApp />
        </WindowFrame>
      </div>

      {/* UI Layer */}
      <Taskbar />
    </div>
  );
}

export default function Desktop() {
  return (
    <WindowProvider>
      <DesktopContent />
    </WindowProvider>
  );
}
