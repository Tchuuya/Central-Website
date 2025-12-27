"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppId = "welcome" | "settings" | "projects" | "music";

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowContextType {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const initialWindows: Record<AppId, WindowState> = {
  welcome: { id: "welcome", title: "Welcome", isOpen: true, isMinimized: false, isMaximized: false, zIndex: 1 },
  settings: { id: "settings", title: "Settings", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  projects: { id: "projects", title: "Projects", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  music: { id: "music", title: "Music", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>("welcome");
  const [maxZIndex, setMaxZIndex] = useState(10);

  const focusWindow = (id: AppId) => {
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1, isMinimized: false },
    }));
    setMaxZIndex((prev) => prev + 1);
  };

  const openWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 },
    }));
    setActiveWindowId(id);
    setMaxZIndex((prev) => prev + 1);
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
    focusWindow(id);
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error("useWindowManager must be used within a WindowProvider");
  }
  return context;
}
