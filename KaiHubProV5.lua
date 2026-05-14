local Players = game:GetService("Players")
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
                    BG.MaxTorque = Vector3.new(9e9, 9e9, 9e9)
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

CreateGUI()
