/**
 * App 应用信息
 */
export interface App {
  /** App 名称 */
  name: string;

  /** App 图标 URL */
  icon: string;

  /** App Store 链接（可选） */
  appStoreUrl?: string;

  /** 应用类型 */
  category?: 'ecommerce' | 'travel' | 'convenience' | 'o2o';
}
