import React from 'react';
import { Script } from '@/types';
import { useAppStore } from '@/store';
import { Star, Download, Play } from 'lucide-react';

interface ScriptCardProps {
  script: Script;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script }) => {
  const { setCurrentPage, setCurrentScript, addLog } = useAppStore();

  const handleLoadScript = () => {
    setCurrentScript(script);
    setCurrentPage('editor');
    addLog(`加载脚本: ${script.name}`, 'success');
  };

  const handleExecute = () => {
    addLog(`执行脚本: ${script.name}`, 'info');
    setTimeout(() => {
      addLog('脚本执行成功！', 'success');
    }, 1000);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
      onClick={handleLoadScript}
    >
      <div className="h-32 bg-gradient-to-br from-purple-900/50 to-violet-900/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-900 rounded-xl flex items-center justify-center z-10">
          <Play className="w-8 h-8 text-white fill-current" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">{script.name}</h3>
            <span className="text-purple-400 text-sm">{script.category}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExecute();
            }}
            className="p-2 bg-gradient-to-br from-purple-600 to-violet-900 rounded-xl text-white hover:scale-105 transition-transform"
          >
            <Play size={16} fill="currentColor" />
          </button>
        </div>
        <p className="text-purple-300 text-sm mb-4 line-clamp-2">{script.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span>{script.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-purple-300">
            <Download size={14} />
            <span>{(script.downloads / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;
