/**
 * 主题类型枚举
 */
export enum ThemeType {
  ORIGINAL = "original",
  WARM = "warm",
  NOIR = "noir",
}

/**
 * 颜色模式类型
 */
export type ColorMode = "light" | "dark";

/**
 * 主题配置接口
 */
export interface ThemeConfig {
  themeType: ThemeType;
  colorMode: ColorMode;
}

/**
 * 主题状态接口
 */
export interface ThemeState {
  config: ThemeConfig;
  setThemeType: (themeType: ThemeType) => void;
  setColorMode: (colorMode: ColorMode) => void;
}

/**
 * 用户偏好设置接口（用于 localStorage）
 */
export interface UserPreferences {
  themeType?: string;
  colorMode?: string;
  language?: string;
}

/**
 * 主题切换选项接口
 */
export interface ThemeOption {
  id: ThemeType;
  name: string;
  description: string;
  previewColors: {
    light: string;
    dark: string;
  };
}

/**
 * 验证主题类型
 */
export function isValidThemeType(value: string): value is ThemeType {
  return Object.values(ThemeType).includes(value as ThemeType);
}

/**
 * 验证颜色模式
 */
export function isValidColorMode(value: string): value is ColorMode {
  return value === "light" || value === "dark";
}

/**
 * 默认主题配置
 */
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  themeType: ThemeType.ORIGINAL,
  colorMode: "light",
};

/**
 * 主题选项列表
 */
export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: ThemeType.ORIGINAL,
    name: "Original",
    description: "现代科技、冷淡专业",
    previewColors: {
      light: "#ffffff",
      dark: "#0a0a0a",
    },
  },
  {
    id: ThemeType.WARM,
    name: "Cinematic Warm",
    description: "电影感暖调、温暖故事感",
    previewColors: {
      light: "#fafaf8",
      dark: "#2e2e28",
    },
  },
  {
    id: ThemeType.NOIR,
    name: "Noir Monochromatic",
    description: "黑白电影、艺术张力",
    previewColors: {
      light: "#ffffff",
      dark: "#1a1a1a",
    },
  },
];
