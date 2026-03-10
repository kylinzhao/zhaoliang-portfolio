# Vercel 部署通知 - 快速配置

## 三种通知方案，任选其一

### 🎯 推荐：Server酱（推送到微信）

**1 分钟搞定，免费！**

#### 步骤：

1. **注册 Server酱**
   - 访问：https://sct.ftqq.com/
   - 微信扫码登录

2. **获取 SendKey**
   - 登录后自动显示 **SendKey**
   - 复制（类似：`SCT123456xxx`）

3. **配置 Vercel**
   - 访问：https://vercel.com/kylinzhao/zhaoliang-portfolio/settings/environment-variables
   - 添加环境变量：
     - **Key**: `SERVERCHAN_SENDKEY`
     - **Value**: 粘贴你的 SendKey
     - **Environments**: 全选

4. **测试**
   ```bash
   git commit --allow-empty -m "test: 测试微信通知"
   git push
   ```
   部署完成后，微信会收到消息！

---

### 💼 飞书群组通知

适合使用飞书的团队

#### 步骤：

1. **在飞书群组添加机器人**
   - 飞书桌面端：群聊右上角 ⚙️ → 群机器人 → 添加机器人
   - 或直接：https://open.feishu.cn/

2. **创建自定义机器人**
   - 选择"自定义机器人"
   - 复制 Webhook URL

3. **配置 Vercel**
   - 添加环境变量：`FEISHU_WEBHOOK_URL`
   - Value: 你的飞书 Webhook URL

---

### 📧 邮件通知

适合需要邮件记录的场景

#### 步骤：

1. **注册 Resend**（免费 3000 封/月）
   - 访问：https://resend.com/
   - 获取 API Key

2. **配置 Vercel**
   - 添加环境变量：
     - `EMAIL_TO`: 你的邮箱
     - `RESEND_API_KEY`: Resend API Key

---

## 优先级

如果配置了多个通知方式，系统会按以下优先级发送：

```
飞书 > Server酱 > 邮件
```

## 常见问题

### Q: 收不到通知？
**A**: 检查环境变量配置后，需要重新部署一次项目才能生效

### Q: 如何禁用通知？
**A**: 删除 Vercel 中的环境变量即可

### Q: Server酱免费吗？
**A**: 免费版每天可发 5 条消息，足够个人使用
