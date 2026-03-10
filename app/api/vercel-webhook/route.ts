import { NextRequest, NextResponse } from "next/server";

// 飞书 Webhook 地址（在环境变量中配置）
const FEISHU_WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL;

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
      await sendFeishuNotification(deployment);
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
