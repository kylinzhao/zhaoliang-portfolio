# 提案：个人作品集网站

## 为什么

需要建立一个专业的个人网站来展示简历和技术能力，目标受众为猎头、技术同行和潜在合作伙伴。当前缺乏一个集中的在线平台来展示职业经历、技术成就和核心技能，无法有效触达潜在机会。

域名 `zhaoliang.space` 已准备就绪，现在是建立个人品牌的最佳时机。

## 变更内容

创建一个全新的个人作品集网站，包含以下内容：

- **从零构建**：使用 Next.js 15 + shadcn/ui + Framer Motion 创建现代化个人网站
- **核心内容展示**：展示职业经历（瓜子二手车 9 年）、技术成就（降本 62%、SEO 72 万页收录）、团队管理经验（27 人）
- **设计风格**：Quiet Luxury 美学，极简黑/白/灰配色，Bento Grid 布局，高级排版
- **主题系统**：支持 Dark/Light 模式切换，流畅的颜色过渡动画
- **动效系统**：页面进场 Stagger 动画、滚动触发动画、交互反馈
- **响应式设计**：完美适配桌面、平板、移动端
- **部署方案**：使用 Vercel 一键部署，自动 CI/CD，绑定域名 zhaoliang.space

**第一版（MVP）范围**：
- ✅ 核心内容展示
- ✅ Bento Grid 布局
- ✅ Dark/Light 主题切换
- ✅ Stagger 进场动画
- ✅ 响应式设计
- ✅ Vercel 部署

**后续迭代**：
- AI Agent Tracker 可视化组件
- Experience 详细折叠面板
- 打印样式优化
- SEO 深度优化

## 功能 (Capabilities)

### 新增功能

- `portfolio-display`: 核心内容展示模块，包含 Hero 区域、关于我、核心成就、工作经历、技术栈、联系方式等内容区块的展示逻辑
- `theme-system`: 主题切换系统，支持 Dark/Light 模式切换，使用 next-themes 实现平滑的颜色过渡动画和用户偏好持久化
- `responsive-layout`: 响应式布局系统，使用 Tailwind CSS 实现移动优先的响应式设计，适配桌面、平板、移动端各种屏幕尺寸
- `animation-system`: 动效系统，使用 Framer Motion 实现页面进场 Stagger 动画、滚动触发淡入效果、交互反馈等微动效
- `contact-methods`: 联系方式展示模块，展示邮箱（zhaoliang.js@gmail.com）和电话（18610384127），提供简历 PDF 下载和邮件发送快捷入口

### 修改功能

无（新项目，无现有功能）

## 影响

### 受影响的系统

- **新项目**：从零开始，无现有代码影响
- **依赖项**：
  - Next.js 15.1 (App Router)
  - React 19
  - TypeScript 5
  - Tailwind CSS 3.4
  - shadcn/ui (Radix UI)
  - Framer Motion 12
  - lucide-react (图标)
  - next-themes (主题管理)

### 部署影响

- **Vercel**：自动部署，零配置
- **域名**：zhaoliang.space 需配置 DNS 指向 Vercel
- **CI/CD**：Git push 自动触发部署

### 安全影响

- 无敏感数据处理
- 无用户输入（无表单）
- 仅展示静态内容

### 性能影响

- 使用 Next.js Image、Font 优化
- 静态生成，全球 CDN 加速
- 预期性能分数 95+
