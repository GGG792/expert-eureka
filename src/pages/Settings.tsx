import React from 'react';
import { useAppStore } from '@/store';
import GlassCard from '@/components/GlassCard';
import {
  Settings as SettingsIcon,
  Shield,
  User,
  Bell,
  Palette,
  Download,
  Key,
  Cpu,
  Globe,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAppStore();
  const [activeSection, setActiveSection] = React.useState('通用设置');

  const sections = [
    { id: '通用设置', icon: SettingsIcon, label: '通用设置' },
    { id: '安全防护', icon: Shield, label: '安全防护' },
    { id: '账号管理', icon: User, label: '账号管理' },
    { id: '通知设置', icon: Bell, label: '通知设置' },
    { id: '界面主题', icon: Palette, label: '界面主题' },
    { id: '快捷键', icon: Key, label: '快捷键' },
    { id: '性能设置', icon: Cpu, label: '性能设置' },
    { id: '网络设置', icon: Globe, label: '网络设置' },
    { id: '帮助支持', icon: HelpCircle, label: '帮助支持' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-purple-600 to-violet-900 text-white'
                          : 'text-purple-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-4">
                  <LogOut size={20} />
                  <span className="font-medium">退出登录</span>
                </button>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-3">
            <GlassCard className="p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">{activeSection}</h1>
                <p className="text-purple-300">
                  配置您的 Kai Hub 设置
                </p>
              </div>

              {activeSection === '通用设置' && (
                <div className="space-y-6">
                  <SettingItem
                    title="自动保存脚本"
                    description="编辑脚本时自动保存"
                    checked={settings.autoSave}
                    onChange={(checked) => updateSettings({ autoSave: checked })}
                  />
                  <SettingItem
                    title="显示行号"
                    description="在编辑器中显示行号"
                    checked={settings.showLineNumbers}
                    onChange={(checked) => updateSettings({ showLineNumbers: checked })}
                  />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">编辑器字体大小</h3>
                        <p className="text-purple-300 text-sm">
                          设置代码编辑器的字体大小
                        </p>
                      </div>
                      <span className="text-white font-medium">{settings.editorFontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="24"
                      value={settings.editorFontSize}
                      onChange={(e) =>
                        updateSettings({ editorFontSize: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                </div>
              )}

              {activeSection === '安全防护' && (
                <div className="space-y-6">
                  <SettingItem
                    title="实时防护检测"
                    description="启用实时安全检测"
                    checked={true}
                    onChange={() => {}}
                  />
                  <SettingItem
                    title="脚本验证"
                    description="执行前验证脚本安全性"
                    checked={true}
                    onChange={() => {}}
                  />
                  <SettingItem
                    title="自动备份"
                    description="自动备份重要脚本"
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
              )}

              {activeSection === '界面主题' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: '深色模式', color: 'from-gray-900 to-black' },
                      { name: '紫色主题', color: 'from-purple-900 to-violet-900' },
                      { name: '蓝色主题', color: 'from-blue-900 to-indigo-900' },
                      { name: '绿色主题', color: 'from-green-900 to-emerald-900' },
                    ].map((theme, idx) => (
                      <button
                        key={idx}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          idx === 1
                            ? 'border-purple-500'
                            : 'border-purple-500/30 hover:border-purple-500/60'
                        }`}
                      >
                        <div
                          className={`w-full h-20 rounded-lg bg-gradient-to-br ${theme.color} mb-3`}
                        />
                        <span className="text-white text-sm font-medium">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {![
                '通用设置',
                '安全防护',
                '界面主题',
              ].includes(activeSection) && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SettingsIcon className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    更多功能即将上线
                  </h3>
                  <p className="text-purple-300">
                    此设置页面正在开发中，敬请期待
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingItem: React.FC<{
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ title, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-purple-500/20">
    <div>
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-purple-300 text-sm">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-14 h-7 rounded-full transition-colors relative ${
        checked ? 'bg-gradient-to-r from-purple-600 to-violet-600' : 'bg-gray-700'
      }`}
    >
      <div
        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'left-8' : 'left-1'
        }`}
      />
    </button>
  </div>
);

export default SettingsPage;