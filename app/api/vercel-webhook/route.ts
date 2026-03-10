import { NextRequest, NextResponse } from "next/server";

// 通知配置（在环境变量中配置，按优先级使用）
const FEISHU_APP_ID = process.env.FEISHU_APP_ID;           // 飞书开放平台 App ID
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;   // 飞书开放平台 App Secret
const FEISHU_USER_ID = process.env.FEISHU_USER_ID;         // 可选：您的飞书 User ID（不填会自动获取）
const FEISHU_WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL; // 飞书群机器人 Webhook（可选）
const SERVERCHAN_SENDKEY = process.env.SERVERCHAN_SENDKEY; // Server酱
const EMAIL_TO = process.env.EMAIL_TO; // 邮件通知

interface VercelDeployment {
  id: string;
  url: string;
  name: string;
  state: "READY" | "ERROR" | "BUILDING" | "QUEUED" | "SUCCESS";
  created: number;
  creator?: { username: string };
}

export async function POST(request: NextRequest) {
  try {
    // 记录接收到的请求（用于调试）
    console.log("Received webhook request");

    // 解析 Vercel webhook 数据
    const payload = await request.json();
    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    // Vercel Webhook 的 payload 格式
    // { event: "deployment.success", payload: { deployment: {...} } }
    let deployment: VercelDeployment | null = null;

    if (payload.deployment) {
      // 直接格式
      deployment = payload.deployment;
    } else if (payload.payload?.deployment) {
      // 嵌套格式
      deployment = payload.payload.deployment;
    } else if (payload.name && payload.state) {
      // Vercel 部署对象本身
      deployment = payload as VercelDeployment;
    }

    if (!deployment) {
      console.log("No deployment found in payload");
      return NextResponse.json(
        { success: true, message: "Received but no deployment data" },
        { status: 200 }
      );
    }

    console.log("Deployment state:", deployment.state);

    // 只在部署完成时发送通知
    if (deployment.state === "READY" || deployment.state === "SUCCESS") {
      console.log("Sending notification for deployment:", deployment.id);

      // 按优先级发送通知（飞书个人消息 > 飞书群机器人 > Server酱 > 邮件）
      if (FEISHU_APP_ID && FEISHU_APP_SECRET) {
        await sendFeishuPersonalNotification(deployment);
      } else if (FEISHU_WEBHOOK_URL) {
        await sendFeishuNotification(deployment);
      } else if (SERVERCHAN_SENDKEY) {
        await sendServerChanNotification(deployment);
      } else if (EMAIL_TO) {
        await sendEmailNotification(deployment);
      } else {
        console.warn("No notification method configured");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

async function sendFeishuNotification(deployment: VercelDeployment) {
  if (!FEISHU_WEBHOOK_URL) {
    console.warn("FEISHU_WEBHOOK_URL not configured");
    return;
  }

  const projectName = deployment.name;
  const deployUrl = deployment.url;
  const stateText = deployment.state === "READY" ? "✅ 部署成功" : "❌ 部署失败";
  const timestamp = new Date(deployment.created).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });

  const message = {
    msg_type: "interactive",
    card: {
      header: {
        title: {
          tag: "plain_text",
          content: "🚀 Vercel 部署通知",
        },
        template: "green",
      },
      elements: [
        {
          tag: "div",
          text: {
            tag: "lark_md",
            content: `**项目**: ${projectName}\n**状态**: ${stateText}\n**时间**: ${timestamp}\n**访问**: [点击打开](${deployUrl})`,
          },
        },
        {
          tag: "action",
          actions: [
            {
              tag: "button",
              text: {
                tag: "plain_text",
                content: "查看部署",
              },
              type: "default",
              url: deployUrl,
            },
            {
              tag: "button",
              text: {
                tag: "plain_text",
                content: "Vercel 控制台",
              },
              type: "primary",
              url: `https://vercel.com/dashboard`,
            },
          ],
        },
      ],
    },
  };

  const response = await fetch(FEISHU_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(`Feishu API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// 飞书个人消息通知（通过飞书开放平台 API）
async function sendFeishuPersonalNotification(deployment: VercelDeployment) {
  if (!FEISHU_APP_ID || !FEISHU_APP_SECRET) {
    console.warn("Feishu personal notification not fully configured");
    return;
  }

  try {
    // 1. 获取 tenant_access_token
    const tokenResponse = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: FEISHU_APP_ID,
        app_secret: FEISHU_APP_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.code !== 0) {
      throw new Error(`Failed to get access token: ${tokenData.msg}`);
    }

    const accessToken = tokenData.tenant_access_token;

    // 2. 如果没有配置 User ID，自动获取当前用户的 open_id
    let userId = FEISHU_USER_ID;
    if (!userId) {
      const userResponse = await fetch("https://open.feishu.cn/open-apis/contact/v3/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userResponse.json();
      if (userData.code !== 0) {
        throw new Error(`Failed to get user info: ${userData.msg}`);
      }

      userId = userData.data.user.open_id;
      console.log("Auto-detected User ID:", userId);
    }

    // 3. 构建消息内容
    const projectName = deployment.name;
    const stateText = deployment.state === "READY" ? "✅ 部署成功" : "❌ 部署失败";
    const timestamp = new Date(deployment.created).toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
    });

    const message = {
      msg_type: "interactive",
      card: {
        header: {
          title: {
            tag: "plain_text",
            content: "🚀 Vercel 部署通知",
          },
          template: "green",
        },
        elements: [
          {
            tag: "div",
            text: {
              tag: "lark_md",
              content: `**项目**: ${projectName}\n**状态**: ${stateText}\n**时间**: ${timestamp}\n**访问**: [点击打开](${deployment.url})`,
            },
          },
          {
            tag: "action",
            actions: [
              {
                tag: "button",
                text: {
                  tag: "plain_text",
                  content: "查看部署",
                },
                type: "default",
                url: deployment.url,
              },
              {
                tag: "button",
                text: {
                  tag: "plain_text",
                  content: "Vercel 控制台",
                },
                type: "primary",
                url: `https://vercel.com/dashboard`,
              },
            ],
          },
        ],
      },
    };

    // 4. 发送个人消息
    const response = await fetch(`https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        receive_id: userId,
        msg_type: "interactive",
        content: JSON.stringify(message.card),
      }),
    });

    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(`Failed to send message: ${data.msg}`);
    }

    console.log("Feishu personal notification sent successfully");
    return data;
  } catch (error) {
    console.error("Feishu personal notification error:", error);
    throw error;
  }
}

// Server酱通知（推送到微信）
async function sendServerChanNotification(deployment: VercelDeployment) {
  if (!SERVERCHAN_SENDKEY) {
    console.warn("SERVERCHAN_SENDKEY not configured");
    return;
  }

  const projectName = deployment.name;
  const stateText = deployment.state === "READY" ? "✅ 部署成功" : "❌ 部署失败";
  const timestamp = new Date(deployment.created).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });

  const title = "🚀 Vercel 部署通知";
  const desp = `**项目**: ${projectName}
**状态**: ${stateText}
**时间**: ${timestamp}
**访问**: [点击打开](${deployment.url})`;

  const response = await fetch(
    `https://sctapi.ftqq.com/${SERVERCHAN_SENDKEY}.send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desp,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ServerChan API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// 邮件通知（使用 Resend 或其他邮件服务）
async function sendEmailNotification(deployment: VercelDeployment) {
  if (!EMAIL_TO) {
    console.warn("EMAIL_TO not configured");
    return;
  }

  const projectName = deployment.name;
  const stateText = deployment.state === "READY" ? "✅ 部署成功" : "❌ 部署失败";
  const timestamp = new Date(deployment.created).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });

  const html = `
    <h2>🚀 Vercel 部署通知</h2>
    <p><strong>项目:</strong> ${projectName}</p>
    <p><strong>状态:</strong> ${stateText}</p>
    <p><strong>时间:</strong> ${timestamp}</p>
    <p><a href="${deployment.url}">点击访问</a></p>
  `;

  // 注意：这里使用 Resend API，您需要注册 Resend 并获取 API Key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured, skipping email");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "Vercel Bot <vercel@yourdomain.com>",
      to: EMAIL_TO,
      subject: `🚀 ${projectName} 部署${stateText}`,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
