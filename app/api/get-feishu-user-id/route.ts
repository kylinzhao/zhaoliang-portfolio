import { NextResponse } from "next/server";

export async function GET() {
  const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
  const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;

  if (!FEISHU_APP_ID || !FEISHU_APP_SECRET) {
    return NextResponse.json(
      { error: "环境变量未配置" },
      { status: 400 }
    );
  }

  try {
    // 1. 获取 tenant_access_token
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

    const accessToken = tokenData.tenant_access_token;

    // 2. 获取应用可见的所有用户
    const usersResponse = await fetch(
      "https://open.feishu.cn/open-apis/contact/v3/users?page_size=50",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const usersData = await usersResponse.json();

    if (usersData.code !== 0) {
      throw new Error(`获取用户列表失败: ${usersData.msg}`);
    }

    // 3. 返回用户列表
    const users = usersData.data?.items?.map((user: any) => ({
      name: user.name,
      open_id: user.open_id,
      email: user.email,
      mobile: user.mobile,
      en_name: user.en_name,
    })) || [];

    return NextResponse.json({
      success: true,
      message: "找到以下用户，请找到您自己的 open_id 并配置到 Vercel 环境变量 FEISHU_USER_ID",
      users,
      instructions: [
        "1. 在上面的用户列表中找到您自己",
        "2. 复制您的 open_id（格式如：ou_xxxxxxx）",
        "3. 在 Vercel 环境变量中添加 FEISHU_USER_ID=您的open_id",
        "4. 保存后重新部署",
      ],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
