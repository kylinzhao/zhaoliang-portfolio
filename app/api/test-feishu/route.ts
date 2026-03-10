import { NextResponse } from "next/server";

export async function GET() {
  const results: {
    timestamp: string;
    checks: any[];
    success?: boolean;
  } = {
    timestamp: new Date().toISOString(),
    checks: [],
  };

  // 检查环境变量
  const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
  const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
  const FEISHU_USER_ID = process.env.FEISHU_USER_ID;

  results.checks.push({
    name: "环境变量 FEISHU_APP_ID",
    status: FEISHU_APP_ID ? "✅ 已配置" : "❌ 未配置",
    value: FEISHU_APP_ID ? `${FEISHU_APP_ID.slice(0, 10)}...` : null,
  });

  results.checks.push({
    name: "环境变量 FEISHU_APP_SECRET",
    status: FEISHU_APP_SECRET ? "✅ 已配置" : "❌ 未配置",
    value: FEISHU_APP_SECRET ? `${FEISHU_APP_SECRET.slice(0, 10)}...` : null,
  });

  results.checks.push({
    name: "环境变量 FEISHU_USER_ID",
    status: FEISHU_USER_ID ? "✅ 已配置" : "⚠️ 未配置（会自动获取）",
    value: FEISHU_USER_ID || null,
  });

  // 如果配置了，测试飞书 API
  if (FEISHU_APP_ID && FEISHU_APP_SECRET) {
    try {
      results.checks.push({
        name: "飞书 API 连接测试",
        status: "🔄 测试中...",
      });

      // 1. 获取 token
      const tokenResponse = await fetch(
        "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            app_id: FEISHU_APP_ID,
            app_secret: FEISHU_APP_SECRET,
          }),
        }
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.code !== 0) {
        throw new Error(`获取 token 失败: ${tokenData.msg}`);
      }

      results.checks.push({
        name: "获取 Access Token",
        status: "✅ 成功",
      });

      const accessToken = tokenData.tenant_access_token;

      // 2. 获取用户信息
      const userResponse = await fetch(
        "https://open.feishu.cn/open-apis/contact/v3/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = await userResponse.json();

      if (userData.code !== 0) {
        throw new Error(`获取用户信息失败: ${userData.msg}`);
      }

      const userId = userData.data.user.open_id;
      const userName = userData.data.user.name;

      results.checks.push({
        name: "获取用户信息",
        status: "✅ 成功",
        userId: userId,
        userName: userName,
      });

      // 3. 发送测试消息
      const testMessage = {
        msg_type: "text",
        content: JSON.stringify({
          text: "🧪 飞书通知测试 - 来自 Vercel 部署机器人\n\n如果您看到这条消息，说明飞书通知配置成功！",
        }),
      };

      const msgResponse = await fetch(
        `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            receive_id: userId,
            msg_type: "text",
            content: testMessage.content,
          }),
        }
      );

      const msgData = await msgResponse.json();

      if (msgData.code !== 0) {
        throw new Error(`发送消息失败: ${msgData.msg}`);
      }

      results.checks.push({
        name: "发送测试消息",
        status: "✅ 成功",
        message: "检查飞书是否收到测试消息",
      });

      results.success = true;
    } catch (error: any) {
      results.checks.push({
        name: "飞书 API 测试",
        status: "❌ 失败",
        error: error.message,
      });
      results.success = false;
    }
  } else {
    results.success = false;
    results.checks.push({
      name: "跳过 API 测试",
      status: "⚠️ 环境变量未配置",
    });
  }

  // 检查 Deploy Hook 配置提示
  results.checks.push({
    name: "Vercel Deploy Hook",
    status: "⚠️ 需要手动配置",
    instructions:
      "在 Vercel 项目设置 → Git → Deploy Hooks 中添加：https://zhaoliang.space/api/vercel-webhook",
  });

  return NextResponse.json(results, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
