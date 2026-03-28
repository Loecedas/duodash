# DuoDash

Duolingo 学习数据仪表盘。它把账号里的连续学习、XP、课程、联赛、年度热力图、分享卡片和 AI 点评集中到一个页面里。

## 功能

- 展示核心数据：连续天数、总 XP、宝石、联赛段位、注册天数、课程数量、今日学习状态
- 展示趋势图：最近 7 天 XP、最近 7 天学习时长、年度学习热力图
- 成就系统：按 streak、单日 XP、累计学习天数、累计 XP 解锁里程碑
- 分享导出：支持连续学习卡、XP 里程碑卡、本周报告卡、全屏数据截图
- 主题切换：支持浅色、深色、跟随系统
- AI 点评：根据当前学习数据生成一段中文点评

## 适用场景

- 想把 Duolingo 原始数据变成更直观的可视化面板
- 想定期导出周报或里程碑卡片发到社交平台
- 想在自己的服务器上托管一个长期可访问的个人学习面板

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认会启动 Astro 开发服务器。

### 3. 进入应用后任选一种使用方式

#### 方式 A：直接粘贴 JSON

适合本地体验和临时使用，不依赖服务端账号配置。

1. 打开 `https://www.duolingo.com/users/<你的用户名>`
2. 复制页面返回的完整 JSON
3. 在登录页选择“粘贴 JSON”
4. 粘贴后生成仪表盘

#### 方式 B：使用演示数据

适合只看界面和交互，不接真实账号。

#### 方式 C：服务端自动拉取

适合长期部署。前端会直接请求你自己的 `/api/data` 和 `/api/ai`。

## 环境变量

### 数据拉取

服务端自动拉取 Duolingo 数据至少需要下面两项：

```bash
DUOLINGO_USERNAME=your_duolingo_username
DUOLINGO_JWT=your_duolingo_jwt
```

可选但建议配置：

```bash
API_SECRET_TOKEN=your_api_secret
```

### AI 点评

如果不配 AI 相关变量，页面仍然能正常使用，只是 AI 点评不可用。

通用配置：

```bash
AI_PROVIDER=deepseek
AI_MODEL=deepseek-chat
AI_BASE_URL=
```

按提供商配置对应的 Key，只需要填你实际使用的那一个：

```bash
DEEPSEEK_API_KEY=
OPENROUTER_API_KEY=
SILICONFLOW_API_KEY=
MOONSHOT_API_KEY=
ZENMUX_API_KEY=
CUSTOM_API_KEY=
```

## 推荐本地配置

如果你希望本地启动后直接看到自己的数据，可以在 `.env.local` 里放这组最小配置：

```bash
DUOLINGO_USERNAME=your_duolingo_username
DUOLINGO_JWT=your_duolingo_jwt
API_SECRET_TOKEN=your_api_secret
AI_PROVIDER=deepseek
AI_MODEL=deepseek-chat
DEEPSEEK_API_KEY=your_deepseek_key
```

## 使用说明

### 首次进入

- 如果服务端环境变量已配置，应用会自动拉取数据
- 如果服务端未配置，会进入登录页，可改用 JSON 导入或演示模式

### 日常刷新

- 顶部导航栏支持手动刷新
- 服务端接口带内存缓存，默认会缓存一段时间，避免频繁请求 Duolingo

### 分享导出

- 支持导出连续学习成就卡
- 支持导出 XP 里程碑卡
- 支持导出本周学习报告卡
- 支持导出整页高清截图

## 部署

项目使用 Astro SSR。

- 在 `Netlify` 环境下会自动使用 Netlify 适配器
- 非 Netlify 环境默认走 Vercel 适配器
- 部署平台需要同步配置同一组环境变量

生产构建：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 技术栈

- Astro 5
- React 19
- Tailwind CSS
- Recharts
- Astro Netlify / Vercel Adapter

## 目录说明

```text
src/components        页面组件与卡片组件
src/components/share  分享卡片与截图导出
src/components/charts 图表组件
src/pages/api         数据接口与 AI 接口
src/services          Duolingo 数据转换与 AI 调用
```

## 注意

- `DUOLINGO_JWT` 属于敏感凭据，不要提交到仓库
- 如果只想看界面，不需要任何环境变量，直接用演示数据或粘贴 JSON 即可
