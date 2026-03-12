# Portfolio Builder

> 一个现代化的、内容驱动的个人作品集网站构建器，通过 **YAML/Markdown** 文件即可快速生成专业的个人网站。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ 特性

### 🎨 多主题系统
- **3 种精心设计的主题**
  - **Original** - 现代、专业、科技感
  - **Cinematic Warm** - 电影感暖调、温暖故事感
  - **Noir Monochromatic** - 黑白电影、艺术张力
- **Light/Dark 双模式** - 每个主题都支持明暗模式
- **OKLCH 色彩空间** - 精确的色彩控制和感知均匀性
- **高级视觉效果**
  - 细沙岩纹理（Cinematic Warm）
  - 动态噪点纹理（Noir）
  - 摄影级多层阴影
  - 悬停光束高亮
  - Spring 物理动画

### 📝 内容驱动
- **YAML Frontmatter** - 结构化的元数据
- **Markdown 内容** - 灵活的富文本支持
- **零依赖编辑** - 使用任何文本编辑器即可
- **即时更新** - 修改内容立即生效
- **多语言支持** - 内置中英文切换

### 🚀 开发体验
- **Next.js 16** - 最新的 React 框架
- **TypeScript** - 完整的类型安全
- **Tailwind CSS 4** - 现代 CSS 框架
- **shadcn/ui** - 高质量 UI 组件
- **Framer Motion** - 流畅的动画效果
- **热重载** - 开发时实时预览

### 📱 响应式设计
- **移动优先** - 适配所有设备尺寸
- **触摸优化** - 完美的移动端体验
- **性能优化** - 90+ Lighthouse 性能分数

### ⚡️ 开箱即用
- **SEO 优化** - 内置 sitemap 和结构化数据
- **一键部署** - 支持 Vercel、Netlify 等
- **主题持久化** - 记住用户的选择
- **无障碍访问** - WCAG AA 标准

## 🚀 快速开始

### 1. Fork 并克隆

点击右上角的 **Fork** 按钮，然后克隆到本地：

```bash
git clone https://github.com/yourusername/portfolio-builder.git
cd portfolio-builder
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## ⚙️ 自定义内容

### 编辑简历数据

所有内容都在 `content/` 目录下的 Markdown 文件中：

- `content/resume.md` - 中文简历
- `content/resume-en.md` - 英文简历

使用 **YAML Frontmatter** 格式编辑：

```yaml
---
name: 你的名字
title: 你的职位标题
email: your.email@example.com
phone: "13800138000"
location: 北京

skills:
  - 技能 1
  - 技能 2
  - 技能 3

metrics:
  - icon: 🚀
    value: "90%"
    label: 性能提升
    description: 描述你的成就

experiences:
  - title: 职位名称
    period: "2023.01 — 至今"
    company: 公司名称
    details:
      - 成就 1
      - 成就 2
      - 成就 3
---
```

### 自定义主题颜色

编辑 `app/globals.css` 中的 Design Tokens：

```css
[data-theme="original"][data-color-mode="light"] {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... 更多颜色变量 */
}
```

### 修改网站图标

替换 `public/icon.png` 为你自己的图标（建议尺寸 512x512）。

### 修改 PDF 简历

将你的简历 PDF 放到 `public/简历.pdf`。

## 📦 项目结构

```
portfolio-builder/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── providers.tsx        # 主题提供者
│   └── globals.css          # 全局样式 & Design Tokens
├── components/
│   ├── header.tsx           # 导航栏
│   ├── footer.tsx           # 页脚
│   ├── theme/               # 主题相关组件
│   │   ├── theme-switcher.tsx
│   │   └── theme-preview.tsx
│   └── sections/            # 页面区块
│       ├── hero.tsx         # Hero 区域
│       ├── about.tsx        # 关于我
│       ├── core-metrics.tsx # 核心成就
│       ├── experience.tsx   # 工作经历
│       ├── tech-stack.tsx   # 技术栈
│       └── contact.tsx      # 联系方式
├── content/
│   ├── resume.md            # 中文简历数据
│   └── resume-en.md         # 英文简历数据
├── lib/
│   ├── resume-parser.ts     # Markdown 解析器
│   ├── theme-manager.ts     # 主题管理
│   └── preferences-storage.ts  # 用户偏好存储
├── types/
│   ├── resume.ts            # 简历类型定义
│   └── theme.ts             # 主题类型定义
└── public/                  # 静态资源
    ├── icon.png             # 网站图标
    └── 简历.pdf             # 简历 PDF
```

## 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router) |
| **UI** | React 19, TypeScript 5 |
| **样式** | Tailwind CSS 4, shadcn/ui |
| **动画** | Framer Motion 12 |
| **主题** | next-themes, OKLCH 色彩空间 |
| **数据** | Gray Matter (Markdown 解析) |
| **部署** | Vercel, Netlify |

## 🌐 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入你的仓库
4. Vercel 会自动检测 Next.js 并配置
5. 点击 **Deploy**

### Netlify

1. 推送代码到 GitHub
2. 访问 [netlify.com](https://netlify.com)
3. 导入你的仓库
4. 构建命令：`npm run build`
5. 发布目录：`.next`
6. 点击 **Deploy Site**

### 其他平台

任何支持 Next.js 的托管平台都可以使用：
- Cloudflare Pages
- AWS Amplify
- Railway
- Render

## 🎯 自定义清单

- [ ] 编辑 `content/resume.md` 和 `content/resume-en.md`
- [ ] 替换 `public/icon.png`
- [ ] 替换 `public/简历.pdf`
- [ ] 修改 `app/globals.css` 中的主题颜色（可选）
- [ ] 更新 `package.json` 中的项目信息
- [ ] 更新 `README.md` 中的项目链接
- [ ] 部署到 Vercel 或其他平台

## 📄 许可证

MIT License - 可自由使用、修改和分发。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Lucide Icons](https://lucide.dev/) - 图标库

## 📮 联系方式

有问题或建议？欢迎提交 [Issue](https://github.com/kylinzhao/zhaoliang-portfolio/issues) 或 [Pull Request](https://github.com/kylinzhao/zhaoliang-portfolio/pulls)！

---

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**
