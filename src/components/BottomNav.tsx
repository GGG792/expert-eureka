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
  MessageCircle,
  Star,
  Download,
  Users,
  Gamepad2,
  HelpCircle,
  Github,
  ExternalLink,
} from 'lucide-react';
import { Page } from '@/types';

const BottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useAppStore();

  const bottomNavItems: { page: Page; icon: React.ReactNode; label: string; href?: string }[] = [
    { page: 'editor', icon: <Code2 size={24} />, label: '编辑器' },
    { page: 'scripts', icon: <BookOpen size={24} />, label: '脚本库' },
    { page: 'home', icon: <Zap size={24} />, label: '首页' },
    { page: 'games', icon: <Gamepad2 size={24} />, label: '游戏' },
    { page: 'community', icon: <Users size={24} />, label: '社区' },
    { page: 'telegram', icon: <MessageCircle size={24} />, label: 'Telegram', href: 'https://t.me/boost/YZKNB666999' },
    { page: 'downloads', icon: <Download size={24} />, label: '下载' },
    { page: 'starred', icon: <Star size={24} />, label: '收藏' },
    { page: 'shortcuts', icon: <FileCode size={24} />, label: '快捷键' },
    { page: 'help', icon: <HelpCircle size={24} />, label: '帮助' },
    { page: 'settings', icon: <Settings size={24} />, label: '设置' },
    { page: 'about', icon: <Info size={24} />, label: '关于' },
  ];

  const handleNavClick = (item: typeof bottomNavItems[0]) => {
    if (item.href) {
      window.open(item.href, '_blank');
    } else {
      setCurrentPage(item.page);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-purple-500/30 md:hidden">
      <div className="flex items-center justify-around py-2 overflow-x-auto scrollbar-hide">
        {bottomNavItems.slice(0, 6).map((item) => (
          <button
            key={item.page + item.label}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-[60px] ${
              currentPage === item.page
                ? 'text-purple-400 bg-purple-600/20'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;