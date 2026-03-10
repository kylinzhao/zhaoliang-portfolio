# 设计文档：个人作品集网站

## 上下文

### 背景

当前没有个人网站，需要建立一个专业的在线平台来展示简历和技术能力。目标受众为猎头、技术同行和潜在合作伙伴。域名 `zhaoliang.space` 已准备就绪。

### 当前状态

- **项目类型**：全新项目，从零开始
- **内容来源**：已准备完整的 PDF 简历（瓜子二手车 9 年工作经历）
- **技术背景**：熟悉 Next.js、React、TypeScript，希望使用熟悉的技术栈快速开发
- **时间约束**：希望在 2-3 小时内完成 MVP 并上线

### 约束条件

- **MVP 优先**：第一版聚焦核心功能，复杂特性（如 AI 可视化组件）后续迭代
- **无照片**：暂无专业职业照，设计时需要适配无照片布局
- **极简风格**：Quiet Luxury 美学，无强调色，纯粹黑/白/灰
- **快速部署**：使用 Vercel 零配置部署，避免复杂的运维工作

### 利益相关者

- **主要用户**：你本人（内容展示、品牌建立）
- **目标受众**：猎头、技术同行、潜在合作伙伴

## 目标 / 非目标

**目标：**

- ✅ 在 2-3 小时内完成 MVP 开发和部署
- ✅ 使用熟悉的技术栈（Next.js 15）降低学习成本
- ✅ 实现专业的视觉设计（Quiet Luxury 风格）
- ✅ 支持 Dark/Light 主题切换
- ✅ 实现流畅的进场动画和交互反馈
- ✅ 完美响应式设计（桌面、平板、移动端）
- ✅ 一次部署成功，无回滚

**非目标：**

- ❌ 第一版就包含所有理想功能（如 AI Agent Tracker 可视化）
- ❌ 完美的打印样式（后续迭代）
- ❌ 复杂的内容管理系统（直接使用代码维护）
- ❌ 博客功能（不需要）
- ❌ 联系表单（不需要，仅展示邮箱和电话）

## 决策

### 1. 技术栈选择

#### 决策：使用 Next.js 15 + shadcn/ui

**理由：**

- **熟悉度**：你熟悉 Next.js 生态，学习成本最低
- **App Router**：现代化的路由架构，Server Components 性能优秀
- **内置优化**：Image、Font 优化开箱即用，无需手动配置
- **Vercel 集成**：零配置部署，自动 CI/CD，全球 CDN
- **shadcn/ui**：基于 Radix UI，可访问性好，组件可复制到项目中完全掌控

**考虑过的替代方案：**

| 方案 | 优点 | 缺点 | 决策 |
|------|------|------|------|
| Astro | 更快、更轻量 | 不熟悉，学习成本 | ❌ |
| Next.js + shadcn/ui | 熟悉、生态成熟 | - | ✅ **选择** |
| Docusaurus | 文档风格 | 太重，不适合简历 | ❌ |
| 纯 HTML/CSS | 最简单 | 无组件化，难维护 | ❌ |

---

### 2. 样式方案

#### 决策：使用 Tailwind CSS

**理由：**

- **与 shadcn/ui 天然集成**：shadcn/ui 基于 Tailwind
- **快速开发**：实用类优先，无需写 CSS 文件
- **响应式简单**：断点系统开箱即用
- **Dark Mode 原生支持**：配合 `dark:` 前缀轻松实现主题切换

**配置关键点：**

```javascript
// tailwind.config.ts
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... 使用 CSS 变量实现主题切换
      }
    }
  }
}
```

---

### 3. 动画库选择

#### 决策：使用 Framer Motion

**理由：**

- **声明式 API**：代码简洁，易于维护
- **性能优秀**：自动 GPU 加速，避免布局抖动
- **React 生态**：与 Next.js 完美集成
- **丰富的手势支持**：如有需要可扩展拖拽等交互

**替代方案对比：**

| 方案 | 优点 | 缺点 | 决策 |
|------|------|------|------|
| Framer Motion | 声明式、强大 | 包体积略大 | ✅ **选择** |
| GSAP | 性能最强 | 命令式，React 集成复杂 | ❌ |
| CSS 动画 | 原生、零依赖 | 复杂动画难维护 | ❌ |

---

### 4. 主题管理方案

#### 决策：使用 next-themes

**理由：**

- **零闪烁**：服务端渲染兼容，避免主题切换闪烁
- **自动持久化**：localStorage 存储用户偏好
- **系统偏好检测**：自动检测用户系统的 Dark Mode 设置
- **简单 API**：`useTheme()` hook 即可切换

**实现示例：**

```typescript
// app/providers.tsx
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}

// components/theme-toggle.tsx
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    切换主题
  </button>
}
```

---

### 5. 布局方案

#### 决策：Bento Grid（便当盒布局）

**理由：**

- **视觉层次清晰**：不同大小的卡片创造视觉节奏
- **适合技术栈展示**：可以将技术按重要性分组
- **易于响应式**：移动端可轻松切换为单列
- **符合 Quiet Luxury 美学**：规整、简洁、高级

**实现方式：**

```tsx
// 使用 Tailwind Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="md:col-span-2 lg:col-span-1">...</div>
  <div className="md:col-span-1 lg:col-span-1">...</div>
</div>
```

---

### 6. 部署平台

#### 决策：使用 Vercel

**理由：**

- **Next.js 官方平台**：最佳兼容性和性能
- **零配置**：自动检测框架，无需配置文件
- **自动 CI/CD**：Git push 自动触发部署
- **全球 CDN**：边缘网络加速
- **免费 SSL**：自动配置 HTTPS 证书
- **自定义域名**：一键绑定 `zhaoliang.space`

**部署流程：**

1. 导入 Git 仓库到 Vercel
2. 自动检测 Next.js 配置
3. 首次部署 → 获得 `.vercel.app` 域名
4. Settings → Domains → 添加 `zhaoliang.space`
5. 在域名注册商添加 DNS 记录（Vercel 提供）
6. 等待 SSL 证书自动生成（5-30 分钟）
7. ✅ 完成

---

### 7. 字体方案

#### 决策：使用 next/font (Inter)

**理由：**

- **零布局偏移**：自动字体优化
- **隐私友好**：自托管字体，无需 Google Fonts 请求
- **自动子集化**：仅加载使用的字符
- **系统字体栈降级**：回退到系统字体保证可用性

**配置：**

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
```

---

### 8. 页面结构

#### 决策：单页应用（SPA）+ 锚点导航

**理由：**

- **内容集中**：所有信息在一个页面，浏览流畅
- **开发简单**：无需多路由管理
- **适合简历**：线性阅读体验
- **易于分享**：单 URL，便于传播

**页面区块（顺序）：**

1. **Hero**：名字、职位、核心技能、CTA 按钮
2. **About**：简短个人简介（2-3 句话）
3. **Core Metrics**：4 个关键成就（Bento Grid）
4. **Experience**：瓜子二手车 9 年经历（时间轴）
5. **Tech Stack**：技术栈展示（Bento Grid）
6. **Contact**：邮箱、电话
7. **Footer**：版权信息

---

### 9. 响应式断点

#### 决策：使用 Tailwind 默认断点

```
mobile:  < 640px  (默认)
tablet:  ≥ 768px  (md:)
desktop: ≥ 1024px (lg:)
wide:    ≥ 1280px (xl:)
```

**策略：** 移动优先，从小屏开始设计，使用 `md:` 和 `lg:` 向上扩展。

---

## 风险 / 权衡

### 风险 1：Framer Motion 包体积

**风险：** Framer Motion 包体积较大（~40KB gzipped）

**缓解措施：**
- 使用动态导入减少初始加载体积
- 仅在关键组件使用动画（Hero、Metrics）
- 静态内容无需动画库

---

### 风险 2：Vercel 国内访问速度

**风险：** Vercel CDN 在中国大陆访问速度较慢

**缓解措施：**
- 静态资源使用 image optimization
- 代码分割减少 JS 体积
- 如后续国内用户多，可迁移到 Cloudflare Pages 或阿里云 OSS+CDN

---

### 风险 3：域名 DNS 传播延迟

**风险：** 域名配置后可能需要 5-30 分钟才能全球生效

**缓解措施：**
- 提前配置 DNS，在等待期间继续开发
- 期间可使用 `.vercel.app` 域名测试

---

### 风险 4：内容维护

**风险：** 简历内容在代码中，每次更新需要重新部署

**权衡：**
- ✅ 优点：完全掌控，无 CMS 学习成本
- ❌ 缺点：需要修改代码

**缓解措施：**
- 内容结构化，易于找到修改位置
- 后续可考虑使用 MDX 或 Headless CMS（如需要）

---

### 风险 5：无照片的视觉平衡

**风险：** 无照片可能导致 Hero 区域显得空旷

**缓解措施：**
- 使用更大的字号和更多留白突出名字
- 增加渐变背景或微妙的几何装饰（可选）
- 确保 Bento Grid 布局的视觉吸引力

---

## 迁移计划

### 开发阶段

**Step 1: 项目初始化（15 分钟）**

```bash
# 创建 Next.js 项目
npx create-next-app@latest portfolio --typescript --tailwind --app --no-src-dir

# 初始化 shadcn/ui
npx shadcn@latest init

# 安装依赖
npm install framer-motion lucide-react next-themes
```

**Step 2: 开发核心页面（90 分钟）**

- Header 组件（导航 + 主题切换）
- Hero 区域
- Core Metrics（Bento Grid）
- Experience 时间轴
- Tech Stack（Bento Grid）
- Contact 区域
- Footer

**Step 3: 动效与优化（30 分钟）**

- Stagger 进场动画
- Dark/Light 主题切换
- 响应式适配
- 性能检查（Lighthouse）

**Step 4: 本地测试（15 分钟）**

- 跨浏览器测试（Chrome、Safari、Firefox）
- 移动端测试（iPhone、Android）
- Dark/Light 模式测试
- 性能测试

---

### 部署阶段

**Step 5: Git 提交（5 分钟）**

```bash
git init
git add .
git commit -m "Initial commit: personal portfolio MVP"
git remote add origin <your-repo>
git push -u origin main
```

**Step 6: Vercel 部署（10 分钟）**

1. 登录 [vercel.com](https://vercel.com)
2. "Import Project" → 选择 Git 仓库
3. 确认配置（Next.js 自动检测）
4. "Deploy" → 等待部署完成（~2 分钟）
5. 获得 `https://portfolio-xxx.vercel.app`

**Step 7: 域名配置（15-30 分钟）**

1. Vercel Dashboard → Settings → Domains
2. 添加域名：`zhaoliang.space`
3. Vercel 显示 DNS 配置：
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel.dns
   ```
4. 在域名注册商（阿里云/腾讯云）添加以上 DNS 记录
5. 等待 DNS 传播（5-30 分钟）
6. Vercel 自动配置 SSL 证书
7. ✅ 访问 `https://zhaoliang.space`

---

### 回滚策略

**如果部署失败：**

1. Vercel 自动保留历史部署版本
2. 可在 Dashboard 一键回滚到任意版本
3. Git 可直接回退 commit 重新部署

**如果域名配置失败：**

1. 检查 DNS 记录是否正确
2. 使用 `dig` 或 `nslookup` 检查 DNS 传播状态
3. 临时使用 `.vercel.app` 域名
4. 联系域名注册商客服

---

## 待定问题

### Q1: 是否需要 Analytics？

**当前决策：** 第一版暂不集成，后续可考虑

**选项：**
- Vercel Analytics（免费，简单）
- Google Analytics 4（功能全面）
- Umami（开源自托管）

---

### Q2: 是否需要打印样式？

**当前决策：** 第一版暂不实现，后续迭代

**后续考虑：**
- `@media print` 样式
- 隐藏导航和动效
- 调整字体和间距
- 确保打印输出为完美的 PDF 简历

---

### Q3: 是否需要 SEO 深度优化？

**当前决策：** 第一版仅基础 SEO（Metadata API）

**基础 SEO 包含：**
- Title、Description、Keywords
- Open Graph (社交分享)
- 结构化数据（Schema.org）

**后续可扩展：**
- Sitemap.xml
- Robots.txt
- Google Search Console 验证

---

### Q4: 是否需要添加更多交互元素？

**当前决策：** 第一版仅基础动效（Stagger、滚动触发）

**后续可考虑：**
- 鼠标跟随效果
- 页面切换过渡动画
- 技能条动画
- 时间轴交互展开/折叠

---

## 技术栈总结

```
核心框架：
├── Next.js 15.1 (App Router)
├── React 19
└── TypeScript 5

UI & 样式：
├── Tailwind CSS 3.4
├── shadcn/ui (Radix UI)
└── lucide-react (图标)

动画：
└── Framer Motion 12

主题：
└── next-themes

字体：
└── next/font (Inter)

部署：
└── Vercel

域名：
└── zhaoliang.space
```

---

## 性能目标

- **Lighthouse 性能分数**: ≥ 95
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

---

## 可访问性目标

- **WCAG 2.1 AA 级别合规**
- 键盘导航支持
- 屏幕阅读器友好
- 色彩对比度 ≥ 4.5:1
- 语义化 HTML

---

## 开发环境要求

- **Node.js**: ≥ 18.17.0
- **npm**: ≥ 9.0.0
- **Git**: 任意版本
- **浏览器**: Chrome、Safari、Firefox 最新版

---

## 后续迭代计划

**Phase 2（第 2-3 周）：**
- ✨ AI Agent Tracker 可视化组件
- 📝 Experience 详细折叠面板
- 🖨️ 打印样式优化
- 📈 SEO 深度优化

**Phase 3（第 4 周及以后）：**
- 📊 Vercel Analytics 集成
- 🎨 更多微动效和交互
- 🌐 国际化（i18n）支持（如需要）
- 📱 PWA 支持（可选）
