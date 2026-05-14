import { Script } from '@/types';

export const mockScripts: Script[] = [
  {
    id: '1',
    name: 'Blox Fruits 自动刷怪',
    code: `-- Kai Hub Script Example
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

local function TeleportTo(playerName)
    local player = Players:FindFirstChild(playerName)
    if player and player.Character then
        local hrp = player.Character:FindFirstChild("HumanoidRootPart")
        if hrp then
            LocalPlayer.Character.HumanoidRootPart.CFrame = hrp.CFrame * CFrame.new(0, 5, 0)
        end
    end
end

-- TeleportTo("PlayerName")`,
    category: 'Blox Fruits',
    rating: 4.9,
    downloads: 12500,
    description: '刷怪/任务/自动化',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '2',
    name: 'Brookhaven 全能脚本',
    code: `-- Brookhaven Script
print("Welcome to Kai Hub!")`,
    category: 'Brookhaven',
    rating: 4.8,
    downloads: 9800,
    description: '房子生成/角色传送/功能解锁',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-18'),
  },
  {
    id: '3',
    name: 'Arsenal 自瞄辅助',
    code: `-- Arsenal Aimbot
print("Aimbot activated!")`,
    category: 'Arsenal',
    rating: 4.7,
    downloads: 7600,
    description: '自瞄/无后坐/自动跳',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-22'),
  },
  {
    id: '4',
    name: 'Pet Simulator X 自动脚本',
    code: `-- Pet Simulator X Auto Farm
print("Auto farming started!")`,
    category: 'Pet Sim X',
    rating: 4.9,
    downloads: 11200,
    description: '自动收集/自动孵化/自动升级',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: '5',
    name: 'MM2 自动刷币',
    code: `-- Murder Mystery 2
print("Auto coin farm active!")`,
    category: 'MM2',
    rating: 4.6,
    downloads: 6300,
    description: '自动收集硬币/自动开箱/防踢',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-21'),
  },
];
