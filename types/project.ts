/**
 * 项目展示数据类型
 */

/**
 * 个人项目信息
 */
export interface Project {
  /** 项目名称 */
  name: string;

  /** 项目图标（emoji 或图片 URL） */
  icon: string;

  /** 项目描述 */
  description: string;

  /** 项目链接类型 */
  linkType: 'internal' | 'external';

  /** 项目链接（内部路径或外部 URL） */
  url: string;

  /** 项目状态 */
  status: 'active' | 'wip' | 'planned';

  /** 技术栈标签（可选） */
  tags?: string[];
}
