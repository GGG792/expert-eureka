import React, { useEffect } from 'react';
import { useAppStore } from '@/store';
import { Activity, Cpu, HardDrive, Globe } from 'lucide-react';

const PerformanceMonitor: React.FC = () => {
  const { performance, updatePerformance } = useAppStore();

  useEffect(() => {
    const interval = setInterval(updatePerformance, 2000);
    return () => clearInterval(interval);
  }, [updatePerformance]);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const metrics = [
    {
      icon: Cpu,
      label: 'CPU 使用',
      value: `${performance.cpu}%`,
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: HardDrive,
      label: '内存使用',
      value: `${performance.memory}%`,
      color: 'from-violet-500 to-violet-700',
    },
    {
      icon: Globe,
      label: '网络延迟',
      value: `${performance.network}ms`,
      color: 'from-pink-500 to-pink-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Activity size={20} className="text-purple-400" />
          性能监控
        </h3>
        <div className="space-y-3">
          {metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300 flex items-center gap-2">
                  <metric.icon size={14} />
                  {metric.label}
                </span>
                <span className="text-white font-medium">{metric.value}</span>
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-500`}
                  style={{ width: `${metric.value.replace('%', '')}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-purple-500/30">
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">执行状态</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">运行中</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">注入方式</span>
          <span className="text-white text-sm">高级注入 (Hyper)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">运行时间</span>
          <span className="text-white text-sm">{formatUptime(performance.uptime)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">内存使用</span>
          <span className="text-white text-sm">256.7 MB</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">游戏识别</span>
          <span className="text-white text-sm">Roblox (64位)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">客户端版本</span>
          <span className="text-white text-sm">版本号 245</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-purple-300 text-sm">更新状态</span>
          <span className="text-green-400 text-sm">已是最新版本</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
