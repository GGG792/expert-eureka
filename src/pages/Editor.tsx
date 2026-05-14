import React from 'react';
import { useAppStore } from '@/store';
import CodeEditor from '@/components/CodeEditor';
import LogPanel from '@/components/LogPanel';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import GlassCard from '@/components/GlassCard';

const Editor: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
          <div className="lg:col-span-2">
            <GlassCard className="h-full p-0 overflow-hidden">
              <CodeEditor />
            </GlassCard>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="h-[50%] p-0 overflow-hidden">
              <LogPanel />
            </GlassCard>
            <GlassCard className="h-[50%] p-6">
              <PerformanceMonitor />
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;