# 赵梁的个人作品集网站

专业的前端技术负责人个人简历网站，展示职业经历、技术成就和核心技能。

## 技术栈

- **Next.js 15** - React 框架（App Router）
- **React 19** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - UI 组件库
- **Framer Motion** - 动画库
- **next-themes** - 主题管理

## 功能特性

- ✅ Dark/Light 主题切换
- ✅ 响应式设计（桌面/平板/移动端）
- ✅ Stagger 进场动画
- ✅ 滚动触发动画
- ✅ Bento Grid 布局
- ✅ 工作经历时间轴
- ✅ 技术栈展示
- ✅ 简历 PDF 下载
- ✅ 联系方式展示

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 部署

该项目部署在 [Vercel](https://vercel.com) 上，访问地址：https://zhaoliang.space

## 项目结构

```
portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── providers.tsx        # 主题提供者
│   └── globals.css          # 全局样式
├── components/
│   ├── header.tsx           # 导航栏
│   ├── footer.tsx           # 页脚
│   ├── section-wrapper.tsx  # 滚动动画包装器
│   └── sections/            # 页面区块
│       ├── hero.tsx         # Hero 区域
│       ├── about.tsx        # 关于我
│       ├── core-metrics.tsx # 核心成就
│       ├── experience.tsx   # 工作经历
│       ├── tech-stack.tsx   # 技术栈
│       └── contact.tsx      # 联系方式
└── public/                  # 静态资源
    └── 简历.pdf             # 简历 PDF
```

## 作者

**赵梁** - 大前端技术负责人

- 邮箱：mr.zhao.liang@qq.com
