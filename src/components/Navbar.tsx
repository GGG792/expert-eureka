import React from 'react';
import { useAppStore } from '@/store';
import {
  Home,
  Code2,
  BookOpen,
  Settings,
  Cloud,
  MoreHorizontal,
  Users,
} from 'lucide-react';
import { Page } from '@/types';

const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useAppStore();

  const navItems: { page: Page; icon: React.ReactNode; label: string }[] = [
    { page: 'home', icon: <Home size={20} />, label: '首页' },
    { page: 'editor', icon: <Code2 size={20} />, label: '脚本管理' },
    { page: 'scripts', icon: <BookOpen size={20} />, label: '脚本库' },
    { page: 'settings', icon: <Settings size={20} />, label: '设置中心' },
    { page: 'home', icon: <Cloud size={20} />, label: '云端存储' },
    { page: 'home', icon: <Users size={20} />, label: '社区中心' },
    { page: 'home', icon: <MoreHorizontal size={20} />, label: '更多功能' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Kai Hub
            </span>
            <span className="px-2 py-1 bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-500/30 rounded-lg text-xs text-purple-300 font-medium">
              Pro
            </span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page + item.label}
                onClick={() => setCurrentPage(item.page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.page && item.page !== 'home'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center text-white font-bold">
              K
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-medium">Kai User</div>
              <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded text-xs text-white font-medium">
                Pro
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
