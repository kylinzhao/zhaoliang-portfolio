# 飞书个人消息通知配置指南

## 功能说明

部署完成后，您会直接在飞书收到个人消息通知（不是群组消息）。

## 配置步骤

### 1. 获取飞书 User ID

您已经有了 App ID 和 App Secret，现在需要获取您的 User ID：

#### 方法一：通过飞书开放平台（推荐）

1. **访问飞书开放平台**
   - 登录：https://open.feishu.cn/
   - 进入"管理后台"

2. **找到您的应用**
   - 应用管理 → 选择您创建的应用

3. **获取权限并调试**
   - 进入"权限管理"
   - 开通以下权限：
     - ✅ `im:message` (发送消息)
     - ✅ `im:message:send_as_bot` (以机器人的身份发送消息)
     - ✅ `contact:user.base:readonly` (读取用户基本信息)

4. **获取您的 User ID**
   - 方法 A：在飞书客户端 → 个人设置 → 我的信息 → 复制 User ID
   - 方法 B：使用 API 调试工具
     ```
     GET https://open.feishu.cn/open-apis/user/v4/me
     Headers: Authorization: Bearer YOUR_ACCESS_TOKEN
     ```
   - 方法 C：让我帮您创建一个调试脚本

#### 方法二：使用调试脚本获取

我可以帮您创建一个简单的脚本，运行后就能获取您的 User ID。

### 2. 配置 Vercel 环境变量

访问：https://vercel.com/kylinzhao/zhaoliang-portfolio/settings/environment-variables

添加以下 3 个环境变量：

| Key | Value | Environments |
|-----|-------|--------------|
| `FEISHU_APP_ID` | `cli_a9254c47af3fdcd3` | 全选 |
| `FEISHU_APP_SECRET` | `e38bGgPfHitC8myTSXsh4g5lwm3EcMd3` | 全选 |
| `FEISHU_USER_ID` | 您的 User ID | 全选 |

**重要**: User ID 格式类似：`ou_xxxxxxx` 或 `on_xxxxxxx`

### 3. 配置应用权限（在飞书开放平台）

1. **登录飞书开放平台**
   - https://open.feishu.cn/

2. **进入您的应用**
   - 应用管理 → 选择应用

3. **配置权限**
   - 权限管理 → 申请权限
   - 搜索并添加：
     ```
     im:message
     im:message:group_at_msg
     im:message:send_as_bot
     ```

4. **发布版本**
   - 权限配置完成后，创建新版本
   - 提交审核（或直接发布，如果是企业内部应用）

5. **启用事件订阅**（可选）
   - 如果需要接收更详细的部署信息

### 4. 测试通知

配置完成后，测试一下：

```bash
git commit --allow-empty -m "test: 测试飞书个人通知"
git push
```

部署完成后，您应该在飞书收到个人消息通知！

## 消息卡片样式

```
┌─────────────────────────────────┐
│  🚀 Vercel 部署通知              │
├─────────────────────────────────┤
│ 项目: zhaoliang-portfolio       │
│ 状态: ✅ 部署成功                │
│ 时间: 2025-03-10 15:30:00       │
│ 访问: [点击打开]                │
│                                 │
│ [查看部署] [Vercel 控制台]       │
└─────────────────────────────────┘
```

## 故障排查

### 问题 1: 没有收到消息

**检查清单**:
- [ ] 环境变量是否正确配置
- [ ] 重新部署项目（环境变量更改后需要重新部署）
- [ ] User ID 是否正确
- [ ] 应用权限是否已启用
- [ ] 应用是否已发布

### 问题 2: 提示权限不足

**解决方法**:
1. 检查应用权限配置
2. 确保已发布应用
3. 重新获取 access_token

### 问题 3: User ID 格式错误

**正确的格式**:
- `ou_xxxxxxxxxxxxx` (开放平台用户)
- `on_xxxxxxxxxxxxx` (企业内部用户)

**获取方法**:
- 飞书客户端 → 个人头像 → 设置 → 关于 → User ID

## 调试工具

如果遇到问题，可以访问以下 URL 查看 API 调用日志：

（需要添加日志功能才能使用）

## 安全建议

1. ✅ App Secret 已存储在 Vercel 环境变量中，不会暴露到前端
2. ✅ 不要将 `.env` 文件提交到 Git 仓库
3. ✅ 定期更换 App Secret
4. ✅ 监控飞书开放平台的 API 调用量

## 需要帮助？

如果您在获取 User ID 或配置权限时遇到问题，我可以帮您创建一个调试脚本来快速获取。
