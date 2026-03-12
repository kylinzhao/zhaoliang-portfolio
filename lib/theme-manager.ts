import { DEFAULT_THEME_CONFIG, type ThemeConfig, type ThemeType, type ColorMode } from "@/types/theme";
import { loadPreferences, savePreferences } from "./preferences-storage";

const THEME_STORAGE_KEY = "theme-type";
const COLOR_MODE_STORAGE_KEY = "color-mode";

/**
 * 应用主题到 DOM
 */
export function applyTheme(config: ThemeConfig): void {
  const root = document.documentElement;

  // 设置主题类型
  if (config.themeType === "original") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", config.themeType);
  }

  // 设置颜色模式
  root.setAttribute("data-color-mode", config.colorMode);

  // 设置 dark class（为了向后兼容）
  if (config.colorMode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

/**
 * 获取当前主题配置
 */
export function getCurrentTheme(): ThemeConfig {
  const preferences = loadPreferences();

  const themeType = preferences.themeType || DEFAULT_THEME_CONFIG.themeType;
  const colorMode = preferences.colorMode || DEFAULT_THEME_CONFIG.colorMode;

  return {
    themeType: themeType as ThemeType,
    colorMode: colorMode as ColorMode,
  };
}

/**
 * 设置主题
 */
export function setTheme(config: Partial<ThemeConfig>): void {
  const currentConfig = getCurrentTheme();
  const newConfig = { ...currentConfig, ...config };

  // 应用主题到 DOM
  applyTheme(newConfig);

  // 保存到 localStorage
  savePreferences({
    themeType: newConfig.themeType,
    colorMode: newConfig.colorMode,
  });
}

/**
 * 设置主题类型
 */
export function setThemeType(themeType: ThemeType): void {
  setTheme({ themeType });
}

/**
 * 设置颜色模式
 */
export function setColorMode(colorMode: ColorMode): void {
  setTheme({ colorMode });
}

/**
 * 初始化主题系统
 */
export function initializeTheme(): void {
  const config = getCurrentTheme();
  applyTheme(config);
}

/**
 * 监听跨标签页的主题变更
 */
export function listenToThemeChanges(callback: (config: ThemeConfig) => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === COLOR_MODE_STORAGE_KEY || event.key === "user-preferences") {
      const config = getCurrentTheme();
      callback(config);
    }
  };

  window.addEventListener("storage", handler);

  // 返回清理函数
  return () => {
    window.removeEventListener("storage", handler);
  };
}
