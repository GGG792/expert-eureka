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
  MessageCircle,
  Sparkles,
  Zap,
  Heart,
  ExternalLink,
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAppStore();
  const [activeSection, setActiveSection] = React.useState('通用设置');
  const [selectedTheme, setSelectedTheme] = React.useState('purple');

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
                {sections.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-purple-600 to-violet-900 text-white shadow-lg shadow-purple-500/40'
                          : 'text-purple-300 hover:text-white hover:bg-white/10'
                      }`}
                      style={{
                        animation: `fadeInLeft 0.3s ease-out ${idx * 0.05}s both`,
                      }}
                    >
                      <Icon size={20} className={activeSection === section.id ? 'animate-pulse' : ''} />
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
                      { id: 'dark', name: '深色模式', color: 'from-gray-900 to-black', gradient: 'from-gray-600 to-gray-800' },
                      { id: 'purple', name: '紫色主题', color: 'from-purple-900 to-violet-900', gradient: 'from-purple-600 to-violet-600' },
                      { id: 'blue', name: '蓝色主题', color: 'from-blue-900 to-indigo-900', gradient: 'from-blue-600 to-blue-800' },
                      { id: 'green', name: '绿色主题', color: 'from-green-900 to-emerald-900', gradient: 'from-green-600 to-emerald-600' },
                    ].map((theme, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedTheme(theme.id);
                          document.documentElement.style.setProperty('--primary-color', theme.id === 'purple' ? '138, 43, 226' : theme.id === 'blue' ? '59, 130, 246' : theme.id === 'green' ? '34, 197, 94' : '75, 85, 99');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all transform hover:scale-110 hover:shadow-lg ${
                          selectedTheme === theme.id
                            ? 'border-white shadow-lg'
                            : 'border-purple-500/30 hover:border-purple-500/60'
                        }`}
                      >
                        <div
                          className={`w-full h-20 rounded-lg bg-gradient-to-br ${theme.color} mb-3 flex items-center justify-center`}
                        >
                          {selectedTheme === theme.id && (
                            <div className={`w-10 h-10 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center`}>
                              <Sparkles className="w-5 h-5 text-white animate-pulse" />
                            </div>
                          )}
                        </div>
                        <span className="text-white text-sm font-medium">{theme.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-6 bg-black/20 rounded-xl border border-purple-500/20">
                    <h4 className="text-white font-bold mb-4">自定义颜色</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-purple-300 text-sm mb-2 block">主色调</label>
                        <input
                          type="color"
                          defaultValue="#8a2be2"
                          className="w-full h-12 rounded-lg cursor-pointer bg-transparent border border-purple-500/30"
                          onChange={(e) => {
                            const color = e.target.value;
                            document.documentElement.style.setProperty('--primary-color', color);
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-purple-300 text-sm mb-2 block">强调色</label>
                        <input
                          type="color"
                          defaultValue="#c864ff"
                          className="w-full h-12 rounded-lg cursor-pointer bg-transparent border border-purple-500/30"
                          onChange={(e) => {
                            const color = e.target.value;
                            document.documentElement.style.setProperty('--accent-color', color);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === '帮助支持' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-2xl p-8 border border-purple-500/30 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="w-8 h-8 text-purple-400 animate-bounce" />
                      <h3 className="text-2xl font-bold text-white">加入我们的社区</h3>
                    </div>
                    <p className="text-purple-300 mb-6 leading-relaxed">
                      获取最新脚本更新、参与社区讨论、与其他玩家交流经验！
                    </p>
                    <a
                      href="https://t.me/boost/YZKNB666999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      加入 Telegram 频道
                      <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6 text-white animate-spin" style={{animationDuration: '3s'}} />
                      </div>
                      <h4 className="text-white font-bold mb-2">最新脚本</h4>
                      <p className="text-purple-300 text-sm">第一时间获取最新脚本和功能更新</p>
                    </div>

                    <div className="p-6 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-bold mb-2">技术支持</h4>
                      <p className="text-purple-300 text-sm">遇到问题？我们的团队随时为您服务</p>
                    </div>

                    <div className="p-6 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-white animate-pulse" />
                      </div>
                      <h4 className="text-white font-bold mb-2">社区支持</h4>
                      <p className="text-purple-300 text-sm">与其他玩家交流经验，分享技巧</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/30">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">最新更新</h4>
                        <p className="text-purple-300 text-sm mb-3">
                          Kai Hub Pro V5.1 现已发布！包含更多炫酷功能和性能优化。
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-purple-600/30 rounded-full text-purple-300 text-xs">✨ 无敌模式</span>
                          <span className="px-3 py-1 bg-blue-600/30 rounded-full text-blue-300 text-xs">🚀 飞行功能</span>
                          <span className="px-3 py-1 bg-green-600/30 rounded-full text-green-300 text-xs">⚡ 穿墙模式</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {![
                '通用设置',
                '安全防护',
                '界面主题',
                '帮助支持',
              ].includes(activeSection) && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
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
  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
    <div>
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-purple-300 text-sm">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-14 h-7 rounded-full transition-colors relative ${
        checked ? 'bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg shadow-purple-500/40' : 'bg-gray-700'
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