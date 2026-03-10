# Vercel 部署通知 - 飞书集成

## 功能说明

当 Vercel 部署完成后，自动发送通知到飞书群组。

## 配置步骤

### 1. 创建飞书自定义机器人

1. 在飞书群组中，点击群设置 → 群机器人 → 添加机器人
2. 选择"自定义机器人"
3. 设置机器人名称和头像
4. **重要**: 在安全设置中选择"签名验证"或"自定义关键词"，添加关键词"部署"
5. 创建完成后，复制 Webhook URL，类似：
   ```
   https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxxx
   ```

### 2. 配置 Vercel 环境变量

1. 访问 Vercel 项目设置：https://vercel.com/kylinzhao/zhaoliang-portfolio/settings/environment-variables
2. 添加环境变量：
   - **Key**: `FEISHU_WEBHOOK_URL`
   - **Value**: 你的飞书 Webhook URL
   - **Environment**: 选择所有环境（Production, Preview, Development）

### 3. 配置 Vercel Webhook

1. 访问 Vercel 项目设置：https://vercel.com/kylinzhao/zhaoliang-portfolio/settings/git
2. 找到 "Deploy Hooks" 部分
3. 点击 "Create Hook"
4. **Name**: `Feishu Notification`
5. **Branch**: `main`
6. **URL**: `https://zhaoliang.space/api/vercel-webhook`
7. 点击创建

### 4. 测试配置

推送一次代码，自动触发部署：
```bash
git commit --allow-empty -m "test: 测试飞书通知"
git push
```

部署完成后，飞书群组应该会收到通知卡片。

## 通知卡片示例

```
🚀 Vercel 部署通知

项目: zhaoliang-portfolio
状态: ✅ 部署成功
时间: 2025-03-10 15:30:00
访问: [点击打开](https://zhaoliang.space)

[查看部署] [Vercel 控制台]
```

## 故障排查

### 没有收到通知？

1. **检查环境变量**
   - 确认 Vercel 项目中已配置 `FEISHU_WEBHOOK_URL`
   - 重新部署项目以应用环境变量

2. **检查 Webhook URL**
   - 确认 URL 可以访问
   - 测试 Webhook：`curl -X POST 你的飞书Webhook URL`

3. **查看 Vercel 部署日志**
   - 访问项目的 Deployments 页面
   - 查看是否有错误日志

4. **检查 API 路由**
   - 访问 `https://zhaoliang.space/api/vercel-webhook`
   - 应该返回 401（正常，因为需要签名）

## 安全建议

1. 在生产环境启用 Vercel 签名验证
2. 飞书机器人安全设置启用"签名验证"
3. 定期轮换 Webhook URL

## 自定义

### 修改通知内容

编辑 `app/api/vercel-webhook/route.ts`，修改 `sendFeishuNotification` 函数中的卡片内容。

### 添加更多通知场景

修改 `POST` 函数，监听更多部署状态：
```typescript
if (deployment.state === "READY" || deployment.state === "ERROR") {
  await sendFeishuNotification(deployment);
}
```
