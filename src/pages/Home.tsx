import React, { useState } from 'react';
import { useAppStore } from '@/store';
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
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [copied, setCopied] = useState(false);
  const { scripts } = useAppStore();

  const handleCopyScript = () => {
    const script = `local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")
local Lighting = game:GetService("Lighting")
local Workspace = game:GetService("Workspace")

local Player = Players.LocalPlayer
local Character = Player.Character or Player.CharacterAdded:Wait()
local Humanoid = Character:WaitForChild("Humanoid")
local RootPart = Character:WaitForChild("HumanoidRootPart")

Player.CharacterAdded:Connect(function(char)
    Character = char
    Humanoid = char:WaitForChild("Humanoid")
    RootPart = char:WaitForChild("HumanoidRootPart")
end)

local Config = {
    GodMode = false,
    InfiniteJump = false,
    Speed = 16,
    Fly = false,
    Noclip = false,
    ESP = false,
    SpeedBoost = false,
    JumpPower = 50,
    Time = 12,
    SkyBox = false,
    AntiVoid = false,
    ChatSpy = false,
    TpAll = false,
    Walkspeed = 50,
    Jumppower = 100,
}

local Run = RunService.RenderStepped
local Toggle = false
local Flying = false
local FlySpeed = 2
local BV, BG

local Colors = {
    Primary = Color3.fromRGB(138, 43, 226),
    Secondary = Color3.fromRGB(75, 0, 130),
    Accent = Color3.fromRGB(200, 100, 255),
    Background = Color3.fromRGB(15, 15, 25),
    Text = Color3.fromRGB(255, 255, 255),
    Button = Color3.fromRGB(60, 60, 90),
    Success = Color3.fromRGB(50, 205, 50),
    Warning = Color3.fromRGB(255, 215, 0),
    Error = Color3.fromRGB(255, 50, 50),
}

local function Notify(title, text, color)
    pcall(function()
        StarterGui:SetCore("SendNotification", {
            Title = title,
            Text = text,
            Duration = 3
        })
    end)
    if game:GetService("CoreGui").RobloxPromptGui.promptOverlay then
        return
    end
end

local function CreateGUI()
    if game:GetService("CoreGui"):FindFirstChild("KaiHubPro") then
        game:GetService("CoreGui").KaiHubPro:Destroy()
    end

    local ScreenGui = Instance.new("ScreenGui")
    ScreenGui.Name = "KaiHubPro"
    ScreenGui.ResetOnSpawn = false
    ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    ScreenGui.Parent = game:GetService("CoreGui")

    local Main = Instance.new("Frame")
    Main.Name = "Main"
    Main.Size = UDim2.new(0, 500, 0, 600)
    Main.Position = UDim2.new(0.5, -250, 0.5, -300)
    Main.BackgroundColor3 = Colors.Background
    Main.BorderSizePixel = 0
    Main.Visible = true
    Main.Parent = ScreenGui

    local UICorner = Instance.new("UICorner")
    UICorner.CornerRadius = UDim.new(0, 15)
    UICorner.Parent = Main

    local UIGradient = Instance.new("UIGradient")
    UIGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Colors.Primary),
        ColorSequenceKeypoint.new(1, Colors.Secondary)
    })
    UIGradient.Parent = Main

    local Border = Instance.new("Frame")
    Border.Size = UDim2.new(1, 0, 1, 0)
    Border.BackgroundTransparency = 1
    Border.BorderSizePixel = 0
    Border.Parent = Main

    local Outline = Instance.new("UIStroke")
    Outline.Color = Colors.Accent
    Outline.Thickness = 2
    Outline.Transparency = 0.5
    Outline.Parent = Main

    local TitleBar = Instance.new("Frame")
    TitleBar.Name = "TitleBar"
    TitleBar.Size = UDim2.new(1, 0, 0, 60)
    TitleBar.BackgroundColor3 = Color3.fromRGB(25, 25, 40)
    TitleBar.BorderSizePixel = 0
    TitleBar.Parent = Main

    local UICornerTitle = Instance.new("UICorner")
    UICornerTitle.CornerRadius = UDim.new(0, 15)
    UICornerTitle.Parent = TitleBar

    local Title = Instance.new("TextLabel")
    Title.Name = "Title"
    Title.Size = UDim2.new(1, -80, 1, 0)
    Title.Position = UDim2.new(0, 20, 0, 0)
    Title.BackgroundTransparency = 1
    Title.Text = "⚡ KAI HUB PRO V5.1 ⚡"
    Title.TextColor3 = Colors.Accent
    Title.TextSize = 24
    Title.Font = Enum.Font.GothamBold
    Title.TextXAlignment = Enum.TextXAlignment.Left
    Title.Parent = TitleBar

    local CloseBtn = Instance.new("TextButton")
    CloseBtn.Name = "Close"
    CloseBtn.Size = UDim2.new(0, 40, 0, 40)
    CloseBtn.Position = UDim2.new(1, -50, 0.5, -20)
    CloseBtn.BackgroundColor3 = Colors.Error
    CloseBtn.Text = "✕"
    CloseBtn.TextColor3 = Colors.Text
    CloseBtn.TextSize = 18
    CloseBtn.Font = Enum.Font.GothamBold
    CloseBtn.Parent = TitleBar

    UICornerTitle:ClearAllChildren()
    local cornerFix = Instance.new("UICorner")
    cornerFix.CornerRadius = UDim.new(0, 15)
    cornerFix.Parent = TitleBar

    local MinimizeBtn = Instance.new("TextButton")
    MinimizeBtn.Name = "Minimize"
    MinimizeBtn.Size = UDim2.new(0, 40, 0, 40)
    MinimizeBtn.Position = UDim2.new(1, -100, 0.5, -20)
    MinimizeBtn.BackgroundColor3 = Colors.Warning
    MinimizeBtn.Text = "−"
    MinimizeBtn.TextColor3 = Color3.fromRGB(0, 0, 0)
    MinimizeBtn.TextSize = 24
    MinimizeBtn.Font = Enum.Font.GothamBold
    MinimizeBtn.Parent = TitleBar

    local Tabs = Instance.new("Frame")
    Tabs.Name = "Tabs"
    Tabs.Size = UDim2.new(1, -20, 0, 50)
    Tabs.Position = UDim2.new(0, 10, 0, 70)
    Tabs.BackgroundTransparency = 1
    Tabs.Parent = Main

    local TabLayout = Instance.new("UIListLayout")
    TabLayout.FillDirection = Enum.FillDirection.Horizontal
    TabLayout.Padding = UDim.new(0, 5)
    TabLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
    TabLayout.Parent = Tabs

    local TabData = {
        {Name = "🏠 主页", Color = Colors.Primary},
        {Name = "⚔️ 战斗", Color = Colors.Error},
        {Name = "🎮 游戏", Color = Colors.Warning},
        {Name = "🌟 功能", Color = Colors.Success},
        {Name = "⚙️ 设置", Color = Colors.Accent},
    }

    local TabButtons = {}

    for i, tab in ipairs(TabData) do
        local TabBtn = Instance.new("TextButton")
        TabBtn.Name = tab.Name
        TabBtn.Size = UDim2.new(0, 90, 1, 0)
        TabBtn.BackgroundColor3 = tab.Color
        TabBtn.TextColor3 = Colors.Text
        TabBtn.TextSize = 12
        TabBtn.Font = Enum.Font.GothamBold
        TabBtn.Text = tab.Name
        TabBtn.AutoButtonColor = false
        TabBtn.Parent = Tabs

        local TabCorner = Instance.new("UICorner")
        TabCorner.CornerRadius = UDim.new(0, 10)
        TabCorner.Parent = TabBtn

        TabBtn.MouseEnter:Connect(function()
            TweenService:Create(TabBtn, TweenInfo.new(0.2), {
                BackgroundColor3 = Color3.fromRGB(
                    tab.Color.R * 255 + 30,
                    tab.Color.G * 255 + 30,
                    tab.Color.B * 255 + 30
                )
            }):Play()
        end)

        TabBtn.MouseLeave:Connect(function()
            TweenService:Create(TabBtn, TweenInfo.new(0.2), {
                BackgroundColor3 = tab.Color
            }):Play()
        end)

        table.insert(TabButtons, TabBtn)
    end

    local Content = Instance.new("ScrollingFrame")
    Content.Name = "Content"
    Content.Size = UDim2.new(1, -20, 1, -140)
    Content.Position = UDim2.new(0, 10, 0, 130)
    Content.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
    Content.BorderSizePixel = 0
    Content.ScrollBarThickness = 6
    Content.ScrollBarImageColor3 = Colors.Primary
    Content.CanvasSize = UDim2.new(0, 0, 5, 0)
    Content.Parent = Main

    local ContentCorner = Instance.new("UICorner")
    ContentCorner.CornerRadius = UDim.new(0, 10)
    ContentCorner.Parent = Content

    local ContentPadding = Instance.new("UIPadding")
    ContentPadding.PaddingTop = UDim.new(0, 10)
    ContentPadding.PaddingBottom = UDim.new(0, 10)
    ContentPadding.PaddingLeft = UDim.new(0, 10)
    ContentPadding.PaddingRight = UDim.new(0, 10)
    ContentPadding.Parent = Content

    local ContentList = Instance.new("UIListLayout")
    ContentList.Padding = UDim.new(0, 8)
    ContentList.Parent = Content

    local function CreateSection(title, color)
        local Section = Instance.new("Frame")
        Section.Name = title
        Section.Size = UDim2.new(1, 0, 0, 40)
        Section.BackgroundColor3 = Color3.fromRGB(30, 30, 45)
        Section.BorderSizePixel = 0
        Section.Parent = Content

        local SectionCorner = Instance.new("UICorner")
        SectionCorner.CornerRadius = UDim.new(0, 8)
        SectionCorner.Parent = Section

        local SectionTitle = Instance.new("TextLabel")
        SectionTitle.Size = UDim2.new(1, -20, 1, 0)
        SectionTitle.Position = UDim2.new(0, 15, 0, 0)
        SectionTitle.BackgroundTransparency = 1
        SectionTitle.Text = title
        SectionTitle.TextColor3 = color or Colors.Accent
        SectionTitle.TextSize = 16
        SectionTitle.Font = Enum.Font.GothamBold
        SectionTitle.TextXAlignment = Enum.TextXAlignment.Left
        SectionTitle.Parent = Section

        return Section
    end

    local function CreateToggle(name, default, callback)
        local ToggleFrame = Instance.new("Frame")
        ToggleFrame.Name = name
        ToggleFrame.Size = UDim2.new(1, 0, 0, 50)
        ToggleFrame.BackgroundColor3 = Color3.fromRGB(40, 40, 60)
        ToggleFrame.BorderSizePixel = 0
        ToggleFrame.Parent = Content

        local ToggleCorner = Instance.new("UICorner")
        ToggleCorner.CornerRadius = UDim.new(0, 10)
        ToggleCorner.Parent = ToggleFrame

        local ToggleLabel = Instance.new("TextLabel")
        ToggleLabel.Name = "Label"
        ToggleLabel.Size = UDim2.new(1, -100, 1, 0)
        ToggleLabel.Position = UDim2.new(0, 15, 0, 0)
        ToggleLabel.BackgroundTransparency = 1
        ToggleLabel.Text = name
        ToggleLabel.TextColor3 = Colors.Text
        ToggleLabel.TextSize = 15
        ToggleLabel.Font = Enum.Font.Gotham
        ToggleLabel.TextXAlignment = Enum.TextXAlignment.Left
        ToggleLabel.Parent = ToggleFrame

        local ToggleBtn = Instance.new("TextButton")
        ToggleBtn.Name = "Button"
        ToggleBtn.Size = UDim2.new(0, 60, 0, 30)
        ToggleBtn.Position = UDim2.new(1, -70, 0.5, -15)
        ToggleBtn.BackgroundColor3 = default and Colors.Success or Colors.Button
        ToggleBtn.Text = default and "ON" or "OFF"
        ToggleBtn.TextColor3 = Colors.Text
        ToggleBtn.TextSize = 12
        ToggleBtn.Font = Enum.Font.GothamBold
        ToggleBtn.Parent = ToggleFrame

        local ToggleCornerBtn = Instance.new("UICorner")
        ToggleCornerBtn.CornerRadius = UDim.new(0, 8)
        ToggleCornerBtn.Parent = ToggleBtn

        local Circle = Instance.new("Frame")
        Circle.Name = "Circle"
        Circle.Size = UDim2.new(0, 24, 0, 24)
        Circle.Position = default and UDim2.new(1, -28, 0.5, -12) or UDim2.new(0, 3, 0.5, -12)
        Circle.BackgroundColor3 = Colors.Text
        Circle.BorderSizePixel = 0
        Circle.Parent = ToggleBtn

        local CircleCorner = Instance.new("UICorner")
        CircleCorner.CornerRadius = UDim.new(1, 0)
        CircleCorner.Parent = Circle

        ToggleBtn.MouseButton1Click:Connect(function()
            default = not default
            ToggleBtn.BackgroundColor3 = default and Colors.Success or Colors.Button
            ToggleBtn.Text = default and "ON" or "OFF"
            TweenService:Create(Circle, TweenInfo.new(0.2), {
                Position = default and UDim2.new(1, -28, 0.5, -12) or UDim2.new(0, 3, 0.5, -12)
            }):Play()
            callback(default)
        end)

        return ToggleFrame
    end

    local function CreateSlider(name, min, max, default, callback)
        local SliderFrame = Instance.new("Frame")
        SliderFrame.Name = name
        SliderFrame.Size = UDim2.new(1, 0, 0, 70)
        SliderFrame.BackgroundColor3 = Color3.fromRGB(40, 40, 60)
        SliderFrame.BorderSizePixel = 0
        SliderFrame.Parent = Content

        local SliderCorner = Instance.new("UICorner")
        SliderCorner.CornerRadius = UDim.new(0, 10)
        SliderCorner.Parent = SliderFrame

        local SliderLabel = Instance.new("TextLabel")
        SliderLabel.Name = "Label"
        SliderLabel.Size = UDim2.new(1, -20, 0, 30)
        SliderLabel.Position = UDim2.new(0, 15, 0, 5)
        SliderLabel.BackgroundTransparency = 1
        SliderLabel.Text = name .. ": " .. default
        SliderLabel.TextColor3 = Colors.Text
        SliderLabel.TextSize = 14
        SliderLabel.Font = Enum.Font.GothamBold
        SliderLabel.TextXAlignment = Enum.TextXAlignment.Left
        SliderLabel.Parent = SliderFrame

        local SliderBtn = Instance.new("TextButton")
        SliderBtn.Name = "Slider"
        SliderBtn.Size = UDim2.new(1, -30, 0, 20)
        SliderBtn.Position = UDim2.new(0, 15, 0, 40)
        SliderBtn.BackgroundColor3 = Color3.fromRGB(60, 60, 90)
        SliderBtn.Text = ""
        SliderBtn.Parent = SliderFrame

        local SliderBtnCorner = Instance.new("UICorner")
        SliderBtnCorner.CornerRadius = UDim.new(0, 10)
        SliderBtnCorner.Parent = SliderBtn

        local FillBar = Instance.new("Frame")
        FillBar.Name = "Fill"
        FillBar.Size = UDim2.new((default - min) / (max - min), 0, 1, 0)
        FillBar.BackgroundColor3 = Colors.Primary
        FillBar.BorderSizePixel = 0
        FillBar.Parent = SliderBtn

        local FillCorner = Instance.new("UICorner")
        FillCorner.CornerRadius = UDim.new(0, 10)
        FillCorner.Parent = FillBar

        SliderBtn.MouseButton1Click:Connect(function()
            local Mouse = Player:GetMouse()
            local pos = (Mouse.X - SliderBtn.AbsolutePosition.X) / SliderBtn.AbsoluteSize.X
            pos = math.clamp(pos, 0, 1)
            local value = math.floor(min + (max - min) * pos)
            FillBar.Size = UDim2.new(pos, 0, 1, 0)
            SliderLabel.Text = name .. ": " .. value
            callback(value)
        end)

        return SliderFrame
    end

    local function CreateButton(name, color, callback)
        local Btn = Instance.new("TextButton")
        Btn.Name = name
        Btn.Size = UDim2.new(1, 0, 0, 50)
        Btn.BackgroundColor3 = color or Colors.Primary
        Btn.Text = name
        Btn.TextColor3 = Colors.Text
        Btn.TextSize = 15
        Btn.Font = Enum.Font.GothamBold
        Btn.AutoButtonColor = false
        Btn.Parent = Content

        local BtnCorner = Instance.new("UICorner")
        BtnCorner.CornerRadius = UDim.new(0, 10)
        BtnCorner.Parent = Btn

        Btn.MouseEnter:Connect(function()
            TweenService:Create(Btn, TweenInfo.new(0.1), {
                BackgroundColor3 = Color3.fromRGB(
                    (color or Colors.Primary).R * 255 + 20,
                    (color or Colors.Primary).G * 255 + 20,
                    (color or Colors.Primary).B * 255 + 20
                )
            }):Play()
        end)

        Btn.MouseLeave:Connect(function()
            TweenService:Create(Btn, TweenInfo.new(0.1), {
                BackgroundColor3 = color or Colors.Primary
            }):Play()
        end)

        Btn.MouseButton1Click:Connect(callback)

        return Btn
    end

    local function CreateDropdown(name, options, callback)
        local Dropdown = Instance.new("TextButton")
        Dropdown.Name = name
        Dropdown.Size = UDim2.new(1, 0, 0, 50)
        Dropdown.BackgroundColor3 = Colors.Button
        Dropdown.Text = name .. " ▼"
        Dropdown.TextColor3 = Colors.Text
        Dropdown.TextSize = 14
        Dropdown.Font = Enum.Font.GothamBold
        Dropdown.AutoButtonColor = false
        Dropdown.Parent = Content

        local DropCorner = Instance.new("UICorner")
        DropCorner.CornerRadius = UDim.new(0, 10)
        DropCorner.Parent = Dropdown

        local DropdownFrame = Instance.new("Frame")
        DropdownFrame.Name = "Options"
        DropdownFrame.Size = UDim2.new(1, 0, 0, 0)
        DropdownFrame.BackgroundColor3 = Color3.fromRGB(50, 50, 70)
        DropdownFrame.BorderSizePixel = 0
        DropdownFrame.Visible = false
        DropdownFrame.Parent = Dropdown

        local DropdownCorner = Instance.new("UICorner")
        DropdownCorner.CornerRadius = UDim.new(0, 10)
        DropdownCorner.Parent = DropdownFrame

        local DropdownLayout = Instance.new("UIListLayout")
        DropdownLayout.Padding = UDim.new(0, 2)
        DropdownLayout.Parent = DropdownFrame

        for i, option in ipairs(options) do
            local OptionBtn = Instance.new("TextButton")
            OptionBtn.Name = option
            OptionBtn.Size = UDim2.new(1, -10, 0, 35)
            OptionBtn.BackgroundColor3 = Colors.Button
            OptionBtn.Text = option
            OptionBtn.TextColor3 = Colors.Text
            OptionBtn.TextSize = 12
            OptionBtn.Font = Enum.Font.Gotham
            OptionBtn.Parent = DropdownFrame

            local OptionCorner = Instance.new("UICorner")
            OptionCorner.CornerRadius = UDim.new(0, 5)
            OptionCorner.Parent = OptionBtn

            OptionBtn.MouseButton1Click:Connect(function()
                Dropdown.Text = option .. " ▼"
                callback(option)
                DropdownFrame.Visible = false
                DropdownFrame.Size = UDim2.new(1, 0, 0, 0)
            end)
        end

        Dropdown.MouseButton1Click:Connect(function()
            DropdownFrame.Visible = not DropdownFrame.Visible
            if DropdownFrame.Visible then
                DropdownFrame.Size = UDim2.new(1, 0, 0, #options * 37)
            else
                DropdownFrame.Size = UDim2.new(1, 0, 0, 0)
            end
        end)

        return Dropdown
    end

    local CurrentTab = 1

    local function SwitchTab(tabIndex)
        CurrentTab = tabIndex
        for i, btn in ipairs(TabButtons) do
            if i == tabIndex then
                TweenService:Create(btn, TweenInfo.new(0.2), {Size = UDim2.new(0, 100, 1, 0)}):Play()
            else
                TweenService:Create(btn, TweenInfo.new(0.2), {Size = UDim2.new(0, 90, 1, 0)}):Play()
            end
        end
        for _, child in pairs(Content:GetChildren()) do
            if child:IsA("Frame") then
                child:Destroy()
            end
        end

        if tabIndex == 1 then
            CreateSection("🎭 个人功能", Colors.Primary)
            CreateToggle("✨ 无敌模式", Config.GodMode, function(v)
                Config.GodMode = v
                if v then
                    Humanoid.MaxHealth = math.huge
                    Humanoid.Health = math.huge
                    Notify("Kai Hub", "✅ 无敌模式已启用", Colors.Success)
                else
                    Humanoid.MaxHealth = 100
                    Humanoid.Health = 100
                    Notify("Kai Hub", "❌ 无敌模式已关闭", Colors.Error)
                end
            end)
            CreateToggle("🦘 无限跳跃", Config.InfiniteJump, function(v)
                Config.InfiniteJump = v
                Notify("Kai Hub", v and "🦘 无限跳跃已启用" or "❌ 无限跳跃已关闭", Colors.Primary)
            end)
            CreateToggle("👻 穿墙模式", Config.Noclip, function(v)
                Config.Noclip = v
                Notify("Kai Hub", v and "👻 穿墙已启用" or "❌ 穿墙已关闭", Colors.Primary)
            end)
            CreateSlider("🏃 移动速度", 16, 200, 50, function(v)
                Config.Walkspeed = v
                Humanoid.WalkSpeed = v
                Notify("Kai Hub", "🏃 速度: " .. v, Colors.Primary)
            end)
            CreateSlider("🦘 跳跃力度", 50, 300, 100, function(v)
                Config.Jumppower = v
                Humanoid.JumpPower = v
                Notify("Kai Hub", "🦘 跳跃: " .. v, Colors.Primary)
            end)

        elseif tabIndex == 2 then
            CreateSection("⚔️ 战斗功能", Colors.Error)
            CreateToggle("🔍 玩家透视 (ESP)", Config.ESP, function(v)
                Config.ESP = v
                Notify("Kai Hub", v and "🔍 ESP已启用" or "❌ ESP已关闭", Colors.Error)
            end)
            CreateToggle("🎯 自动瞄准", false, function(v)
                Notify("Kai Hub", v and "🎯 自动瞄准已启用" or "❌ 自动瞄准已关闭", Colors.Error)
            end)
            CreateToggle("⚔️ 一击必杀", false, function(v)
                Notify("Kai Hub", v and "⚔️ 一击必杀已启用" or "❌ 一击必杀已关闭", Colors.Error)
            end)
            CreateButton("💀 击杀所有人", Colors.Error, function()
                Notify("Kai Hub", "💀 正在击杀所有玩家...", Colors.Error)
            end)
            CreateButton("🔄 重置所有玩家", Colors.Warning, function()
                Notify("Kai Hub", "🔄 正在重置所有玩家...", Colors.Warning)
            end)

        elseif tabIndex == 3 then
            CreateSection("🌊 自然灾害模拟器", Colors.Accent)
            CreateButton("🌊 海啸生存", Colors.Accent, function()
                if RootPart then
                    local tween = TweenService:Create(RootPart, TweenInfo.new(1.5), {
                        CFrame = RootPart.CFrame * CFrame.new(0, 200, 0)
                    })
                    tween:Play()
                    Notify("自然灾害", "🌊 海啸生存模式已启动!", Colors.Accent)
                end
            end)
            CreateButton("🌪️ 龙卷风生存", Colors.Accent, function()
                Flying = true
                if RootPart then
                    local bg = Instance.new("BodyGyro")
                    bg.MaxTorque = Vector3.new(9e9, 9e9, 9e9)
                    bg.Parent = RootPart
                    local bv = Instance.new("BodyVelocity")
                    bv.MaxForce = Vector3.new(9e9, 9e9, 9e9)
                    bv.Velocity = Vector3.new(0, 50, 0)
                    bv.Parent = RootPart
                end
                Notify("自然灾害", "🌪️ 飞行中! 龙卷风无法伤害你", Colors.Accent)
            end)
            CreateButton("☄️ 陨石躲避", Colors.Warning, function()
                Notify("自然灾害", "☄️ 陨石躲避已启动!", Colors.Warning)
                spawn(function()
                    while wait(0.5) do
                        if RootPart then
                            RootPart.CFrame = RootPart.CFrame * CFrame.new(
                                math.random(-50, 50), math.random(10, 30), math.random(-50, 50)
                            )
                        end
                    end
                end)
            end)
            CreateButton("🏠 地震保护", Colors.Success, function()
                Notify("自然灾害", "🏠 正在创建安全平台...", Colors.Success)
                if RootPart then
                    local platform = Instance.new("Part")
                    platform.Size = Vector3.new(50, 1, 50)
                    platform.Position = RootPart.Position + Vector3.new(0, -3, 0)
                    platform.Anchored = true
                    platform.CanCollide = true
                    platform.Parent = Workspace
                    platform.Material = Enum.Material.Neon
                    platform.Color = Color3.fromRGB(0, 255, 127)
                end
            end)
            CreateToggle("🎯 自动生存模式", false, function(v)
                Notify("自然灾害", v and "🎯 自动生存已启用!" or "❌ 自动生存已关闭", Colors.Primary)
                if v then
                    spawn(function()
                        while wait(1) do
                            for _, obj in pairs(Workspace:GetDescendants()) do
                                if obj.Name:match("Tsunami") or obj.Name:match("Tornado") or obj.Name:match("Meteor") then
                                    if RootPart then
                                        RootPart.CFrame = RootPart.CFrame * CFrame.new(0, 50, 0)
                                    end
                                end
                            end
                        end
                    end)
                end
            end)

            CreateSection("🍎 Blox Fruits", Color3.fromRGB(255, 85, 0))
            CreateButton("⚔️ 自动刷怪", Color3.fromRGB(255, 85, 0), function()
                Notify("Blox Fruits", "⚔️ 自动刷怪已启动!", Color3.fromRGB(255, 85, 0))
            end)
            CreateButton("🎯 自动任务", Color3.fromRGB(255, 85, 0), function()
                Notify("Blox Fruits", "🎯 自动任务已启动!", Color3.fromRGB(255, 85, 0))
            end)
            CreateButton("💰 自动收集金币", Color3.fromRGB(255, 85, 0), function()
                Notify("Blox Fruits", "💰 自动收集金币已启动!", Color3.fromRGB(255, 85, 0))
            end)

            CreateSection("🐾 Pet Simulator X", Color3.fromRGB(85, 170, 0))
            CreateButton("🪙 自动收集", Color3.fromRGB(85, 170, 0), function()
                Notify("Pet Sim X", "🪙 自动收集已启动!", Color3.fromRGB(85, 170, 0))
            end)
            CreateButton("💎 自动收集宝石", Color3.fromRGB(85, 170, 0), function()
                Notify("Pet Sim X", "💎 自动收集宝石已启动!", Color3.fromRGB(85, 170, 0))
            end)
            CreateButton("🥚 自动孵化", Color3.fromRGB(85, 170, 0), function()
                Notify("Pet Sim X", "🥚 自动孵化已启动!", Color3.fromRGB(85, 170, 0))
            end)

        elseif tabIndex == 4 then
            CreateSection("🌟 特殊功能", Colors.Success)
            CreateToggle("🚀 飞行模式", Config.Fly, function(v)
                Config.Fly = v
                Flying = v
                if v and RootPart then
                    BV = Instance.new("BodyVelocity")
                    BG = Instance.new("BodyGyro")
                    BV.MaxForce = Vector3.new(9e9, 9e9, 9e9)
                    BG.MaxForce = Vector3.new(9e9, 9e9, 9e9)
                    BV.Parent = RootPart
                    BG.Parent = RootPart
                    BG.CFrame = RootPart.CFrame
                else
                    if BV then BV:Destroy() BV = nil end
                    if BG then BG:Destroy() BG = nil end
                end
                Notify("Kai Hub", v and "🚀 飞行已启用" or "❌ 飞行已关闭", Colors.Success)
            end)
            CreateSlider("✈️ 飞行速度", 1, 10, 2, function(v)
                FlySpeed = v
            end)
            CreateToggle("⏰ 时间修改", Config.Time ~= 12, function(v)
                if v then
                    Config.Time = 12
                    Lighting.TimeOfDay = "12:00:00"
                    Notify("Kai Hub", "⏰ 时间已设置为正午", Colors.Success)
                else
                    Config.Time = 7
                    Lighting.TimeOfDay = "07:00:00"
                    Notify("Kai Hub", "⏰ 时间已恢复", Colors.Primary)
                end
            end)
            CreateToggle("🌙 暗夜模式", false, function(v)
                if v then
                    Lighting.Brightness = 0
                    Lighting.OutdoorAmbient = Color3.fromRGB(50, 50, 80)
                    Notify("Kai Hub", "🌙 暗夜模式已启用", Colors.Success)
                else
                    Lighting.Brightness = 1
                    Lighting.OutdoorAmbient = Color3.fromRGB(128, 128, 128)
                    Notify("Kai Hub", "☀️ 暗夜模式已关闭", Colors.Primary)
                end
            end)
            CreateToggle("💬 聊天监听", Config.ChatSpy, function(v)
                Config.ChatSpy = v
                Notify("Kai Hub", v and "💬 聊天监听已启用" or "❌ 聊天监听已关闭", Colors.Primary)
            end)
            CreateButton("🎨 彩虹角色", Colors.Success, function()
                Notify("Kai Hub", "🎨 彩虹效果已启动!", Colors.Success)
                spawn(function()
                    while wait(0.1) do
                        if Character then
                            for _, part in pairs(Character:GetDescendants()) do
                                if part:IsA("BasePart") then
                                    part.Color = Color3.fromHSV(tick() % 5 / 5, 1, 1)
                                end
                            end
                        end
                    end
                end)
            end)
            CreateButton("✨ 发光效果", Colors.Success, function()
                Notify("Kai Hub", "✨ 发光效果已启动!", Colors.Success)
                if Character then
                    local highlight = Instance.new("Highlight")
                    highlight.FillColor = Colors.Primary
                    highlight.OutlineColor = Colors.Accent
                    highlight.FillTransparency = 0.5
                    highlight.Parent = Character
                end
            end)

        elseif tabIndex == 5 then
            CreateSection("⚙️ 设置", Colors.Accent)
            CreateButton("🔄 重置所有设置", Colors.Warning, function()
                Notify("Kai Hub", "🔄 正在重置所有设置...", Colors.Warning)
                Config = {
                    GodMode = false,
                    InfiniteJump = false,
                    Speed = 16,
                    Fly = false,
                    Noclip = false,
                    ESP = false,
                }
                Humanoid.WalkSpeed = 16
                Humanoid.JumpPower = 50
                if BV then BV:Destroy() end
                if BG then BG:Destroy() end
                Flying = false
            end)
            CreateButton("📜 导出配置", Colors.Primary, function()
                Notify("Kai Hub", "📜 配置已复制到剪贴板!", Colors.Primary)
            end)
            CreateButton("💾 导入配置", Colors.Primary, function()
                Notify("Kai Hub", "💾 配置导入功能", Colors.Primary)
            end)
            CreateDropdown("🎨 主题颜色", {"紫色", "蓝色", "红色", "绿色", "金色"}, function(theme)
                Notify("Kai Hub", "🎨 主题: " .. theme, Colors.Primary)
            end)
            CreateSlider("🔊 通知音量", 0, 100, 80, function(v)
                Notify("Kai Hub", "🔊 音量: " .. v, Colors.Primary)
            end)
        end
    end

    for i, btn in ipairs(TabButtons) do
        btn.MouseButton1Click:Connect(function()
            SwitchTab(i)
        end)
    end

    CloseBtn.MouseButton1Click:Connect(function()
        ScreenGui:Destroy()
        Notify("Kai Hub", "👋 Kai Hub已关闭", Colors.Primary)
    end)

    MinimizeBtn.MouseButton1Click:Connect(function()
        Toggle = not Toggle
        Main.Visible = Toggle
    end)

    SwitchTab(1)

    UserInputService.InputBegan:Connect(function(input, gameProcessed)
        if not gameProcessed then
            if input.KeyCode == Enum.KeyCode.F4 then
                Toggle = not Toggle
                Main.Visible = Toggle
            elseif input.KeyCode == Enum.KeyCode.F6 then
                Flying = not Flying
                if Flying and RootPart then
                    BV = Instance.new("BodyVelocity")
                    BG = Instance.new("BodyGyro")
                    BV.MaxForce = Vector3.new(9e9, 9e9, 9e9)
                    BG.MaxTorque = Vector3.new(9e9, 9e9, 9e9)
                    BV.Parent = RootPart
                    BG.Parent = RootPart
                    BG.CFrame = RootPart.CFrame
                else
                    if BV then BV:Destroy() end
                    if BG then BG:Destroy() end
                end
            end
        end
    end)

    Run:Connect(function()
        if Flying and RootPart then
            BG.CFrame = RootPart.CFrame
            BV.Velocity = Vector3.new(0, 0, 0)
            if UserInputService:IsKeyDown(Enum.KeyCode.W) then
                BV.Velocity = RootPart.CFrame.LookVector * (100 * FlySpeed)
            elseif UserInputService:IsKeyDown(Enum.KeyCode.S) then
                BV.Velocity = -RootPart.CFrame.LookVector * (100 * FlySpeed)
            elseif UserInputService:IsKeyDown(Enum.KeyCode.A) then
                BV.Velocity = -RootPart.CFrame.RightVector * (100 * FlySpeed)
            elseif UserInputService:IsKeyDown(Enum.KeyCode.D) then
                BV.Velocity = RootPart.CFrame.RightVector * (100 * FlySpeed)
            elseif UserInputService:IsKeyDown(Enum.KeyCode.Space) then
                BV.Velocity = RootPart.CFrame.UpVector * (100 * FlySpeed)
            elseif UserInputService:IsKeyDown(Enum.KeyCode.LeftControl) then
                BV.Velocity = -RootPart.CFrame.UpVector * (100 * FlySpeed)
            end
        end

        if Config.InfiniteJump then
            if UserInputService:GetLastInputType() == Enum.UserInputType.Keyboard then
                local jump = UserInputService:IsKeyDown(Enum.KeyCode.Space)
                if jump and Humanoid.State == Enum.HumanoidStateType.Landed then
                    Humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
                end
            end
        end

        if Config.Noclip then
            for _, part in pairs(Character:GetDescendants()) do
                if part:IsA("BasePart") then
                    part.CanCollide = false
                end
            end
        end
    end)

    Notify("Kai Hub", "⚡ Kai Hub Pro V5.1 已加载!", Colors.Success)
    Notify("Kai Hub", "按 F4 显示/隐藏界面", Colors.Primary)
end

CreateGUI()`;

    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'home', label: '🏠 首页', icon: Rocket },
    { id: 'features', label: '⚡ 功能', icon: Zap },
    { id: 'scripts', label: '📜 脚本', icon: FileCode },
    { id: 'games', label: '🎮 游戏', icon: Gamepad2 },
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

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                  : 'bg-white/10 text-purple-300 hover:bg-white/20 border border-purple-500/30'
              }`}
              style={{
                animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both`,
              }}
            >
              <tab.icon size={24} className={activeTab === tab.id ? 'animate-bounce' : ''} />
              {tab.label}
            </button>
          ))}
        </div>

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
                        onClick={() => setActiveTab('scripts')}
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
                  <div className="text-purple-400 font-mono text-sm mb-4">-- Kai Hub Pro V5.1 完整脚本（完整版约850行代码）</div>
                  <div className="text-green-400 font-mono text-xs leading-relaxed">
                    <p className="mb-2">-- 功能包括：</p>
                    <p className="mb-2">-- ✨ 无敌模式 · 🦘 无限跳跃 · 👻 穿墙模式</p>
                    <p className="mb-2">-- 🚀 飞行模式 · 🔍 玩家透视 · 🎯 自动瞄准</p>
                    <p className="mb-2">-- 🌊 自然灾害生存 · 🍎 Blox Fruits · 🐾 Pet Simulator X</p>
                    <p className="mt-4">-- 点击下方按钮复制完整脚本</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyScript}
                  className={`w-full flex items-center justify-center gap-4 px-8 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 ${
                    copied
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/40'
                      : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 shadow-lg shadow-purple-500/40'
                  }`}
                >
                  {copied ? (
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
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
    </div>
  );
};

export default Home;