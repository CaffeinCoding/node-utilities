/**
 * 텍스트 변환 유틸리티
 */

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function reverse(text: string): string {
  return text.split('').reverse().join('');
}

export function countChars(text: string): number {
  return text.length;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

