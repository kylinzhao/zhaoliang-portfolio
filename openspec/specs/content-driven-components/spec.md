# content-driven-components 规范

## 目的
建立内容与代码分离机制，使所有内容组件从数据源读取内容，实现"更新一个文件，自动适配全站样式"的目标，提升简历内容维护效率。
## 需求
### 需求:所有内容组件必须从数据源读取内容
系统必须重构所有内容组件（Hero、About、CoreMetrics、Experience、TechStack、Contact），使其从解析后的简历数据读取内容，而不是硬编码。

#### 场景:Hero 组件数据驱动
- **当** Hero 组件渲染
- **那么** 必须从 `getResumeData()` 获取以下数据：
  - 姓名：`frontmatter.name`
  - 职位：`frontmatter.title`
  - 技能：`frontmatter.skills`
  - 邮箱：`frontmatter.email`

#### 场景:About 组件数据驱动
- **当** About 组件渲染
- **那么** 必须从 `getResumeData()` 获取以下数据：
  - 个人简介：从 `content` 中提取"个人简介"或"关于我"部分的内容

#### 场景:CoreMetrics 组件数据驱动
- **当** CoreMetrics 组件渲染
- **那么** 必须从 `getResumeData()` 获取以下数据：
  - 核心成就数组：`frontmatter.metrics`

#### 场景:Experience 组件数据驱动
- **当** Experience 组件渲染
- **那么** 必须从 `getResumeData()` 获取以下数据：
  - 工作经历数组：`frontmatter.experiences`（如果存在）
  - 或从 `content` 中解析工作经历部分

#### 场景:TechStack 组件数据驱动
- **当** TechStack 组件渲染
- **那么** 必须从 `getResumeData()` 获取以下数据：
  - 技术栈数组：`frontmatter.techStack`（如果存在）
  - 或从 `frontmatter.skills` 生成技术栈列表

#### 场景:Contact 组件数据驱动
- **当** Contact 组件渲染
- **那么** 必须从 `getResumeData()` 获取以下数据：
  - 邮箱：`frontmatter.email`
  - 电话：`frontmatter.phone`

---

### 需求:保持所有现有功能和样式
组件重构后，必须保持所有现有功能和样式不变。

#### 场景:保持视觉效果
- **当** 用户访问网站
- **那么** 页面视觉效果必须与重构前完全一致

#### 场景:保持交互功能
- **当** 用户使用网站的交互功能
- **那么** 所有交互功能必须正常工作：
  - 主题切换
  - 导航滚动
  - 动画效果
  - 响应式布局

#### 场景:保持 SEO 优化
- **当** 搜索引擎爬取网站
- **那么** SEO 元数据必须正确：
  - Title: 使用 `frontmatter.name` 和 `frontmatter.title`
  - Description: 从个人简介内容生成
  - Keywords: 从技能生成

---

### 需求:支持 Server Components
所有内容组件必须支持 Next.js 15 的 Server Components 模式。

#### 场景:组件类型
- **当** 查看组件定义
- **那么** 组件必须是异步函数组件：`async function Component()`

#### 场景:数据获取
- **当** 组件需要数据
- **那么** 必须在组件顶层调用 `getResumeData()`（不能在事件处理器中调用）

---

### 需求:提供错误边界
系统必须为数据获取提供错误边界，防止数据错误导致整个页面崩溃。

#### 场景:数据加载失败
- **当** `getResumeData()` 抛出错误
- **那么** 系统必须显示友好的错误提示，而不是白屏

#### 场景:数据验证失败
- **当** 数据验证失败（ZodError）
- **那么** 系统必须显示具体的字段错误信息，指导用户修正

---

### 需求:保持类型安全
组件必须使用 TypeScript 严格模式，确保类型安全。

#### 场景:Props 类型定义
- **当** 组件接收数据
- **那么** 必须使用 `ResumeFrontmatter` 或相关类型作为 Props 类型

#### 场景:无 TypeScript 错误
- **当** 运行 `tsc` 类型检查
- **那么** 必须无类型错误

---

### 需求:支持开发环境热更新
在开发环境下，组件必须支持热更新功能。

#### 场景:文件变化时自动刷新
- **当** 开发环境下 `resume.md` 文件被修改
- **那么** 页面必须自动刷新并显示新内容

#### 场景:保持组件状态
- **当** 发生热更新
- **那么** 组件状态（如展开/折叠状态）应尽可能保持（技术允许范围内）

---

