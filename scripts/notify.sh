#!/bin/bash

# 飞书部署通知脚本
# 用法：./scripts/notify.sh "部署消息内容"

# 读取环境变量（如果存在）
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

FEISHU_APP_ID="${FEISHU_APP_ID:-cli_a9254c47af3fdcd3}"
FEISHU_APP_SECRET="${FEISHU_APP_SECRET:-e38bGgPfHitC8myTSXsh4g5lwm3EcMd3}"
FEISHU_USER_ID="${FEISHU_USER_ID:-ou_8dcae5b191c3ea442247f23e445adb3d}"

# 获取 access token
TOKEN_RESPONSE=$(curl -s -X POST "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal" \
  -H "Content-Type: application/json" \
  -d "{
    \"app_id\": \"$FEISHU_APP_ID\",
    \"app_secret\": \"$FEISHU_APP_SECRET\"
  }")

ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.tenant_access_token')

# 构建消息
MESSAGE="$1"

# 发送消息
curl -s -X POST "https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"receive_id\": \"$FEISHU_USER_ID\",
    \"msg_type\": \"text\",
    \"content\": \"{\\\"text\\\":\\\"$MESSAGE\\\"}\"
  }"

echo "✅ 飞书通知已发送"
