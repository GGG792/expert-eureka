import React from 'react';
import { useAppStore } from '@/store';
import ScriptCard from '@/components/ScriptCard';
import GlassCard from '@/components/GlassCard';
import { Search } from 'lucide-react';

const Scripts: React.FC = () => {
  const { scripts } = useAppStore();
  const [activeTab, setActiveTab] = React.useState('精选推荐');

  const tabs = ['精选推荐', '最新上传', '热门脚本', '高分脚本'];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">云端脚本库</h1>
              <p className="text-purple-300">海量优质脚本，每日更新</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="搜索脚本..."
                className="w-full pl-10 pr-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-violet-900 text-white'
                    : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>

        {scripts.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-purple-300 font-medium hover:bg-white/20 transition-all">
              加载更多
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scripts;