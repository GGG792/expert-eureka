export interface Script {
  id: string;
  name: string;
  code: string;
  category: string;
  rating: number;
  downloads: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  autoSave: boolean;
  editorFontSize: number;
  showLineNumbers: boolean;
}

export interface LogEntry {
  id: string;
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

export type Page = 'home' | 'editor' | 'scripts' | 'settings' | 'games' | 'about' | 'community' | 'downloads' | 'starred' | 'shortcuts' | 'help' | 'features' | 'telegram';
