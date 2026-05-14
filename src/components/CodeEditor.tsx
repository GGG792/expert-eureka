import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import { Play, Save, FilePlus, MoreHorizontal, X } from 'lucide-react';

const CodeEditor: React.FC = () => {
  const { currentScript, updateScript, addLog } = useAppStore();
  const [code, setCode] = useState('');
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    if (currentScript) {
      setCode(currentScript.code);
    } else {
      setCode(`-- Kai Hub Script Example
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

local function TeleportTo(playerName)
    local player = Players:FindFirstChild(playerName)
    if player and player.Character then
        local hrp = player.Character:FindFirstChild("HumanoidRootPart")
        if hrp then
            LocalPlayer.Character.HumanoidRootPart.CFrame = hrp.CFrame + Vector3.new(0, 5, 0)
        end
    end
end

-- TeleportTo("PlayerName")`);
    }
  }, [currentScript]);

  useEffect(() => {
    setLineCount(code.split('\n').length);
  }, [code]);

  const handleExecute = () => {
    addLog('正在执行脚本...', 'info');
    setTimeout(() => {
      addLog('脚本注入成功！', 'success');
    }, 500);
  };

  const handleSave = () => {
    if (currentScript) {
      updateScript(currentScript.id, { code, updatedAt: new Date() });
      addLog('脚本已保存！', 'success');
    } else {
      addLog('请先选择或创建一个脚本', 'warning');
    }
  };

  const handleNew = () => {
    setCode('');
    addLog('已创建新脚本', 'info');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30 bg-black/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-purple-300 text-sm font-mono">
            {currentScript ? currentScript.name : 'example.lua'}
          </span>
          {currentScript && (
            <button
              onClick={() => {
                /* clear script */
              }}
              className="p-1 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExecute}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-900 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <Play size={16} fill="currentColor" />
            执行 (F5)
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-purple-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <Save size={16} />
            保存
          </button>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-purple-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <FilePlus size={16} />
            新建
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-purple-300 hover:text-white hover:bg-white/20 transition-all">
            <MoreHorizontal size={16} />
            更多功能
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="bg-black/50 px-4 py-4 text-right select-none border-r border-purple-500/20">
          {lines.map((line) => (
            <div key={line} className="text-purple-500/50 font-mono text-sm leading-6">
              {line}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <textarea
          value={code}
          onChange={handleChange}
          className="flex-1 bg-transparent text-green-400 font-mono text-sm p-4 resize-none outline-none leading-6"
          spellCheck={false}
          placeholder="在此输入 Lua 脚本..."
        />
      </div>
    </div>
  );
};

export default CodeEditor;
