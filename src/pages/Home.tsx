import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import Editor from './Editor';
import Scripts from './Scripts';
import SettingsPage from './Settings';
import {
  Rocket,
  Zap,
  Shield,
  Lock,
  Cloud,
  Code,
  Puzzle,
  RefreshCw,
  Terminal,
  Cpu,
  Activity,
  CheckCircle2,
  Play,
  Copy,
  Download,
  Star,
  Users,
  FileCode,
  BookOpen,
  Settings,
  ChevronRight,
  Sparkles,
  Trophy,
  Globe,
  Server,
  ShieldCheck,
  Terminal as TerminalIcon,
  Gamepad2,
  Flame,
  Target,
  Eye,
  Wind,
  Ghost,
  Clock,
  Sun,
  Moon,
  CopyCheck,
  MessageCircle,
  ExternalLink,
  Loader,
  Key,
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import LogPanel from '@/components/LogPanel';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { scripts } = useAppStore();

  // 监听 store 中的页面变化，同步到 activeTab
  const { currentPage, setCurrentPage } = useAppStore();
  useEffect(() => {
    if (currentPage && currentPage !== 'home') {
      setActiveTab(currentPage);
    }
  }, [currentPage]);

  // 当 activeTab 变化时同步到 store
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(tabId as any);
  };

  const handleCopyScript = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/GGG792/expert-eureka/main/public/script.lua');
      if (!response.ok) {
        throw new Error('获取脚本失败');
      }
      const script = await response.text();
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('获取脚本失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'home', label: '🏠 首页', icon: Rocket },
    { id: 'features', label: '⚡ 功能', icon: Zap },
    { id: 'scripts', label: '📜 脚本', icon: FileCode },
    { id: 'games', label: '🎮 游戏', icon: Gamepad2 },
    { id: 'editor', label: '✏️ 编辑器', icon: Code },
    { id: 'scripts-library', label: '📚 脚本库', icon: BookOpen },
    { id: 'settings', label: '⚙️ 设置', icon: Settings },
    { id: 'about', label: 'ℹ️ 关于', icon: Globe },
  ];

  const mainFeatures = [
    {
      icon: Rocket,
      title: '极速执行',
      description: '毫秒级响应，流畅稳定',
      color: 'from-purple-600 to-violet-600',
    },
    {
      icon: Shield,
      title: '安全防护',
      description: '多重加密，保护账号',
      color: 'from-green-600 to-emerald-600',
    },
    {
      icon: Cloud,
      title: '云端同步',
      description: '配置云端备份，多设备同步',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      icon: Code,
      title: '专业编辑器',
      description: '语法高亮，代码补全',
      color: 'from-orange-600 to-amber-600',
    },
  ];

  const scriptFeatures = [
    {
      icon: Shield,
      title: '无敌模式',
      description: '免疫所有伤害',
      category: '通用',
      color: 'text-green-400',
    },
    {
      icon: Ghost,
      title: '穿墙模式',
      description: '无视物理碰撞',
      category: '通用',
      color: 'text-purple-400',
    },
    {
      icon: Wind,
      title: '飞行模式',
      description: 'WASD空格控制飞行',
      category: '通用',
      color: 'text-blue-400',
    },
    {
      icon: Activity,
      title: '无限跳跃',
      description: '连续跳跃不受限制',
      category: '通用',
      color: 'text-yellow-400',
    },
    {
      icon: Eye,
      title: '玩家透视',
      description: '显示所有玩家位置',
      category: '战斗',
      color: 'text-red-400',
    },
    {
      icon: Target,
      title: '自动瞄准',
      description: '锁定最近目标',
      category: '战斗',
      color: 'text-orange-400',
    },
    {
      icon: Flame,
      title: '海啸生存',
      description: '自动飞到高空躲避',
      category: '自然灾害',
      color: 'text-cyan-400',
    },
    {
      icon: Sun,
      title: '龙卷风生存',
      description: '飞行躲避龙卷风',
      category: '自然灾害',
      color: 'text-amber-400',
    },
    {
      icon: Moon,
      title: '陨石躲避',
      description: '随机传送躲避陨石',
      category: '自然灾害',
      color: 'text-red-400',
    },
  ];

  const stats = [
    { number: '5000万+', label: '全球用户', icon: Users },
    { number: '100000+', label: '脚本资源', icon: FileCode },
    { number: '99.9%', label: '稳定运行', icon: Server },
    { number: '24/7', label: '技术支持', icon: ShieldCheck },
  ];

  // 渲染不同的页面内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'editor':
        return <Editor />;
      case 'scripts-library':
        return <Scripts />;
      case 'settings':
        return <SettingsPage />;
      case 'home':
      case 'features':
      case 'scripts':
      case 'games':
      case 'about':
      default:
        return (
          <div className="space-y-12">
            {activeTab === 'home' && (
              <div className="space-y-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-violet-600/30 to-purple-900/30 rounded-3xl blur-3xl animate-pulse" />
                  <GlassCard className="relative p-12 md:p-16">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                      <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/30 to-violet-600/30 border border-purple-500/50 rounded-full mb-8 animate-pulse">
                          <Sparkles className="w-6 h-6 text-purple-400 animate-spin" style={{animationDuration: '3s'}} />
                          <span className="text-purple-300 font-bold">V5.1 全新版本</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6">
                          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                            KAI HUB
                          </span>
                        </h1>
                        <p className="text-3xl font-bold text-purple-300 mb-4">
                          脚本最强 · 功能最全 · 安全稳定
                        </p>
                        <p className="text-xl text-purple-200 mb-10">
                          全球开发者首选的终极脚本中心
                        </p>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                          <button
                            onClick={() => handleTabChange('scripts')}
                            className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-violet-900 rounded-2xl text-white font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                          >
                            <Play size={28} fill="currentColor" />
                            获取脚本
                            <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                          </button>
                          <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-2xl">
                            <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
                            <div>
                              <div className="text-yellow-400 font-black text-lg">全球第一</div>
                              <div className="text-yellow-400/70 text-sm">脚本平台</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="relative">
                          <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/40 to-violet-600/40 rounded-full blur-3xl animate-pulse" />
                          <div className="relative w-80 h-80 bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 rounded-full flex items-center justify-center border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30 animate-pulse">
                            <div className="text-center">
                              <div className="text-9xl mb-6">🚀</div>
                              <div className="bg-gradient-to-r from-purple-600/40 to-violet-600/40 rounded-2xl p-6 border border-purple-500/30">
                                <TerminalIcon className="w-16 h-16 text-purple-300 mx-auto mb-2 animate-pulse" />
                                <div className="text-purple-300 font-mono text-sm">KAI HUB PRO</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => (
                    <GlassCard key={idx} className="p-8 text-center group hover:scale-105 transition-all cursor-pointer transform hover:rotate-3" style={{
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                    }}>
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform animate-bounce">
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-purple-300 font-medium">{stat.label}</div>
                    </GlassCard>
                  ))}
                </div>

                <div>
                  <h2 className="text-4xl font-black text-white text-center mb-8">
                    <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      核心功能
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mainFeatures.map((feature, idx) => (
                      <GlassCard key={idx} className="p-8 group hover:scale-[1.02] transition-all cursor-pointer" style={{
                        animation: `fadeInLeft 0.6s ease-out ${idx * 0.15}s both`,
                      }}>
                        <div className="flex items-start gap-6">
                          <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform`}>
                            <feature.icon className="w-10 h-10 text-white animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-purple-300 text-lg leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-5xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      功能列表
                    </span>
                  </h2>
                  <p className="text-xl text-purple-300">涵盖所有主流游戏，功能持续更新</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scriptFeatures.map((feature, idx) => (
                    <GlassCard key={idx} className="p-8 group hover:scale-[1.02] transition-all cursor-pointer" style={{
                      animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`,
                    }}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 bg-black/30 rounded-xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}>
                          <feature.icon size={28} className="animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                          <span className="text-sm text-purple-400">{feature.category}</span>
                        </div>
                      </div>
                      <p className="text-purple-300">{feature.description}</p>
                    </GlassCard>
                  ))}
                </div>

                <GlassCard className="p-12 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">更多功能持续开发中...</h3>
                  <p className="text-xl text-purple-300">我们会不断添加新功能，敬请期待！</p>
                </GlassCard>
              </div>
            )}

            {activeTab === 'scripts' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-5xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      获取脚本
                    </span>
                  </h2>
                  <p className="text-xl text-purple-300">点击下方按钮，一键复制完整脚本</p>
                </div>

                <GlassCard className="p-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-violet-900 p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Kai Hub Pro V5.1</h3>
                          <p className="text-purple-200">完整通用脚本 · 包含所有功能</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-xl">
                          <CheckCircle2 size={20} className="text-green-400 animate-bounce" />
                          <span className="text-green-400 font-bold">完整版</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
                          <Star size={20} className="text-yellow-400 animate-pulse" />
                          <span className="text-yellow-400 font-bold">热门</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="bg-black/50 rounded-2xl border border-purple-500/30 p-6 mb-6 max-h-96 overflow-y-auto">
                      <div className="text-purple-400 font-mono text-sm mb-4">-- Kai Hub Pro V5.1 完整脚本</div>
                      <div className="text-green-400 font-mono text-xs leading-relaxed">
                        <p className="mb-2">-- 功能包括：</p>
                        <p className="mb-2">-- ✨ 无敌模式 · 🦘 无限跳跃 · 👻 穿墙模式</p>
                        <p className="mb-2">-- 🚀 飞行模式 · 🔍 玩家透视 · 🎯 自动瞄准</p>
                        <p className="mb-2">-- 🌊 自然灾害生存 · 🍎 Blox Fruits · 🐾 Pet Simulator X</p>
                        <p className="mt-4">-- 点击下方按钮从服务器获取完整脚本</p>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyScript}
                      disabled={loading}
                      className={`w-full flex items-center justify-center gap-4 px-8 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 ${
                        copied
                          ? 'bg-green-600 text-white shadow-lg shadow-green-500/40'
                          : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 shadow-lg shadow-purple-500/40'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <Loader size={28} className="animate-spin" />
                          正在获取脚本...
                        </>
                      ) : copied ? (
                        <>
                          <CopyCheck size={28} className="animate-bounce" />
                          已复制到剪贴板！
                        </>
                      ) : (
                        <>
                          <Copy size={28} />
                          一键复制完整脚本
                        </>
                      )}
                    </button>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <Shield className="w-8 h-8 text-green-400 mx-auto mb-2 animate-bounce" />
                        <div className="text-white font-bold">安全稳定</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <Code className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                        <div className="text-white font-bold">完整代码</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <div className="text-white font-bold">即插即用</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <RefreshCw className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-spin" style={{animationDuration: '3s'}} />
                        <div className="text-white font-bold">持续更新</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-purple-400 animate-pulse" />
                    使用说明
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 animate-bounce">1</div>
                      <div>
                        <h4 className="text-white font-bold mb-1">复制脚本代码</h4>
                        <p className="text-purple-300">点击上方"一键复制完整脚本"按钮</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 animate-pulse">2</div>
                      <div>
                        <h4 className="text-white font-bold mb-1">粘贴到执行器</h4>
                        <p className="text-purple-300">打开脚本执行器（如 Synapse X, Krnl 等）并粘贴代码</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                      <div>
                        <h4 className="text-white font-bold mb-1">执行脚本</h4>
                        <p className="text-purple-300">点击执行或按 F4 打开界面</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === 'games' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-5xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      支持的游戏
                    </span>
                  </h2>
                  <p className="text-xl text-purple-300">持续更新更多游戏支持</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { name: '自然灾害模拟器', icon: '🌊', color: 'from-blue-600 to-cyan-600', features: ['海啸生存', '龙卷风躲避', '陨石躲避', '自动生存'] },
                    { name: 'Blox Fruits', icon: '🍎', color: 'from-orange-600 to-red-600', features: ['自动刷怪', '自动任务', '无限金币', '快速升级'] },
                    { name: 'Pet Simulator X', icon: '🐾', color: 'from-green-600 to-emerald-600', features: ['自动收集', '自动孵化', '快速刷宠', '宝石收集'] },
                    { name: 'Brookhaven', icon: '🏠', color: 'from-purple-600 to-pink-600', features: ['房屋生成', '角色传送', '功能解锁', '全图探索'] },
                    { name: 'MM2', icon: '🔪', color: 'from-gray-600 to-gray-800', features: ['自动刷币', '自动开箱', '防踢功能', '地图标记'] },
                    { name: '通用脚本', icon: '⚡', color: 'from-purple-600 to-violet-600', features: ['无敌模式', '飞行穿墙', '速度调节', '透视功能'] },
                  ].map((game, idx) => (
                    <GlassCard key={idx} className="p-8 group hover:scale-[1.02] transition-all cursor-pointer" style={{
                      animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                    }}>
                      <div className={`w-20 h-20 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform animate-bounce`}>
                        {game.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{game.name}</h3>
                      <div className="space-y-2">
                        {game.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-purple-300">
                            <CheckCircle2 size={16} className="text-green-400 animate-pulse" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-5xl font-black text-white mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      关于 Kai Hub
                    </span>
                  </h2>
                  <p className="text-xl text-purple-300">打造最专业的 Roblox 脚本平台</p>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-2xl p-8 border border-purple-500/30 mb-8">
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
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    加入 Telegram 频道
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <GlassCard className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Rocket className="w-8 h-8 text-purple-400 animate-pulse" />
                      我们的使命
                    </h3>
                    <p className="text-purple-300 text-lg leading-relaxed mb-6">
                      Kai Hub 致力于为 Roblox 玩家提供最优质、最安全的脚本服务。我们相信每个玩家都应该能够充分体验游戏的乐趣。
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 animate-bounce" />
                        <span className="text-white">持续更新最新游戏支持</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 animate-pulse" />
                        <span className="text-white">安全稳定的脚本执行环境</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                        <span className="text-white">专业团队技术支持</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 animate-bounce" />
                        <span className="text-white">用户友好的界面设计</span>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Shield className="w-8 h-8 text-purple-400" />
                      安全承诺
                    </h3>
                    <p className="text-purple-300 text-lg leading-relaxed mb-6">
                      我们高度重视用户账号安全。所有脚本都经过严格测试，确保不会对用户账号造成风险。
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/30 rounded-xl text-center border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <div className="text-3xl font-black text-green-400 mb-2">256位</div>
                        <div className="text-purple-300 text-sm">加密保护</div>
                      </div>
                      <div className="p-4 bg-black/30 rounded-xl text-center border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <div className="text-3xl font-black text-blue-400 mb-2">24/7</div>
                        <div className="text-purple-300 text-sm">监控保护</div>
                      </div>
                      <div className="p-4 bg-black/30 rounded-xl text-center border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <div className="text-3xl font-black text-yellow-400 mb-2">0</div>
                        <div className="text-purple-300 text-sm">封号记录</div>
                      </div>
                      <div className="p-4 bg-black/30 rounded-xl text-center border border-purple-500/20 hover:border-purple-500/50 transition-all transform hover:scale-105">
                        <div className="text-3xl font-black text-purple-400 mb-2">5000万+</div>
                        <div className="text-purple-300 text-sm">安全用户</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                <GlassCard className="p-12 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">联系我们</h3>
                  <p className="text-xl text-purple-300 mb-8">有问题或建议？我们随时为您服务！</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://t.me/boost/YZKNB666999" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/40">
                      加入社区
                    </a>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 顶部选项栏 */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 border border-purple-500/30'
                }`}
                style={{
                  animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both`,
                }}
              >
                <Icon size={24} className={activeTab === tab.id ? 'animate-bounce' : ''} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 内容区域 */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Home;
