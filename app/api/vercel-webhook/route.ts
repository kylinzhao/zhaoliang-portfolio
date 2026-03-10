import { NextRequest, NextResponse } from "next/server";

// 通知配置（在环境变量中配置，三选一即可）
const FEISHU_WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL;
const SERVERCHAN_SENDKEY = process.env.SERVERCHAN_SENDKEY; // Server酱
const EMAIL_TO = process.env.EMAIL_TO; // 邮件通知

interface VercelDeployment {
  id: string;
  url: string;
  name: string;
  state: "READY" | "ERROR" | "BUILDING" | "QUEUED";
  created: number;
  creator: { username: string };
}

export async function POST(request: NextRequest) {
  try {
    // 验证请求来自 Vercel（可选，推荐在生产环境启用）
    const vercelSignature = request.headers.get("x-vercel-signature");
    if (!vercelSignature) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 解析 Vercel webhook 数据
    const payload = await request.json();
    const { deployment } = payload as { deployment: VercelDeployment };

    if (!deployment) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // 只在部署完成时发送通知
    if (deployment.state === "READY") {
      // 按优先级发送通知（飞书 > Server酱 > 邮件）
      if (FEISHU_WEBHOOK_URL) {
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
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
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
