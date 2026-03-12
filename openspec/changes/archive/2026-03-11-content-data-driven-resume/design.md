# 设计文档：数据驱动的简历内容管理系统

## 上下文

### 当前状态

- **硬编码内容**：简历内容散布在多个 React 组件中（Hero、Experience、TechStack、Contact 等）
- **维护困难**：更新简历需要修改多处代码，容易遗漏或出错
- **不可见性**：无法清晰查看完整的简历内容和结构
- **无数据验证**：缺少类型检查和数据验证机制

### 目标用户

- 网站所有者：需要频繁更新简历内容
- 开发者：需要清晰的代码结构和类型安全

### 约束条件

- **保持兼容**：不能破坏现有功能和样式
- **性能要求**：不能影响页面加载速度和用户体验
- **构建时处理**：使用 Next.js 的构建时数据处理能力
- **类型安全**：TypeScript 类型定义，避免运行时错误

---

## 目标 / 非目标

**目标：**

- ✅ 实现内容与代码的完全分离
- ✅ 提供标准的 Markdown 格式简历数据文件
- ✅ 自动解析和类型验证
- ✅ 保持所有现有功能和样式
- ✅ 支持热更新（开发环境）
- ✅ 提供清晰的错误提示

**非目标：**

- ❌ 不创建 CMS 后台管理界面
- ❌ 不支持多人协作编辑
- ❌ 不添加实时预览功能
- ❌ 不改变现有的视觉设计和布局
- ❌ 不支持多语言简历

---

## 决策

### 1. 数据格式选择

#### 决策：使用 Markdown + YAML Front Matter

**理由：**

- **标准化**：Markdown 和 YAML Front Matter 是行业通用格式
- **可读性**：纯文本，易于编辑和版本控制
- **生态系统**：成熟的解析工具（gray-matter, front-matter 等）
- **灵活性**：YAML 支持复杂结构，Markdown 支持富文本

**数据结构示例：**

```yaml
---
name: 赵梁
title: 大前端技术负责人
email: zhaoliang.js@gmail.com
phone: 18610384127
skills:
  - React
  - React Native
  - Next.js
---

# 个人简介

资深前端技术专家...
```

**考虑过的替代方案：**

| 方案 | 优点 | 缺点 | 决策 |
|------|------|------|------|
| JSON | 类型友好 | 不可读、无注释 | ❌ |
| XML | 结构化 | 冗长、过时 | ❌ |
| Database | 动态性强 | 过度设计、维护成本高 | ❌ |
| Markdown + YAML | 标准、可读 | 需要解析 | ✅ **选择** |

---

### 2. 解析库选择

#### 决策：使用 gray-matter

**理由：**

- **成熟稳定**：维护良好，广泛使用
- **TypeScript 支持**：原生支持类型定义
- **性能优秀**：快速解析，无额外依赖
- **简单易用**：API 简洁，易于集成

**实现方案：**

```typescript
import matter from 'gray-matter';

const { data, content } = matter(readFileSync('content/resume.md', 'utf8'));
```

**考虑过的替代方案：**

| 库 | 优点 | 缺点 | 决策 |
|----|------|------|------|
| front-matter | 功能丰富 | 包体积较大 | ❌ |
| 自定义解析 | 完全控制 | 维护成本高 | ❌ |
| gray-matter | 轻量成熟 | 功能够用 | ✅ **选择** |

---

### 3. 数据加载策略

#### 决策：构建时解析，客户端直接使用

**理由：**

- **性能最优**：构建时解析，运行时零开销
- **SEO 友好**：静态生成，搜索引擎可直接索引
- **简单可靠**：无需客户端 JavaScript 解析
- **错误早发现**：构建失败立即提示

**实现方案：**

```typescript
// lib/resume.ts
export const getResumeData = async () => {
  const filePath = path.join(process.cwd(), 'content/resume.md');
  const fileContents = readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ResumeFrontmatter,
    content: content as ResumeContent
  };
};

// 组件中使用
export default async function Page() {
  const resume = await getResumeData();
  return <Hero name={resume.frontmatter.name} />;
}
```

**考虑过的替代方案：**

| 方案 | 优点 | 缺点 | 决策 |
|------|------|------|------|
| 客户端解析 | 灵活 | 性能差、SEO 差 | ❌ |
| API 路由 | 动态性强 | 增加延迟 | ❌ |
| 构建时解析 | 性能最优、SEO 好 | 需要重新构建 | ✅ **选择** |

---

### 4. 类型定义策略

#### 决策：严格的 TypeScript 类型定义

**理由：**

- **类型安全**：编译时捕获错误
- **IDE 支持**：自动补全和类型提示
- **文档作用**：类型即文档

**类型定义示例：**

```typescript
// types/resume.ts
export interface ResumeFrontmatter {
  name: string;
  title: string;
  email: string;
  phone: string;
  skills: string[];
  // ...
}

export interface ParsedResume {
  frontmatter: ResumeFrontmatter;
  content: ResumeContent;
}
```

---

### 5. 错误处理策略

#### 决策：多层验证 + 友好错误提示

**实现方案：**

1. **文件存在性检查**
```typescript
if (!existsSync(resumePath)) {
  throw new Error('Resume file not found: content/resume.md');
}
```

2. **YAML 解析验证**
```typescript
const { data, content } = matter(fileContents);
if (!data.name) {
  throw new Error('Resume must have "name" field');
}
```

3. **类型运行时验证（使用 zod）**
```typescript
import { z } from 'zod';

const ResumeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  // ...
});

const validatedData = ResumeSchema.parse(data);
```

---

## 风险 / 权衡

### 风险 1：数据格式错误导致构建失败

**风险描述**：用户编辑 `resume.md` 格式错误，导致构建失败

**缓解措施：**
- 添加详细的错误提示，指出具体错误位置
- 提供 `resume.example.md` 示例文件
- 在 README 中添加格式说明
- 考虑添加预提交钩子（husky）验证格式

---

### 风险 2：性能影响

**风险描述**：每次构建都需要解析文件

**实际影响：**
- 解析耗时：< 10ms
- 对构建总时长影响：< 1%
- **结论：影响可忽略**

---

### 风险 3：维护成本

**风险描述**：增加了代码复杂度

**权衡：**
- 短期：增加了约 300 行代码（解析器、类型定义）
- 长期：每次更新简历从"修改多个组件"变为"编辑一个文件"
- **结论：收益远大于成本**

---

### 风险 4：学习曲线

**风险描述**：用户需要学习 Markdown + YAML Front Matter 格式

**缓解措施：**
- 提供详细的 README 文档
- 提供完整的示例文件
- 格式简单直观，学习成本低
- 提供 VS Code 语法高亮支持

---

## 迁移计划

### 阶段 1：准备工作（已完成）

- ✅ 创建 OpenSpec 变更
- ✅ 编写提案和设计文档

### 阶段 2：数据文件和类型定义

1. 创建 `types/resume.ts` - 类型定义
2. 创建 `content/resume.md` - 简历数据文件
3. 创建 `content/resume.example.md` - 示例文件

### 阶段 3：解析器和工具函数

1. 安装依赖：`gray-matter`, `zod`
2. 创建 `lib/resume-parser.ts` - 解析器
3. 创建 `lib/resume.ts` - 导出函数
4. 添加错误处理和验证

### 阶段 4：组件重构（按顺序）

1. 重构 `Hero` 组件
2. 重构 `About` 组件
3. 重构 `CoreMetrics` 组件
4. 重构 `Experience` 组件
5. 重构 `TechStack` 组件
6. 重构 `Contact` 组件
7. 更新 `app/page.tsx`（如需要）

### 阶段 5：测试和验证

1. 本地开发环境测试
2. 构建测试
3. 验证所有功能正常
4. 验证样式无变化
5. 验证 SEO 元数据正常

### 阶段 6：部署和文档

1. 更新 README.md
2. 提交代码到 Git
3. 部署到 Vercel
4. 验证线上环境正常

### 回滚策略

如果迁移失败或发现问题：
- **Git 回滚**：直接回退到上一个提交
- **分支保护**：使用新分支开发，确认无误后合并到 main
- **渐进式迁移**：可以同时保留新旧两套代码，逐步迁移

---

## 数据结构设计

### content/resume.md 结构

```yaml
---
# YAML Front Matter: 元数据
name: 赵梁
title: 大前端技术负责人
email: zhaoliang.js@gmail.com
phone: 18610384127
location: 北京

skills:
  - React
  - React Native
  - Next.js
  - Node.js
  - TypeScript
  - Tailwind CSS

metrics:
  - icon: 📉
    value: 62%
    label: 成本下降
    description: 月均节约7.5万元
  - icon: 📈
    value: 72万
    label: SEO收录
    description: 独立站页面收录
  - icon: 👥
    value: 27人
    label: 团队规模
    description: 商家服务大前端
  - icon: 🤖
    value: 184
    label: AI CR
    description: 项目接入AI CR

techStack:
  - name: React
    icon: ⚛️
    description: 跨端架构核心
  - name: React Native
    icon: 📱
    description: 多端同构方案
  # ... 更多技术栈
---

# Markdown Content: 正文内容

## 个人简介

资深前端技术专家...

## 核心技能
...

## 工作经历
...

## 联系方式
...
```

---

## 技术栈总结

### 新增依赖

```json
{
  "gray-matter": "^4.0.3",
  "zod": "^3.22.4"
}
```

### 新增文件

```
types/resume.ts              # 类型定义
lib/resume-parser.ts         # 解析器
lib/resume.ts                # 导出函数
content/resume.md             # 简历数据
content/resume.example.md     # 示例文件
```

### 修改文件

```
components/sections/hero.tsx       # 使用数据
components/sections/about.tsx      # 使用数据
components/sections/core-metrics.tsx  # 使用数据
components/sections/experience.tsx    # 使用数据
components/sections/tech-stack.tsx    # 使用数据
components/sections/contact.tsx       # 使用数据
```

---

## 性能考虑

### 构建时性能

- **解析时间**：< 10ms
- **类型验证**：< 5ms
- **总开销**：< 15ms（可忽略）

### 运行时性能

- **无额外开销**：数据在构建时解析，运行时直接使用
- **包大小影响**：+15KB gzipped（gray-matter + zod，仅在构建时）

### 缓存策略

- **开发环境**：支持热更新，修改 `resume.md` 自动刷新
- **生产环境**：构建时缓存，无需运行时解析

---

## 安全考虑

### 输入验证

- **类型验证**：使用 Zod 进行运行时类型检查
- **必需字段验证**：确保关键字段存在
- **格式验证**：邮箱、电话等格式验证

### 文件访问

- **仅读取白名单文件**：只允许读取 `content/resume.md`
- **路径安全**：使用 `path.join` 防止路径遍历攻击

---

## 待定问题

### Q1: 是否支持多份简历？

**当前决策**：不支持，仅支持单一简历

**原因**：简化实现，个人网站不需要多份简历

**后续扩展**：如需要，可以扩展为支持多语言简历

---

### Q2: 是否支持图片上传？

**当前决策**：不支持，用户可以手动添加图片到 `public/` 目录

**原因**：简化实现，个人网站图片不常变化

**后续扩展**：如需要，可以集成图片上传功能

---

### Q3: 是否需要实时预览？

**当前决策**：不需要

**原因**：
- 开发环境支持热更新
- 预览即所见
- 增加复杂度

---

## 成功标准

- ✅ `content/resume.md` 包含完整的简历信息
- ✅ 所有组件正确读取并显示数据
- ✅ 保持所有现有样式和功能
- ✅ 类型安全，无 TypeScript 错误
- ✅ 构建成功，无运行时错误
- ✅ 开发环境支持热更新
- ✅ 更新简历只需编辑一个文件
