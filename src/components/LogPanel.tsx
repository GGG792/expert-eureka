import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/store';
import { Trash2, Copy, Download } from 'lucide-react';

const LogPanel: React.FC = () => {
  const { logs, clearLogs } = useAppStore();
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColor = (level: string) => {
    switch (level) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleCopyLogs = () => {
    const logText = logs
      .map((log) => `[${formatTime(log.timestamp)}] [${log.level.toUpperCase()}] ${log.message}`)
      .join('\n');
    navigator.clipboard.writeText(logText);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <h3 className="text-white font-bold flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          实时日志输出
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="p-2 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all"
          >
            <Copy size={16} />
          </button>
          <button className="p-2 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all">
            <Download size={16} />
          </button>
          <button
            onClick={clearLogs}
            className="p-2 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-black/30">
        {logs.length === 0 ? (
          <div className="text-purple-500/50 text-center py-8">暂无日志输出</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-1">
              <span className="text-gray-500">[{formatTime(log.timestamp)}]</span>
              <span className={`ml-2 font-bold ${getLogColor(log.level)}`}>
                [{log.level.toUpperCase()}]
              </span>
              <span className="ml-2 text-gray-300">{log.message}</span>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default LogPanel;
