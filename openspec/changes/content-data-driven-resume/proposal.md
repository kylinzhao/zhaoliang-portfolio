# 提案：数据驱动的简历内容管理系统

## 为什么

当前简历内容硬编码在 React 组件中，每次更新简历都需要修改多个组件代码，且无法清晰地查看和维护简历内容。需要建立内容与代码的分离机制，使用标准的 Markdown 格式管理简历数据，实现"更新一个文件，自动适配全站样式"的目标。

## 变更内容

从组件硬编码内容模式迁移到数据驱动模式：

- **新增**：`content/resume.md` - 标准简历数据文件（Markdown + YAML Front Matter）
- **新增**：`lib/resume-parser.ts` - 简历解析工具
- **新增**：`lib/resume-types.ts` - TypeScript 类型定义
- **修改**：所有内容组件（Hero、Experience、TechStack、Contact 等）从 resume.ts 读取数据
- **新增**：数据验证和错误处理机制

## 功能 (Capabilities)

### 新增功能

- `resume-data-source`: 创建标准化的简历数据源文件，支持 YAML Front Matter + Markdown 格式，包含个人信息、技能、经历、联系方式等完整简历内容
- `resume-parser`: 实现简历数据解析器，将 Markdown 文件转换为结构化的 TypeScript 对象，支持类型验证和错误处理
- `content-driven-components`: 重构所有内容组件为数据驱动模式，组件从解析后的数据读取内容，自动适配样式

### 修改功能

无（此变更为新增功能，不修改现有规范行为）

## 影响

### 受影响的代码

- **新增文件**：
  - `content/resume.md` - 简历数据源
  - `lib/resume-parser.ts` - 解析器
  - `lib/resume-types.ts` - 类型定义
  - `types/resume.ts` - Resume 类型定义

- **修改文件**：
  - `components/sections/hero.tsx` - 从数据源读取姓名、职位、技能
  - `components/sections/about.tsx` - 从数据源读取个人简介
  - `components/sections/core-metrics.tsx` - 从数据源读取核心成就
  - `components/sections/experience.tsx` - 从数据源读取工作经历
  - `components/sections/tech-stack.tsx` - 从数据源读取技术栈
  - `components/sections/contact.tsx` - 从数据源读取联系方式
  - `app/page.tsx` - 可能需要调整以支持数据加载

### 依赖项

- 无新增外部依赖（使用 Node.js 内置的 `fs` 模块读取文件）

### 系统影响

- **构建时**：在构建时读取 `content/resume.md`，生成静态内容
- **开发时**：支持热更新，修改 `resume.md` 后自动刷新页面
- **维护性**：大幅提升，更新简历只需编辑一个 Markdown 文件
- **可测试性**：数据与组件分离，便于单元测试

### 兼容性

- 保持所有现有功能和样式不变
- 保持 SEO 优化（metadata 从数据源生成）
- 保持响应式布局
- 保持所有动画效果

### 风险

- **数据格式错误风险**：如果 `resume.md` 格式错误，可能导致构建失败
  - **缓解措施**：添加类型验证、错误提示、默认值回退
- **性能影响**：每次构建需要额外解析文件
  - **缓解措施**：构建时解析，运行时直接使用解析后的数据，无性能损失
