import React, { useState } from 'react';
import { useAppStore } from '@/store';
import {
  Users,
  Key,
  Activity,
  MessageCircle,
  ExternalLink,
  CopyCheck,
  MonitorPlay,
} from 'lucide-react';
import GlassCard from './GlassCard';

const BottomNav: React.FC = () => {
  const { currentPage, setCurrentPage } = useAppStore();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  const handleNavClick = (item: string) => {
    if (item === 'community') {
      window.open('https://t.me/boost/YZKNB666999', '_blank');
    } else if (item === 'key') {
      setShowKeyModal(true);
    } else if (item === 'performance') {
      setShowPerformanceModal(true);
    }
  };

  const navItems = [
    { id: 'community', label: '社区', icon: Users },
    { id: 'key', label: '获取卡密', icon: Key },
    { id: 'performance', label: '性能监测', icon: Activity },
  ];

  return (
    <>
      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-purple-500/30">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                  false // 底部导航不高亮，因为它们主要是功能性的
                    ? 'text-purple-400 bg-purple-600/20'
                    : 'text-purple-300 hover:text-white hover:bg-purple-600/10'
                }`}
                style={{
                  animation: `fadeInUp 0.3s ease-out ${idx * 0.1}s both`,
                }}
              >
                <Icon size={28} className={false ? 'animate-bounce' : ''} />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 获取卡密弹窗 */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <GlassCard className="max-w-md w-full mx-4 p-6 relative">
            <button
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <Key className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2">获取卡密</h3>
              <p className="text-purple-300">加入社区获取激活码</p>
            </div>
            <a
              href="https://t.me/boost/YZKNB666999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              加入 Telegram 获取
              <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </GlassCard>
        </div>
      )}

      {/* 性能监测弹窗 */}
      {showPerformanceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <GlassCard className="max-w-lg w-full mx-4 p-6 relative">
            <button
              onClick={() => setShowPerformanceModal(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2">性能监测</h3>
              <p className="text-purple-300">实时系统状态监控</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-black/30 rounded-xl border border-purple-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-300 flex items-center gap-2">
                    <MonitorPlay size={18} />
                    CPU 使用率
                  </span>
                  <span className="text-white font-bold">35%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                </div>
              </div>

              <div className="p-4 bg-black/30 rounded-xl border border-purple-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-300 flex items-center gap-2">
                    <Activity size={18} />
                    内存使用
                  </span>
                  <span className="text-white font-bold">62%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                </div>
              </div>

              <div className="p-4 bg-black/30 rounded-xl border border-purple-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-300 flex items-center gap-2">
                    <Activity size={18} />
                    网络延迟
                  </span>
                  <span className="text-white font-bold">23ms</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/30 rounded-xl border border-purple-500/20 text-center">
                  <div className="text-green-400 font-bold text-lg">运行中</div>
                  <div className="text-purple-300 text-sm">状态</div>
                </div>
                <div className="p-3 bg-black/30 rounded-xl border border-purple-500/20 text-center">
                  <div className="text-purple-400 font-bold text-lg">00:15:23</div>
                  <div className="text-purple-300 text-sm">运行时间</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPerformanceModal(false)}
              className="w-full mt-6 px-6 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-purple-300 font-medium hover:bg-white/20 transition-all"
            >
              关闭
            </button>
          </GlassCard>
        </div>
      )}
    </>
  );
};

export default BottomNav;
