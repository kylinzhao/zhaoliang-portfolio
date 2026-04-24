export interface CreationSection {
  title: string;
  body: string[];
}

export interface CreationEntry {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  updatedAt: string;
  category: string;
  status: "active" | "wip";
  metrics: string[];
  highlights: string[];
  ctaLabel: string;
  sections: CreationSection[];
}

export const creations: CreationEntry[] = [
  {
    slug: "video-storylab",
    icon: "🎬",
    title: "每日视频任务｜剧情实验室",
    summary:
      "把《月球背面》这类连载视频任务中的剧情、分镜、反转与镜头策略整理成可公开浏览的创作档案。",
    updatedAt: "2026-04-24",
    category: "Serial video",
    status: "active",
    metrics: ["连载第 3 天", "4 段分镜", "含 logline / 反转 / 结尾钩子"],
    highlights: [
      "当前展示《月球背面》Day 3：主角并非被月下系统审判，而是被识别为预留继承人。",
      "每一段都保留中英双语提示词，方便直接复盘剧情推进和视频生成策略。",
      "结构上固定沉淀：一句话 logline、反转说明、4 段分镜、ending hook。",
    ],
    ctaLabel: "查看本期剧情拆解",
    sections: [
      {
        title: "本期一句话剧情",
        body: [
          "宇航员以为月下系统正在审判自己，却反而被它识别为预留继承人；离开的飞船不是抛弃他的证据，而是把他送回这座月下设施的钥匙。",
          "这一期的核心价值不只是“发生了什么”，而是把前一天的威胁感正式翻转成“返回程序已被触发”的命运感。",
        ],
      },
      {
        title: "4 段分镜骨架",
        body: [
          "Part 1：蓝色几何结构在月壤下展开入口，不再攻击，而是像识别归来人员一样为他让路。",
          "Part 2：宇航员进入冷白光照亮的月下设施，系统将他的生物特征与旧任务档案自动匹配。",
          "Part 3：全息记录揭示离开的飞船是在带走危险样本，他被留下是为了开启设施，而不是被抛弃。",
          "Part 4：设施深处出现第二个与他完全匹配的生命信号，像另一个版本的他正在黑暗中苏醒。",
        ],
      },
      {
        title: "创作方法",
        body: [
          "延续式日更：每一集都必须明确回答“相对昨天，今天反转了什么”。",
          "镜头层面统一维持 cinematic blockbuster、elegant camera movement、premium sci-fi drama 的风格锚点。",
          "结构化记录让剧情、分镜和生成提示词可以被后续页面、脚本和内容分发系统复用。",
        ],
      },
    ],
  },
  {
    slug: "music-adaptations",
    icon: "🎵",
    title: "音乐改编｜经典老歌 Cover 档案",
    summary:
      "整理 MMX 经典老歌改编计划：哪些歌适合做史诗女团、哪首更适合 chill reggae、以及保持原曲辨识度的具体改编边界。",
    updatedAt: "2026-04-23",
    category: "Music adaptation",
    status: "active",
    metrics: ["前 10 首 cover 方案", "495 首曲库已盘点", "纯翻唱 / 改编规则已固化"],
    highlights: [
      "本轮已完成 MMX 曲库整理，并先为前 10 首经典老歌输出结构化 cover 方案。",
      "策略不是“重写歌曲”，而是在不破坏原曲主旋律与 hook 的前提下换风格外壳。",
      "工作流已经沉淀出关键规则：纯翻唱不强塞歌词文件，改编 / 改词 / 改结构才显式带歌词。",
    ],
    ctaLabel: "查看前 10 首改编方向",
    sections: [
      {
        title: "当前方法论",
        body: [
          "全部按 cover / 翻唱处理，不做旋律重写；保留原曲主旋律、歌词 hook、唱腔走向与副歌线条，只换风格外壳。",
          "如果目标是改得更激烈，就做得更大胆、更戏剧、更大气；如果原曲已经很激烈，就反向做成民谣 / 弹唱 / chill / reggae。",
        ],
      },
      {
        title: "代表性方案",
        body: [
          "《一剪梅》：史诗女团抒情摇滚 / symphonic power ballad，把“草原广阔、云开日出”的画面感放大成更大的舞台版本。",
          "《一千个伤心的理由》：暗黑女团 / girl-crush 戏剧摇滚版，保持伤心 hook，不动主旋律，舞台感更强。",
          "《伤心太平洋》：chill reggae / 海风感弹唱版，因为原曲已经够冲，所以反向做成更松弛、更漂流的版本。",
        ],
      },
      {
        title: "下一步可扩展内容",
        body: [
          "继续把前 10 / Next 10 的 cover 方案、社交封面和生成结果接成统一展示页。",
          "未来可以把歌曲清单、改编思路、封面图、最终音频版本进一步做成系列归档。",
        ],
      },
    ],
  },
  {
    slug: "github-trending-notes",
    icon: "📈",
    title: "GitHub Trending｜每日 Top5 笔记",
    summary:
      "把每日 GitHub Trending 结果整理成中文可读版本，不只是搬运榜单，而是快速解释项目值不值得立刻打开。",
    updatedAt: "2026-04-23",
    category: "Open-source scouting",
    status: "active",
    metrics: ["每日 Top5", "近 3 天自动去重", "文本 + 首图的轻量投递"],
    highlights: [
      "当前页面展示 2026-04-23 的 Top5：claude-context、FinceptTerminal、worldmonitor、langfuse、shannon。",
      "流程已支持回避近 3 天重复推荐，优先把真正的新项目补进榜单。",
      "内容风格上强调“一句话看懂 + 亮点速看 + 适合做什么”，适合快速浏览和二次分发。",
    ],
    ctaLabel: "查看当日 Top5",
    sections: [
      {
        title: "今日 Top5",
        body: [
          "Top 1：claude-context —— 面向 Claude Code 的代码搜索 MCP，让编码代理把整个代码库纳入上下文。",
          "Top 2：FinceptTerminal —— 现代金融终端，整合经济数据、估值模型与交互式探索工具。",
          "Top 3：worldmonitor —— 把新闻聚合、地缘政治监测与基础设施追踪放进同一块实时全球态势看板。",
          "Top 4：langfuse —— 面向 LLM 应用开发的开源工程平台，集中做观测、评测、提示词与数据集管理。",
          "Top 5：shannon —— 面向 Web 应用与 API 的白盒 AI 渗透测试工具，可读源码并实测漏洞。",
        ],
      },
      {
        title: "为什么这套笔记值得保留",
        body: [
          "它不是只给一个榜单截图，而是把“为什么值得看”和“适合拿来做什么”一起写清楚。",
          "项目推荐已经接入近 3 天去重策略，避免每日内容高度重复。",
          "投递链路也做过轻量化优化：只发文本与首图，其余卡片打包上传，兼顾可读性与分发效率。",
        ],
      },
    ],
  },
];

export function getCreationBySlug(slug: string) {
  return creations.find((entry) => entry.slug === slug);
}
