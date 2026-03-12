# design-system 规范

## 目的
定义网站的设计系统，确保视觉一致性、用户体验和专业性。本规范基于现代极简主义设计风格，结合 shadcn/ui 设计系统，为技术个人作品集提供清晰的设计指导。

## 需求

### 需求:设计风格定位 - 现代极简主义
系统 MUST 采用现代极简主义设计风格，强调内容至上、功能优先、去除装饰性元素。

#### 场景:设计理念
- **当** 设计任何界面元素
- **MUST** 遵循以下设计理念：
  - 内容至上：信息架构清晰，层级分明
  - 去除装饰：不使用非功能性装饰元素
  - 充足留白：元素之间有充足的呼吸空间
  - 专业商务：适合技术个人作品集的专业形象

#### 场景:参考风格
- **MUST** 参考以下产品的设计风格：
  - Apple 官网：极简、优雅、内容驱动
  - Linear.app：现代、流畅、细节精致
  - Vercel：开发者友好、技术专业

---

### 需求:色彩系统
系统 MUST 使用基于 OKLCH 色彩空间的黑白灰配色方案，MUST 支持浅色/深色主题切换。

#### 场景:浅色模式配色
- **当** 应用处于浅色模式
- **MUST** 使用以下配色：
  - Background: `oklch(1 0 0)` - 纯白色
  - Foreground: `oklch(0.145 0 0)` - 深黑色（文字）
  - Card: `oklch(1 0 0)` - 纯白色
  - Card Foreground: `oklch(0.145 0 0)` - 深黑色
  - Primary: `oklch(0.205 0 0)` - 深灰色（按钮）
  - Primary Foreground: `oklch(0.985 0 0)` - 近白色
  - Muted: `oklch(0.97 0 0)` - 浅灰色（背景区域）
  - Muted Foreground: `oklch(0.556 0 0)` - 中灰色（次要文字）
  - Border: `oklch(0.922 0 0)` - 极浅灰色（边框）

#### 场景:深色模式配色
- **当** 应用处于深色模式
- **MUST** 使用以下配色：
  - Background: `oklch(0.145 0 0)` - 深黑色
  - Foreground: `oklch(0.985 0 0)` - 近白色（文字）
  - Card: `oklch(0.205 0 0)` - 中深灰色
  - Card Foreground: `oklch(0.985 0 0)` - 近白色
  - Primary: `oklch(0.87 0.00 0)` - 浅灰色（按钮）
  - Primary Foreground: `oklch(0.205 0 0)` - 中深灰色
  - Muted: `oklch(0.269 0 0)` - 深灰色（背景区域）
  - Muted Foreground: `oklch(0.708 0 0)` - 中浅灰色（次要文字）
  - Border: `oklch(1 0 0 / 10%)` - 半透明白色（边框）

#### 场景:主题切换
- **当** 用户切换主题
- **MUST** 使用平滑过渡：
  - 过渡时长：500ms
  - 缓动函数：ease-in-out
  - 过渡属性：background-color, border-color, color, fill, stroke

#### 场景:色彩使用原则
- **MUST** 遵循以下色彩使用原则：
  - 无彩色主色调：不使用彩色作为主色
  - 高对比度：确保文字与背景对比度符合 WCAG AA 标准
  - 一致性：同一语义使用相同的颜色变量

---

### 需求:排版系统
系统 MUST 使用系统字体栈，MUST 定义清晰的字体层级。

#### 场景:字体家族
- **当** 选择字体
- **MUST** 使用以下字体栈：
  - Sans Serif: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Monospace: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`

#### 场景:字体层级
- **当** 设置文字大小
- **MUST** 遵循以下层级：
  - H1 (Hero Name): `text-5xl sm:text-6xl md:text-7xl` + font-bold
  - H2 (Section Title): `text-2xl sm:text-3xl` + font-bold + tracking-tight
  - H3 (Card Title): `text-lg sm:text-xl` + font-semibold
  - Body Large: `text-lg sm:text-xl` + text-muted-foreground
  - Body: `text-sm` + text-muted-foreground
  - Caption: `text-xs` + text-muted-foreground

#### 场景:字重使用
- **MUST** 遵循以下字重规范：
  - Bold (font-bold): 标题、重要数字、强调内容
  - Semibold (font-semibold): 副标题、卡片标题
  - Normal (font-default): 正文内容
  - Muted (text-muted-foreground): 次要信息、描述文字

---

### 需求:布局系统
系统 MUST 使用响应式网格布局，MUST 支持移动端优先设计。

#### 场景:Bento Grid 布局
- **当** 展示卡片式内容（核心成就、技术栈）
- **MUST** 使用 Bento Grid 布局：
  - 移动端（< 640px）: 2 列网格
  - 平板（640px - 1024px）: 2 列网格
  - 桌面（> 1024px）: 3-4 列网格
  - 间距: `gap-4` (1rem)
  - 容器最大宽度: `max-w-6xl`

#### 场景:时间轴布局
- **当** 展示工作经历
- **MUST** 使用时间轴布局：
  - 左边框: `border-l-2 border-border`
  - 时间轴节点: 圆形点 `w-4 h-4 rounded-full bg-primary`
  - 内容卡片: `bg-card border border-border rounded-lg`
  - 左内边距: `pl-8`
  - 垂直间距: `space-y-8`

#### 场景:容器宽度
- **MUST** 使用以下容器规范：
  - Hero 区域: `max-w-4xl` (较窄，突出中心内容)
  - 内容区域: `max-w-4xl` (阅读舒适宽度)
  - 网格区域: `max-w-6xl` (较宽，适合多列布局)
  - 左右边距: `px-4 sm:px-6 lg:px-8`

#### 场景:响应式断点
- **MUST** 使用 Tailwind CSS 默认断点：
  - `sm:`: 640px (手机横屏)
  - `md:`: 768px (平板竖屏)
  - `lg:`: 1024px (平板横屏/小桌面)
  - `xl:`: 1280px (桌面)
  - `2xl:`: 1536px (大桌面)

---

### 需求:间距和圆角
系统 MUST 使用统一的间距和圆角规范。

#### 场景:间距系统
- **当** 设置元素间距
- **MUST** 使用 Tailwind CSS 间距单位：
  - Section 间距: `py-16` 到 `py-24` (4rem - 6rem)
  - 元素间距: `space-y-8` (2rem，垂直)
  - 卡片间距: `gap-4` (1rem)
  - 文字间距: `mb-2`, `mb-3`, `mb-6` (递进式)

#### 场景:圆角系统
- **当** 设置圆角
- **MUST** 使用以下圆角规范：
  - 卡片: `rounded-lg` (0.5rem / 8px)
  - 按钮: `rounded-md` (0.375rem / 6px)
  - 容器: `rounded-lg` 或 `rounded-xl`
  - 圆形元素: `rounded-full`
  - 基础圆角变量: `--radius: 0.625rem`

---

### 需求:卡片设计
系统 MUST 使用一致的卡片设计模式。

#### 场景:卡片样式
- **当** 创建卡片组件
- **MUST** 包含以下样式：
  - 背景: `bg-card`
  - 边框: `border border-border`
  - 圆角: `rounded-lg`
  - 内边距: `p-4 sm:p-6`
  - 悬停效果: `hover:border-primary/50` + `transition-all duration-200`

#### 场景:卡片内容层级
- **MUST** 遵循以下内容层级：
  1. 图标/Emoji (顶部，大尺寸)
  2. 主要数值/标题 (bold，大字号)
  3. 标签/副标题 (font-medium，中字号，muted-foreground)
  4. 描述文字 (小字号，muted-foreground)

---

### 需求:动画系统
系统 MUST 使用 Framer Motion 实现流畅动画，MUST 尊重用户偏好设置。

#### 场景:入场动画
- **当** 元素进入视口
- **MUST** 使用以下动画参数：
  - 初始状态: `opacity: 0, y: 20`
  - 结束状态: `opacity: 1, y: 0`
  - 持续时间: `duration: 0.6`
  - 缓动函数: `ease: [0.25, 0.1, 0.25, 1]` (cubic-bezier)
  - 视口触发: `whileInView="visible"`
  - 视口阈值: `viewport={{ once: true, amount: 0.2 }}`

#### 场景:交错动画
- **当** 多个元素依次出现
- **MUST** 使用交错延迟：
  - 延迟公式: `delay: i * 0.1` (每个元素延迟 100ms)
  - 容器配置: `staggerChildren: 0.1, delayChildren: 0.2`

#### 场景:悬停动画
- **当** 用户悬停在交互元素上
- **MUST** 使用以下悬停效果：
  - 卡片: `whileHover={{ scale: 1.02 }}`
  - 按钮: 图标平移 `group-hover:translate-x-0.5`
  - 过渡时长: `duration-200` 或 `transition-all duration-200`

#### 场景:主题切换动画
- **MUST** 使用全局平滑过渡：
  - 过渡时长: 500ms
  - 应用范围: 所有颜色相关属性
  - 实现方式: CSS `transition` 属性

#### 场景:尊重用户偏好
- **当** 用户系统设置了"减少动画"偏好
- **MUST** 禁用所有动画：
  - 媒体查询: `@media (prefers-reduced-motion: reduce)`
  - 过渡时长: `0.01ms`
  - 滚动行为: `auto` (禁用平滑滚动)

---

### 需求:图标系统
系统 MUST 使用 Lucide React 图标库，MUST 保持图标风格一致。

#### 场景:图标选择
- **当** 选择图标
- **MUST** 使用以下来源：
  - UI 图标: Lucide React (主要图标库)
  - 技术图标: Simple Icons CDN (官方品牌 logo)
  - 自定义图标: SVG (当官方图标不可用时)

#### 场景:图标尺寸
- **MUST** 使用以下尺寸规范：
  - 按钮/链接图标: `h-4 w-4` (16px)
  - 卡片装饰图标: `text-4xl` (emoji) 或 `w-6 h-6` (SVG)
  - 公司 Logo: `w-10 h-10 sm:w-12 sm:h-12`
  - Hero 区域大图标: `h-6 w-6` 或更大

#### 场景:图标使用原则
- **MUST** 遵循以下原则：
  - 语义化：图标含义与文字一致
  - 一致性：相同功能使用相同图标
  - 可访问性：添加 `sr-only` 文字说明
  - 颜色：使用 `text-primary` 或继承文字颜色

---

### 需求:组件库
系统 MUST 使用 shadcn/ui 作为基础组件库。

#### 场景:组件使用
- **当** 需要使用 UI 组件
- **MUST** 优先使用 shadcn/ui 组件：
  - Button: 按钮组件
  - Card: 卡片容器
  - 其他组件根据需要添加

#### 场景:组件样式定制
- **MUST** 通过 CSS 变量定制组件样式：
  - 不直接修改组件源码
  - 使用 Tailwind 类名覆盖样式
  - 保持与设计系统一致

---

### 需求:响应式设计
系统 MUST 遵循移动端优先设计原则，MUST 在所有设备上提供一致体验。

#### 场景:移动端优化
- **当** 在移动设备上访问
- **MUST** 确保以下体验：
  - 触控目标至少 44x44px
  - 文字大小不小于 14px
  - 单列布局（Hero 除外）
  - 汉堡菜单导航

#### 场景:断点适配
- **MUST** 在不同断点下适配：
  - 手机 (< 640px): 简化布局，隐藏次要信息
  - 平板 (640px - 1024px): 2 列布局
  - 桌面 (> 1024px): 完整布局，多列显示

#### 场景:导航适配
- **移动端** (< 768px):
  - 汉堡菜单按钮
  - 全屏下拉菜单
  - 点击后自动关闭
- **桌面端** (≥ 768px):
  - 水平导航栏
  - 悬停效果

---

### 需求:可访问性
系统 MUST 遵循 WCAG 2.1 AA 标准，MUST 确保所有用户可访问。

#### 场景:键盘导航
- **当** 用户使用键盘导航
- **MUST** 确保以下功能：
  - Tab 键可访问所有交互元素
  - 焦点指示器清晰可见 (`focus-visible:ring-2`)
  - 焦点顺序符合逻辑
  - Enter/Space 键激活按钮和链接

#### 场景:屏幕阅读器
- **MUST** 提供适当的语义标记：
  - 语义化 HTML 标签 (`<nav>`, `<main>`, `<section>`)
  - ARIA 标签 (`aria-label`, `sr-only`)
  - Alt 文本描述图片
  - 适当的标题层级

#### 场景:颜色对比度
- **MUST** 确保文字与背景对比度：
  - 正常文字: 至少 4.5:1 (WCAG AA)
  - 大号文字: 至少 3:1 (WCAG AA)
  - 图标和图形: 与文字相同标准

#### 场景:用户偏好
- **MUST** 尊重用户系统偏好：
  - 减少动画 (`prefers-reduced-motion`)
  - 深色/浅色主题 (`prefers-color-scheme`)
  - 字体缩放支持

---

### 需求:微交互
系统 MUST 提供一致的微交互反馈，MUST 增强用户体验。

#### 场景:悬停反馈
- **当** 用户悬停在可交互元素上
- **MUST** 提供以下反馈：
  - 颜色变化: `hover:bg-accent`, `hover:border-primary/50`
  - 图标动画: `group-hover:translate-x-0.5`
  - 光标变化: `cursor-pointer`
  - 过渡时长: 200ms

#### 场景:点击反馈
- **当** 用户点击按钮或链接
- **MUST** 提供以下反馈：
  - Active 状态样式
  - 焦点环指示: `focus-visible:ring-2 focus-visible:ring-ring`
  - 加载状态（如适用）

#### 场景:滚动反馈
- **MUST** 使用平滑滚动：
  - 全局滚动: `scroll-behavior: smooth`
  - 导航滚动: `element.scrollIntoView({ behavior: "smooth" })`

---

### 需求:代码实现规范
开发人员 MUST 在代码中遵循设计系统规范。

#### 场景:样式类命名
- **当** 编写 Tailwind CSS 类名
- **MUST** 遵循以下顺序：
  1. 布局属性 (flex, grid, position)
  2. 盒模型 (width, height, padding, margin)
  3. 排版 (font, color, text)
  4. 视觉 (background, border, opacity)
  5. 动画 (transition, transform)
  6. 交互 (hover, focus)

#### 场景:组件封装
- **MUST** 保持组件可复用性：
  - 提取公共样式到共享组件
  - 使用 CSS 变量而非硬编码值
  - 保持组件单一职责

#### 场景:设计验证
- **MUST** 在以下时机验证设计一致性：
  - 代码审查时
  - 新组件开发后
  - 主题切换时
  - 响应式测试时

---

## 设计资产

### 配色变量
定义在 `app/globals.css` 中，使用 CSS 变量：
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... 更多变量 */
}
```

### 动画配置
定义在组件中，使用 Framer Motion：
```typescript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};
```

### 典型布局
- **Hero 区**: 居中，单列，`min-h-screen`
- **Section**: `py-16` 到 `py-24`，交替背景 `bg-muted/30`
- **卡片网格**: Bento Grid 布局，响应式列数

## 设计原则总结

1. **极简至上**: 去除一切非必要元素
2. **内容为王**: 突出内容，弱化装饰
3. **一致性**: 视觉、交互、代码保持一致
4. **响应式**: 移动端优先，所有设备适配
5. **性能优先**: 轻量级动画，快速加载
6. **可访问性**: 所有人可访问和使用
7. **开发者友好**: 代码规范清晰，易于维护

## 参考资源

- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [Lucide 图标库](https://lucide.dev/)
- [Simple Icons](https://simpleicons.org/)
- [WCAG 2.1 标准](https://www.w3.org/WAI/WCAG21/quickref/)
