/**
 * JSON 처리 유틸리티
 */

export function format(jsonString: string): string {
  const obj = JSON.parse(jsonString);
  return JSON.stringify(obj, null, 2);
}

export function minify(jsonString: string): string {
  const obj = JSON.parse(jsonString);
  return JSON.stringify(obj);
}

export function validate(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

