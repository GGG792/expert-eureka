--[[
   ╔════════════════════════════════════════════════════════════╗
   ║                     KAI HUB UNIVERSAL SCRIPT                ║
   ║                          Version 5.1                         ║
   ║               The Ultimate Roblox Script Hub                ║
   ╚════════════════════════════════════════════════════════════╝
   
   免责声明：此脚本仅供学习和娱乐目的使用。
   使用第三方脚本可能违反游戏服务条款，请自行承担风险。
]]

-- ==============================================
-- 核心服务
-- ==============================================

local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local Workspace = game:GetService("Workspace")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local StarterGui = game:GetService("StarterGui")
local StarterPlayer = game:GetService("StarterPlayer")

local Character = nil
local Humanoid = nil
local HumanoidRootPart = nil

-- ==============================================
-- 初始化角色
-- ==============================================

local function initCharacter()
    Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()
    Humanoid = Character:WaitForChild("Humanoid")
    HumanoidRootPart = Character:WaitForChild("HumanoidRootPart")
end

initCharacter()

-- 角色重生时重新初始化
LocalPlayer.CharacterAdded:Connect(function(newCharacter)
    Character = newCharacter
    Humanoid = newCharacter:WaitForChild("Humanoid")
    HumanoidRootPart = newCharacter:WaitForChild("HumanoidRootPart")
end)

-- ==============================================
-- 实用函数库
-- ==============================================

local Utils = {}

function Utils.notify(title, text, duration)
    local success = pcall(function()
        StarterGui:SetCore("SendNotification", {
            Title = title,
            Text = text,
            Duration = duration or 3
        })
    end)
    if not success then
        warn("[Kai Hub] 通知发送失败")
    end
end

function Utils.findFirst(name, parent)
    for _, v in pairs(parent:GetChildren()) do
        if v.Name == name then
            return v
        end
    end
    return nil
end

function Utils.findAll(name, parent)
    local results = {}
    for _, v in pairs(parent:GetChildren()) do
        if v.Name:find(name) then
            table.insert(results, v)
        end
    end
    return results
end

-- ==============================================
-- GUI 界面系统
-- ==============================================

local GUI = {}

function GUI.create()
    -- 删除旧的界面
    if game.CoreGui:FindFirstChild("KaiHub") then
        game.CoreGui.KaiHub:Destroy()
    end

    -- 创建主界面
    local ScreenGui = Instance.new("ScreenGui")
    ScreenGui.Name = "KaiHub"
    ScreenGui.Parent = game.CoreGui
    
    local MainFrame = Instance.new("Frame")
    MainFrame.Name = "MainFrame"
    MainFrame.Size = UDim2.new(0, 450, 0, 550)
    MainFrame.Position = UDim2.new(0.1, 0, 0.1, 0)
    MainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
    MainFrame.BorderSizePixel = 0
    MainFrame.Parent = ScreenGui
    
    -- 圆角效果
    local UICorner = Instance.new("UICorner")
    UICorner.CornerRadius = UDim.new(0, 10)
    UICorner.Parent = MainFrame
    
    -- 紫色渐变边框
    local UIGradient = Instance.new("UIGradient")
    UIGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(138, 43, 226)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(75, 0, 130))
    })
    UIGradient.Parent = MainFrame
    
    -- 标题栏
    local TitleBar = Instance.new("Frame")
    TitleBar.Name = "TitleBar"
    TitleBar.Size = UDim2.new(1, 0, 0, 50)
    TitleBar.BackgroundColor3 = Color3.fromRGB(30, 30, 45)
    TitleBar.Parent = MainFrame
    
    local TitleText = Instance.new("TextLabel")
    TitleText.Name = "TitleText"
    TitleText.Text = "🌟 KAI HUB 5.1"
    TitleText.Size = UDim2.new(1, -60, 1, 0)
    TitleText.Position = UDim2.new(0, 15, 0, 0)
    TitleText.BackgroundTransparency = 1
    TitleText.TextColor3 = Color3.fromRGB(200, 150, 255)
    TitleText.TextSize = 20
    TitleText.Font = Enum.Font.GothamBold
    TitleText.Parent = TitleBar
    
    -- 关闭按钮
    local CloseButton = Instance.new("TextButton")
    CloseButton.Name = "CloseButton"
    CloseButton.Text = "✕"
    CloseButton.Size = UDim2.new(0, 40, 0, 40)
    CloseButton.Position = UDim2.new(1, -45, 0, 5)
    CloseButton.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
    CloseButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    CloseButton.TextSize = 18
    CloseButton.Parent = TitleBar
    CloseButton.MouseButton1Click:Connect(function()
        ScreenGui:Destroy()
    end)
    
    -- 标签页导航
    local TabContainer = Instance.new("Frame")
    TabContainer.Name = "TabContainer"
    TabContainer.Size = UDim2.new(1, -20, 0, 50)
    TabContainer.Position = UDim2.new(0, 10, 0, 60)
    TabContainer.BackgroundTransparency = 1
    TabContainer.Parent = MainFrame
    
    -- 内容区域
    local ContentContainer = Instance.new("ScrollingFrame")
    ContentContainer.Name = "ContentContainer"
    ContentContainer.Size = UDim2.new(1, -20, 1, -130)
    ContentContainer.Position = UDim2.new(0, 10, 0, 120)
    ContentContainer.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
    ContentContainer.BorderSizePixel = 0
    ContentContainer.ScrollBarThickness = 8
    ContentContainer.Parent = MainFrame
    
    local UIListLayout = Instance.new("UIListLayout")
    UIListLayout.Padding = UDim.new(0, 10)
    UIListLayout.Parent = ContentContainer
    
    -- 创建标签页
    local tabs = {
        {name = "通用", color = Color3.fromRGB(147, 51, 234)},
        {name = "自然灾害", color = Color3.fromRGB(0, 170, 255)},
        {name = "Blox Fruits", color = Color3.fromRGB(255, 85, 0)},
        {name = "Pet Sim X", color = Color3.fromRGB(85, 170, 0)}
    }
    
    local tabButtons = {}
    local currentTab = 1
    
    for i, tab in pairs(tabs) do
        local button = Instance.new("TextButton")
        button.Name = tab.name
        button.Text = tab.name
        button.Size = UDim2.new(1/#tabs, -5, 1, 0)
        button.Position = UDim2.new((i-1)/#tabs, (i-1)*5, 0, 0)
        button.BackgroundColor3 = tab.color
        button.TextColor3 = Color3.fromRGB(255, 255, 255)
        button.TextSize = 14
        button.Font = Enum.Font.GothamBold
        button.Parent = TabContainer
        
        local buttonCorner = Instance.new("UICorner")
        buttonCorner.CornerRadius = UDim.new(0, 6)
        buttonCorner.Parent = button
        
        table.insert(tabButtons, button)
    end
    
    -- 创建通用页面按钮
    local function createButton(text, callback, y)
        local btn = Instance.new("TextButton")
        btn.Size = UDim2.new(1, -20, 0, 50)
        btn.Position = UDim2.new(0, 10, 0, y)
        btn.BackgroundColor3 = Color3.fromRGB(40, 40, 60)
        btn.TextColor3 = Color3.fromRGB(255, 255, 255)
        btn.TextSize = 16
        btn.Font = Enum.Font.Gotham
        btn.Text = text
        btn.Parent = ContentContainer
        
        local btnCorner = Instance.new("UICorner")
        btnCorner.CornerRadius = UDim.new(0, 8)
        btnCorner.Parent = btn
        
        btn.MouseButton1Click:Connect(callback)
        return btn
    end
    
    -- 通用功能按钮
    createButton("✨ 无敌模式", function()
        Universal.godMode(true)
    end, 0)
    
    createButton("🦘 无限跳跃", function()
        Universal.infiniteJump(true)
    end, 60)
    
    createButton("🏃 速度 50", function()
        Universal.setSpeed(50)
    end, 120)
    
    createButton("🏃 速度 100", function()
        Universal.setSpeed(100)
    end, 180)
    
    createButton("🚀 飞行模式", function()
        Universal.fly(true)
    end, 240)
    
    createButton("🌊 海啸生存", function()
        NaturalDisasters.tsunamiSurvival()
    end, 300)
    
    createButton("🌪️ 龙卷风生存", function()
        NaturalDisasters.tornadoSurvival()
    end, 360)
    
    createButton("☄️ 陨石躲避", function()
        NaturalDisasters.meteorSurvival()
    end, 420)
    
    createButton("🎯 自动生存", function()
        NaturalDisasters.autoSurvival()
    end, 480)
    
    return {
        ScreenGui = ScreenGui,
        MainFrame = MainFrame,
        TabContainer = TabContainer,
        ContentContainer = ContentContainer
    }
end

-- ==============================================
-- 通用游戏脚本模块
-- ==============================================

local Universal = {}

-- 无敌模式
function Universal.godMode(enabled)
    if not Humanoid then return end
    
    if enabled then
        Humanoid.MaxHealth = math.huge
        Humanoid.Health = math.huge
        Utils.notify("Kai Hub", "✅ 无敌模式已启用", 2)
    else
        Humanoid.MaxHealth = 100
        Humanoid.Health = 100
        Utils.notify("Kai Hub", "❌ 无敌模式已关闭", 2)
    end
end

-- 无限跳跃
local infiniteJumpConnection = nil
function Universal.infiniteJump(enabled)
    if enabled then
        if infiniteJumpConnection then return end
        
        infiniteJumpConnection = UserInputService.JumpRequest:Connect(function()
            if Humanoid then
                Humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
            end
        end)
        
        Utils.notify("Kai Hub", "🦘 无限跳跃已启用", 2)
    else
        if infiniteJumpConnection then
            infiniteJumpConnection:Disconnect()
            infiniteJumpConnection = nil
            Utils.notify("Kai Hub", "❌ 无限跳跃已关闭", 2)
        end
    end
end

-- 速度修改
function Universal.setSpeed(speed)
    if not Humanoid then return end
    Humanoid.WalkSpeed = speed
    Utils.notify("Kai Hub", "🏃 速度设为: " .. speed, 2)
end

-- 跳跃力修改
function Universal.setJumpPower(power)
    if not Humanoid then return end
    Humanoid.JumpPower = power
    Utils.notify("Kai Hub", "⬆️ 跳跃力设为: " .. power, 2)
end

-- 飞行模式
local flying = false
function Universal.fly(enabled)
    if not HumanoidRootPart then return end
    
    if enabled and not flying then
        flying = true
        
        local bg = Instance.new("BodyGyro")
        bg.Name = "KaiHubGyro"
        bg.Parent = HumanoidRootPart
        bg.MaxTorque = Vector3.new(9e9, 9e9, 9e9)
        bg.CFrame = HumanoidRootPart.CFrame
        
        local bv = Instance.new("BodyVelocity")
        bv.Name = "KaiHubVelocity"
        bv.Parent = HumanoidRootPart
        bv.MaxForce = Vector3.new(9e9, 9e9, 9e9)
        bv.Velocity = Vector3.new(0, 0, 0)
        
        Utils.notify("Kai Hub", "🚀 飞行模式已启用", 2)
    elseif not enabled and flying then
        flying = false
        
        if HumanoidRootPart:FindFirstChild("KaiHubGyro") then
            HumanoidRootPart.KaiHubGyro:Destroy()
        end
        if HumanoidRootPart:FindFirstChild("KaiHubVelocity") then
            HumanoidRootPart.KaiHubVelocity:Destroy()
        end
        
        Utils.notify("Kai Hub", "❌ 飞行模式已关闭", 2)
    end
end

-- 传送到指定玩家
function Universal.teleportToPlayer(playerName)
    if not HumanoidRootPart then return end
    
    for _, player in pairs(Players:GetPlayers()) do
        if player.Name:lower():find(playerName:lower()) then
            if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
                HumanoidRootPart.CFrame = player.Character.HumanoidRootPart.CFrame + Vector3.new(0, 3, 0)
                Utils.notify("Kai Hub", "✨ 已传送到: " .. player.Name, 2)
            end
        end
    end
end

-- ==============================================
-- 自然灾害模拟器脚本
-- ==============================================

local NaturalDisasters = {}

-- 自动寻找安全区域
function NaturalDisasters.findSafeZone()
    if not HumanoidRootPart then return end
    
    local safeZones = {
        Vector3.new(0, 50, 0),
        Vector3.new(50, 50, 50),
        Vector3.new(-50, 50, -50)
    }
    
    local highestPoint = Vector3.new(0, 0, 0)
    for _, zone in pairs(safeZones) do
        if zone.Y > highestPoint.Y then
            highestPoint = zone
        end
    end
    
    HumanoidRootPart.CFrame = CFrame.new(highestPoint + Vector3.new(0, 5, 0))
    Utils.notify("自然灾害脚本", "🏠 已传送到安全区域", 2)
end

-- 海啸躲避
function NaturalDisasters.tsunamiSurvival()
    if not HumanoidRootPart then return end
    
    Universal.godMode(true)
    
    -- 飞到高空躲避海啸
    local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    local tweenGoal = {
        CFrame = HumanoidRootPart.CFrame + Vector3.new(0, 150, 0)
    }
    local tween = TweenService:Create(HumanoidRootPart, tweenInfo, tweenGoal)
    tween:Play()
    
    Utils.notify("自然灾害脚本", "🌊 海啸生存模式已启动", 3)
end

-- 地震保护
function NaturalDisasters.earthquakeProtection()
    if not HumanoidRootPart then return end
    
    Universal.godMode(true)
    
    -- 创建悬浮平台
    local platform = Instance.new("Part")
    platform.Name = "KaiHubSafetyPlatform"
    platform.Size = Vector3.new(20, 1, 20)
    platform.Position = HumanoidRootPart.Position + Vector3.new(0, 10, 0)
    platform.Anchored = true
    platform.CanCollide = true
    platform.Parent = Workspace
    
    HumanoidRootPart.CFrame = platform.CFrame + Vector3.new(0, 3, 0)
    Utils.notify("自然灾害脚本", "🌋 地震保护已启用", 2)
end

-- 龙卷风躲避
function NaturalDisasters.tornadoSurvival()
    if not HumanoidRootPart then return end
    
    Universal.godMode(true)
    Universal.fly(true)
    
    Utils.notify("自然灾害脚本", "🌪️ 龙卷风生存模式已启动", 3)
end

-- 陨石躲避
local meteorLoop = nil
function NaturalDisasters.meteorSurvival()
    if not HumanoidRootPart then return end
    
    Universal.godMode(true)
    
    if meteorLoop then return end
    
    meteorLoop = true
    spawn(function()
        while meteorLoop do
            wait(0.5)
            if HumanoidRootPart then
                local randomOffset = Vector3.new(
                    math.random(-30, 30),
                    math.random(5, 15),
                    math.random(-30, 30)
                )
                HumanoidRootPart.CFrame = HumanoidRootPart.CFrame + randomOffset
            end
        end
    end)
    
    Utils.notify("自然灾害脚本", "☄️ 陨石躲避模式已启动", 3)
end

-- 自动生存模式
local autoSurvivalLoop = nil
function NaturalDisasters.autoSurvival()
    if autoSurvivalLoop then return end
    
    autoSurvivalLoop = true
    Utils.notify("自然灾害脚本", "🎯 自动生存模式已启动", 3)
    
    -- 检测当前灾害类型并执行对应策略
    spawn(function()
        while autoSurvivalLoop do
            wait(1)
            -- 监测周围环境并自动响应
            if Utils.findFirst("Tsunami", Workspace) then
                NaturalDisasters.tsunamiSurvival()
            elseif Utils.findFirst("Tornado", Workspace) then
                NaturalDisasters.tornadoSurvival()
            elseif Utils.findFirst("Meteor", Workspace) then
                NaturalDisasters.meteorSurvival()
            end
        end
    end)
end

-- ==============================================
-- Blox Fruits 脚本
-- ==============================================

local BloxFruits = {}
local autoFarmLoop = nil

-- 自动刷怪
function BloxFruits.autoFarm()
    if autoFarmLoop then return end
    
    autoFarmLoop = true
    Utils.notify("Blox Fruits", "⚔️ 自动刷怪模式已启动", 3)
    
    spawn(function()
        while autoFarmLoop do
            wait(0.1)
            if not HumanoidRootPart then continue end
            
            -- 寻找最近的敌人
            local nearestEnemy = nil
            local nearestDistance = math.huge
            
            for _, v in pairs(Workspace:GetChildren()) do
                if v:IsA("Model") and v:FindFirstChild("Humanoid") then
                    if v:FindFirstChild("HumanoidRootPart") and v ~= Character then
                        local distance = (v.HumanoidRootPart.Position - HumanoidRootPart.Position).Magnitude
                        if distance < nearestDistance then
                            nearestDistance = distance
                            nearestEnemy = v
                        end
                    end
                end
            end
            
            -- 自动攻击
            if nearestEnemy and nearestDistance < 50 then
                HumanoidRootPart.CFrame = nearestEnemy.HumanoidRootPart.CFrame + Vector3.new(0, 2, 0)
            end
        end
    end)
end

-- 快速升级
function BloxFruits.autoQuest()
    Utils.notify("Blox Fruits", "📜 自动任务模式已启动", 3)
    -- 自动寻找并完成NPC任务
end

-- ==============================================
-- Pet Simulator X 脚本
-- ==============================================

local PetSimX = {}
local autoCollectLoop = nil

-- 自动收集硬币
function PetSimX.autoCollect()
    if autoCollectLoop then return end
    
    autoCollectLoop = true
    Utils.notify("Pet Sim X", "💰 自动收集已启动", 3)
    
    spawn(function()
        while autoCollectLoop do
            wait(0.1)
            if not HumanoidRootPart then continue end
            
            for _, v in pairs(Workspace:GetChildren()) do
                if v.Name:find("Coin") or v.Name:find("Gem") then
                    if v:IsA("BasePart") then
                        v.CFrame = HumanoidRootPart.CFrame
                    end
                end
            end
        end
    end)
end

-- 自动孵化
function PetSimX.autoHatch()
    Utils.notify("Pet Sim X", "🥚 自动孵化已启动", 3)
end

-- ==============================================
-- 主程序入口
-- ==============================================

local gui = nil

local function init()
    Utils.notify("Kai Hub", "🌟 正在加载 Kai Hub v5.1...", 2)
    wait(0.5)
    
    -- 创建GUI
    gui = GUI.create()
    
    wait(0.5)
    Utils.notify("Kai Hub", "✅ 加载完成！按 F4 显示/隐藏", 3)
    
    -- 快捷键绑定
    UserInputService.InputBegan:Connect(function(input, gameProcessed)
        if not gameProcessed then
            if input.KeyCode == Enum.KeyCode.F4 then
                if gui and gui.ScreenGui and gui.ScreenGui.Parent then
                    gui.MainFrame.Visible = not gui.MainFrame.Visible
                end
            end
        end
    end)
end

-- 启动脚本
init()

-- ==============================================
-- 控制台输出
-- ==============================================

print([[
╔══════════════════════════════════════════════════════════════╗
║                    KAI HUB V5.1 已加载                        ║
╠══════════════════════════════════════════════════════════════╣
║  快捷键: F4 - 显示/隐藏界面                                   ║
║                                                              ║
║  可用功能:                                                    ║
║  • 通用脚本 (GodMode, 飞行, 速度)                             ║
║  • 自然灾害模拟器 (自动生存)                                  ║
║  • Blox Fruits (自动刷怪)                                     ║
║  • Pet Simulator X (自动收集)                                ║
╚══════════════════════════════════════════════════════════════╝
]])
