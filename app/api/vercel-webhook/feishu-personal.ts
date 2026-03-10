// 飞书个人消息通知（通过飞书开放平台）
// 注意：此功能需要额外的配置，建议使用"个人群"方案代替

interface FeishuPersonalConfig {
  appId: string;        // 飞书应用的 App ID
  appSecret: string;    // 飞书应用的 App Secret
  userId: string;       // 您的飞书 User ID
}

// 获取飞书访问令牌
async function getFeishuAccessToken(appId: string, appSecret: string): Promise<string> {
  const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: appId,
      app_secret: appSecret,
    }),
  });

  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`Failed to get access token: ${data.msg}`);
  }

  return data.tenant_access_token;
}

// 发送个人消息
export async function sendFeishuPersonalMessage(content: string, config: FeishuPersonalConfig) {
  const accessToken = await getFeishuAccessToken(config.appId, config.appSecret);

  const response = await fetch(`https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      receive_id: config.userId,
      msg_type: "text",
      content: JSON.stringify({ text: content }),
    }),
  });

  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`Failed to send message: ${data.msg}`);
  }

  return data;
}

// 使用示例：
// const config = {
//   appId: process.env.FEISHU_APP_ID!,
//   appSecret: process.env.FEISHU_APP_SECRET!,
//   userId: process.env.FEISHU_USER_ID!,
// };
// await sendFeishuPersonalMessage("部署成功！", config);
