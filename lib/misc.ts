/**
 * 기타 유틸리티
 */

import * as crypto from 'crypto';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function toHex(number: string | number): string {
  return parseInt(String(number)).toString(16);
}

export function fromHex(hex: string): string {
  return parseInt(hex, 16).toString(10);
}

export function hexToRgb(hex: string): RGB | null {
  // # 제거
  let cleanHex = hex.replace('#', '');
  
  // 3자리 또는 6자리 hex 확인
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }
  
  // 3자리 hex를 6자리로 확장
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return { r, g, b };
}

