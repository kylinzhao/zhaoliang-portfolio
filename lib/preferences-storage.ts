import type { UserPreferences } from "@/types/theme";

const STORAGE_KEY = "user-preferences";

/**
 * 保存用户偏好设置到 localStorage
 */
export function savePreferences(preferences: Partial<UserPreferences>): boolean {
  try {
    const existingPreferences = loadPreferences();
    const updatedPreferences = { ...existingPreferences, ...preferences };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded:", error);
      } else if (error.name === "SecurityError") {
        console.error("LocalStorage access denied:", error);
      } else {
        console.error("Failed to save preferences:", error);
      }
    }
    return false;
  }
}

/**
 * 从 localStorage 加载用户偏好设置
 */
export function loadPreferences(): UserPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    const preferences: UserPreferences = JSON.parse(stored);

    // 验证数据
    if (preferences.themeType && !isValidThemeType(preferences.themeType)) {
      delete preferences.themeType;
    }

    if (preferences.colorMode && !isValidColorMode(preferences.colorMode)) {
      delete preferences.colorMode;
    }

    return preferences;
  } catch (error) {
    console.error("Failed to load preferences:", error);

    // 如果 JSON 解析失败，清除损坏的数据
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // 忽略清除错误
    }

    return {};
  }
}

/**
 * 清除所有用户偏好设置
 */
export function clearPreferences(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear preferences:", error);
    return false;
  }
}

/**
 * 验证主题类型
 */
function isValidThemeType(value: string): boolean {
  return ["original", "warm", "noir"].includes(value);
}

/**
 * 验证颜色模式
 */
function isValidColorMode(value: string): boolean {
  return value === "light" || value === "dark";
}
