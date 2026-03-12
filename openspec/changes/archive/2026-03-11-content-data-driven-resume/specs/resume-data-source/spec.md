# 规范：简历数据源

## 新增需求

### 需求:提供标准化的简历数据文件
系统必须提供一个名为 `resume.md` 的 Markdown 文件作为简历数据的唯一来源，该文件必须使用 YAML Front Matter + Markdown 格式。

#### 场景:文件位置和命名
- **当** 系统启动或构建时
- **那么** 系统必须从 `content/resume.md` 读取简历数据

#### 场景:文件格式要求
- **当** 查看 `resume.md` 文件
- **那么** 文件必须包含：
  - YAML Front Matter（元数据部分）
  - Markdown 正文内容
  - UTF-8 编码

---

### 需求:YAML Front Matter 必须包含个人信息
YAML Front Matter MUST 包含简历的基本元数据字段。

#### 场景:必需的元数据字段
- **当** 解析 `resume.md` 文件
- **MUST** YAML Front Matter 包含以下字段：
  - `name`: 姓名（字符串，MUST）
  - `title`: 职位（字符串，MUST）
  - `email`: 邮箱地址（字符串，MUST，MUST 符合邮箱格式）
  - `phone`: 电话号码（字符串，MUST）
  - `skills`: 技能列表（字符串数组，MUST，至少包含一个元素）
  - `metrics`: 核心成就数组（对象数组，MUST，包含 4 个元素）

#### 场景:可选的元数据字段
- **当** 解析 `resume.md` 文件
- **那么** YAML Front Matter 可以包含以下可选字段：
  - `location`: 所在城市（字符串）
  - `social`: 社交媒体链接（对象）
  - `techStack`: 技术栈列表（对象数组）

---

### 需求:Markdown 正文 MUST 包含结构化内容
Markdown 正文部分 MUST 使用标准的 Markdown 语法组织内容。

#### 场景:必需的内容区块
- **当** 查看 Markdown 正文部分
- **MUST** 正文包含以下二级标题（`##`）：
  - `## 个人简介` 或 `## 关于我`
  - `## 工作经历`
  - `## 联系方式`

---

### 需求:YAML 数据验证规则
系统 MUST 验证 YAML Front Matter 中的数据符合类型和格式要求。

#### 场景:姓名字段验证
- **当** 验证 `name` 字段
- **MUST** 是非空字符串，长度在 1-50 个字符之间

#### 场景:邮箱字段验证
- **当** 验证 `email` 字段
- **MUST** 是有效的邮箱格式（符合 RFC 5322 标准）

#### 场景:技能列表验证
- **当** 验证 `skills` 字段
- **MUST** 是字符串数组，至少包含 1 个元素，每个元素非空

#### 场景:核心成就验证
- **当** 验证 `metrics` 字段
- **MUST** 是对象数组，MUST 包含 4 个元素，每个元素 MUST 包含 `icon`、`value`、`label`、`description` 字段

---

### 需求:工作经历数据结构
YAML Front Matter 可以包含 `experiences` 数组字段，用于结构化工作经历数据。

#### 场景:工作经历数组结构
- **当** YAML 包含 `experiences` 字段
- **MUST** 是对象数组，每个对象 MUST 包含：
  - `title`: 职位名称（字符串，MUST）
  - `period`: 时间段（字符串，MUST）
  - `company`: 公司名称（字符串，MUST）
  - `details`: 成就列表（字符串数组，MUST）

---

### 需求:错误提示
当 `resume.md` 文件格式错误或缺少必需字段时，系统 MUST 提供清晰的错误提示。

#### 场景:文件不存在
- **当** `content/resume.md` 文件不存在
- **MUST** 系统抛出错误：`"Resume file not found: content/resume.md"`

#### 场景:缺少必需字段
- **当** YAML Front Matter 缺少必需字段
- **MUST** 系统抛出错误：`"Missing required field: <字段名>"`

#### 场景:字段类型错误
- **当** 字段类型不符合要求
- **MUST** 系统抛出错误：`"Invalid field type: <字段名> expected <期望类型>, got <实际类型>"`
