import { create } from 'zustand';
import { Script, UserSettings, LogEntry, Page } from '@/types';
import { mockScripts } from '@/data/mockScripts';

interface AppState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  
  scripts: Script[];
  currentScript: Script | null;
  setCurrentScript: (script: Script | null) => void;
  addScript: (script: Script) => void;
  updateScript: (id: string, updates: Partial<Script>) => void;
  
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  
  logs: LogEntry[];
  addLog: (message: string, level: LogEntry['level']) => void;
  clearLogs: () => void;
  
  performance: {
    cpu: number;
    memory: number;
    network: number;
    uptime: number;
  };
  updatePerformance: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  scripts: mockScripts,
  currentScript: null,
  setCurrentScript: (script) => set({ currentScript: script }),
  addScript: (script) => set((state) => ({ scripts: [...state.scripts, script] })),
  updateScript: (id, updates) => set((state) => ({
    scripts: state.scripts.map(s => s.id === id ? { ...s, ...updates } : s),
  })),
  
  settings: {
    theme: 'dark',
    autoSave: true,
    editorFontSize: 14,
    showLineNumbers: true,
  },
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates },
  })),
  
  logs: [],
  addLog: (message, level) => set((state) => ({
    logs: [...state.logs, {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      level,
      timestamp: new Date(),
    }].slice(-100),
  })),
  clearLogs: () => set({ logs: [] }),
  
  performance: {
    cpu: 23,
    memory: 62,
    network: 18,
    uptime: 12345,
  },
  updatePerformance: () => set((state) => ({
    performance: {
      cpu: Math.floor(Math.random() * 30) + 15,
      memory: Math.floor(Math.random() * 40) + 40,
      network: Math.floor(Math.random() * 30) + 10,
      uptime: state.performance.uptime + 1,
    },
  })),
}));
