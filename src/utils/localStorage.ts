import { PortRange } from '../types';

const STORAGE_KEYS = {
  PORT_RANGE: 'portRange',
  PORT_COUNT: 'portCount'
} as const;

export class LocalStorageService {
  static getPortRange(): PortRange {
    const stored = localStorage.getItem(STORAGE_KEYS.PORT_RANGE);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // 如果解析失败，返回默认值
      }
    }
    return { min: 3000, max: 65535 };
  }

  static setPortRange(range: PortRange): void {
    localStorage.setItem(STORAGE_KEYS.PORT_RANGE, JSON.stringify(range));
  }

  static getPortCount(): number {
    const stored = localStorage.getItem(STORAGE_KEYS.PORT_COUNT);
    if (stored) {
      const count = parseInt(stored, 10);
      if (!isNaN(count) && count >= 1 && count <= 1000) {
        return count;
      }
    }
    return 1;
  }

  static setPortCount(count: number): void {
    localStorage.setItem(STORAGE_KEYS.PORT_COUNT, count.toString());
  }
} 