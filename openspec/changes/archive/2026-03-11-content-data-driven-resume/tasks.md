# 实施任务清单

## 1. 数据类型定义

- [x] 1.1 创建 `types/resume.ts` 类型定义文件
- [x] 1.2 定义 `ResumeFrontmatter` 接口（YAML 字段）
- [x] 1.3 定义 `ResumeContent` 接口（Markdown 内容结构）
- [x] 1.4 定义 `ParsedResume` 接口（完整的解析结果）
- [x] 1.5 定义 `Metric` 接口（核心成就数据）
- [x] 1.6 定义 `Experience` 接口（工作经历数据）
- [x] 1.7 定义 `TechStack` 接口（技术栈数据）
- [x] 1.8 导出所有类型定义

## 2. 安装依赖

- [x] 2.1 安装 `gray-matter` 依赖（YAML Front Matter 解析）
- [x] 2.2 安装 `zod` 依赖（数据验证）
- [x] 2.3 验证 `package.json` 中的依赖版本
- [x] 2.4 运行 `npm install` 安装依赖

## 3. 创建简历数据文件

- [x] 3.1 创建 `content/` 目录
- [x] 3.2 创建 `content/resume.md` 简历数据文件（从现有组件内容迁移）
- [x] 3.3 创建 `content/resume.example.md` 示例文件
- [x] 3.4 验证 YAML Front Matter 格式正确
- [x] 3.5 验证所有必需字段完整

## 4. 实现简历解析器

- [x] 4.1 创建 `lib/resume-parser.ts` 文件
- [x] 4.2 实现 `parseResumeFile()` 函数（文件读取）
- [x] 4.3 实现 `validateResumeData()` 函数（Zod 验证）
- [x] 4.4 实现 `getResumeData()` 异步函数
- [x] 4.5 实现 `getResumeDataSync()` 同步函数
- [x] 4.6 添加错误处理和错误提示
- [x] 4.7 添加 TypeScript 类型断言

## 5. 创建数据导出函数

- [x] 5.1 创建 `lib/resume.ts` 文件
- [x] 5.2 导出 `getResumeData()` 函数
- [x] 5.3 导出类型定义（`ResumeFrontmatter`, `ParsedResume`）
- [x] 5.4 添加 JSDoc 注释说明使用方法

## 6. 重构 Hero 组件

- [x] 6.1 修改 `components/sections/hero.tsx` 为异步组件
- [x] 6.2 调用 `getResumeData()` 获取数据
- [x] 6.3 替换硬编码的姓名为 `resume.frontmatter.name`
- [x] 6.4 替换硬编码的职位的 `resume.frontmatter.title`
- [x] 6.5 替换硬编码的技能为 `resume.frontmatter.skills`
- [x] 6.6 替换硬编码的邮箱为 `resume.frontmatter.email`
- [x] 6.7 移除硬编码的数据常量
- [x] 6.8 验证组件显示正确

## 7. 重构 About 组件

- [x] 7.1 修改 `components/sections/about.tsx` 为异步组件
- [x] 7.2 调用 `getResumeData()` 获取数据
- [x] 7.3 从 `resume.content` 提取个人简介内容
- [x] 7.4 移除硬编码的简介文本
- [x] 7.5 验证组件显示正确

## 8. 重构 CoreMetrics 组件

- [x] 8.1 修改 `components/sections/core-metrics.tsx` 为异步组件
- [x] 8.2 调用 `getResumeData()` 获取数据
- [x] 8.3 替换硬编码的 metrics 数组为 `resume.frontmatter.metrics`
- [x] 8.4 移除硬编码的 metrics 常量
- [x] 8.5 验证 4 个成就卡片显示正确

## 9. 重构 Experience 组件

- [x] 9.1 修改 `components/sections/experience.tsx` 为异步组件
- [x] 9.2 调用 `getResumeData()` 获取数据
- [x] 9.3 替换硬编码的 experiences 数组为 `resume.frontmatter.experiences`
- [x] 9.4 移除硬编码的 experiences 常量
- [x] 9.5 验证 4 个工作经历显示正确
- [x] 9.6 验证时间轴样式正常

## 10. 重构 TechStack 组件

- [x] 10.1 修改 `components/sections/tech-stack.tsx` 为异步组件
- [x] 10.2 调用 `getResumeData()` 获取数据
- [x] 10.3 替换硬编码的 techStack 为 `resume.frontmatter.techStack`（如果存在）
- [x] 10.4 或从 `resume.frontmatter.skills` 生成技术栈数据
- [x] 10.5 移除硬编码的 techStack 常量
- [x] 10.6 验证 6 个技术卡片显示正确

## 11. 重构 Contact 组件

- [x] 11.1 修改 `components/sections/contact.tsx` 为异步组件
- [x] 11.2 调用 `getResumeData()` 获取数据
- [x] 11.3 替换硬编码的邮箱为 `resume.frontmatter.email`
- [x] 11.4 替换硬编码的电话为 `resume.frontmatter.phone`
- [x] 11.5 移除硬编码的联系方式常量
- [x] 11.6 验证邮箱和电话显示正确
- [x] 11.7 验证点击功能正常（mailto、tel）

## 12. 更新 SEO 元数据

- [x] 12.1 修改 `app/layout.tsx` 为异步组件
- [x] 12.2 调用 `getResumeData()` 获取数据
- [x] 12.3 使用 `resume.frontmatter.name` 更新页面 title
- [x] 12.4 使用 `resume.frontmatter.skills` 生成 keywords
- [x] 12.5 从个人简介内容生成 description
- [x] 12.6 验证页面元数据正确

## 13. 测试数据格式错误处理

- [x] 13.1 测试缺少 `resume.md` 文件的错误提示
- [x] 13.2 测试缺少必需字段的错误提示
- [x] 13.3 测试字段类型错误的错误提示
- [x] 13.4 测试邮箱格式错误的错误提示
- [x] 13.5 验证错误提示清晰易懂

## 14. 测试热更新功能

- [x] 14.1 启动开发服务器
- [x] 14.2 修改 `content/resume.md` 文件
- [x] 14.3 验证页面自动刷新
- [x] 14.4 验证新内容正确显示

## 15. 本地构建测试

- [x] 15.1 运行 `npm run build` 构建生产版本
- [x] 15.2 验证构建无 TypeScript 错误
- [x] 15.3 验证构建无 ESLint 错误
- [x] 15.4 验证构建输出正常

## 16. 视觉回归测试

- [x] 16.1 对比重构前后页面显示
- [x] 16.2 验证 Hero 区域无变化
- [x] 16.3 验证 About 区域无变化
- [x] 16.4 验证 CoreMetrics 无变化
- [x] 16.5 验证 Experience 无变化
- [x] 16.6 验证 TechStack 无变化
- [x] 16.7 验证 Contact 无变化
- [x] 16.8 验证主题切换功能正常
- [x] 16.9 验证响应式布局正常
- [x] 16.10 验证动画效果正常

## 17. 性能测试

- [x] 17.1 运行 Lighthouse 性能测试
- [x] 17.2 验证性能分数无下降（≥ 95 分）
- [x] 17.3 验证 First Contentful Paint 无明显增加
- [x] 17.4 验证 Largest Contentful Paint 无明显增加

## 18. 更新文档

- [x] 18.1 更新 README.md，添加简历更新说明
- [x] 18.2 在 README 中添加 `content/resume.md` 格式说明
- [x] 18.3 添加数据文件编辑示例
- [x] 18.4 验证文档清晰易懂

## 19. Git 提交

- [x] 19.1 运行 `git status` 查看变更
- [x] 19.2 运行 `git add` 添加所有变更
- [x] 19.3 创建提交信息（feat: 实现数据驱动的简历内容管理系统）
- [x] 19.4 运行 `git commit` 提交变更
- [x] 19.5 验证提交成功

## 20. 部署到 Vercel

- [x] 20.1 运行 `git push` 推送到 GitHub
- [x] 20.2 等待 Vercel 自动部署完成
- [x] 20.3 验证部署状态为成功
- [x] 20.4 访问 https://zhaoliang.space 验证线上环境正常
- [x] 20.5 验证所有功能和样式正常

## 21. 验证和收尾

- [x] 21.1 在浏览器中测试线上环境
- [x] 21.2 测试 Dark/Light 主题切换
- [x] 21.3 测试移动端和桌面端显示
- [x] 21.4 测试所有链接和交互功能
- [x] 21.5 验证简历 PDF 下载功能
- [x] 21.6 确认所有功能正常
