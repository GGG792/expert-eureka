import React from 'react';
import { useAppStore } from '@/store';
import {
  Code2,
  BookOpen,
  Cloud,
  Settings,
  Zap,
  FileCode,
  Info,
} from 'lucide-react';
import { Page } from '@/types';

const BottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useAppStore();

  const bottomNavItems: { page: Page; icon: React.ReactNode; label: string }[] = [
    { page: 'editor', icon: <Code2 size={24} />, label: '脚本管理' },
    { page: 'scripts', icon: <BookOpen size={24} />, label: '脚本库' },
    { page: 'home', icon: <Cloud size={24} />, label: '云端存储' },
    { page: 'settings', icon: <Settings size={24} />, label: '设置中心' },
    { page: 'home', icon: <Zap size={24} />, label: '社区中心' },
    { page: 'home', icon: <FileCode size={24} />, label: '快捷键' },
    { page: 'home', icon: <Info size={24} />, label: '关于我们' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-purple-500/30 md:hidden">
      <div className="flex items-center justify-around py-2">
        {bottomNavItems.slice(0, 5).map((item) => (
          <button
            key={item.page + item.label}
            onClick={() => setCurrentPage(item.page)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
              currentPage === item.page
                ? 'text-purple-400 bg-purple-600/20'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
