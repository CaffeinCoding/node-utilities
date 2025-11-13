/**
 * 이미지 변환 유틸리티
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

export interface ConvertOptions {
  inputPath: string;
  outputFormat: string;
  outputDir?: string;
}

export interface ConvertResult {
  inputPath: string;
  outputPath: string;
  success: boolean;
  error?: string;
}

const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg'];

/**
 * 단일 이미지 파일 변환
 */
export async function convertImage(options: ConvertOptions): Promise<string> {
  const { inputPath, outputFormat, outputDir } = options;

  // 입력 파일 존재 확인
  if (!fs.existsSync(inputPath)) {
    throw new Error(`입력 파일을 찾을 수 없습니다: ${inputPath}`);
  }

  // 입력 파일 확장자 확인
  const inputExt = path.extname(inputPath).toLowerCase().slice(1);
  
  if (!supportedFormats.includes(inputExt)) {
    throw new Error(`지원하지 않는 이미지 형식입니다: ${inputExt}`);
  }

  // 출력 형식 검증
  const normalizedOutputFormat = outputFormat.toLowerCase();
  if (!supportedFormats.includes(normalizedOutputFormat)) {
    throw new Error(`지원하지 않는 출력 형식입니다: ${normalizedOutputFormat}`);
  }

  // 출력 디렉토리 결정
  let finalOutputDir: string;
  if (outputDir) {
    finalOutputDir = path.resolve(outputDir);
  } else {
    // 프로젝트 루트의 output 폴더 사용
    const projectRoot = process.cwd();
    finalOutputDir = path.join(projectRoot, 'output');
  }

  // 출력 디렉토리 생성 (없는 경우)
  if (!fs.existsSync(finalOutputDir)) {
    fs.mkdirSync(finalOutputDir, { recursive: true });
  }

  // 출력 파일명 생성 (입력 파일명과 동일, 확장자만 변경)
  const inputFileName = path.basename(inputPath, path.extname(inputPath));
  const outputFileName = `${inputFileName}.${normalizedOutputFormat}`;
  const outputPath = path.join(finalOutputDir, outputFileName);

  // 이미지 변환
  try {
    await sharp(inputPath)
      .toFormat(normalizedOutputFormat as any)
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    throw new Error(`이미지 변환 실패: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * glob 패턴을 사용하여 여러 이미지 파일 변환
 */
export async function convertImages(options: ConvertOptions): Promise<ConvertResult[]> {
  const { inputPath, outputFormat, outputDir } = options;

  // 출력 형식 검증
  const normalizedOutputFormat = outputFormat.toLowerCase();
  if (!supportedFormats.includes(normalizedOutputFormat)) {
    throw new Error(`지원하지 않는 출력 형식입니다: ${normalizedOutputFormat}`);
  }

  // glob 패턴으로 파일 찾기
  let matchedFiles: string[];
  try {
    // 크로스 플랫폼 경로 지원을 위해 경로 정규화
    // Windows 경로 구분자를 Unix 스타일로 변환 (glob 라이브러리는 Unix 스타일을 선호)
    let normalizedPath = inputPath.replace(/\\/g, '/');
    
    // 절대 경로인 경우 처리
    const isAbsolute = path.isAbsolute(inputPath);
    
    if (isAbsolute) {
      // 절대 경로인 경우, glob이 절대 경로를 직접 처리하도록 함
      // Windows 드라이브 문자를 포함한 절대 경로 처리
      matchedFiles = await glob(normalizedPath, {
        absolute: true
      });
    } else {
      // 상대 경로인 경우
      matchedFiles = await glob(normalizedPath, {
        cwd: process.cwd(),
        absolute: false
      });
    }
    
    // 결과 경로를 현재 플랫폼에 맞게 정규화
    matchedFiles = matchedFiles.map(file => {
      // glob 결과가 이미 절대 경로인 경우 그대로 사용, 아니면 정규화
      if (path.isAbsolute(file)) {
        return path.normalize(file);
      } else {
        return path.normalize(path.join(process.cwd(), file));
      }
    });
  } catch (error) {
    throw new Error(`파일 검색 실패: ${error instanceof Error ? error.message : String(error)}`);
  }

  if (matchedFiles.length === 0) {
    throw new Error(`입력 패턴과 일치하는 파일을 찾을 수 없습니다: ${inputPath}`);
  }

  // 출력 디렉토리 결정
  let finalOutputDir: string;
  if (outputDir) {
    finalOutputDir = path.resolve(outputDir);
  } else {
    const projectRoot = process.cwd();
    finalOutputDir = path.join(projectRoot, 'output');
  }

  // 출력 디렉토리 생성 (없는 경우)
  if (!fs.existsSync(finalOutputDir)) {
    fs.mkdirSync(finalOutputDir, { recursive: true });
  }

  // 각 파일에 대해 변환 수행
  const results: ConvertResult[] = [];

  for (const filePath of matchedFiles) {
    // 파일 존재 확인
    if (!fs.existsSync(filePath)) {
      results.push({
        inputPath: filePath,
        outputPath: '',
        success: false,
        error: '파일을 찾을 수 없습니다'
      });
      continue;
    }

    // 입력 파일 확장자 확인
    const inputExt = path.extname(filePath).toLowerCase().slice(1);
    if (!supportedFormats.includes(inputExt)) {
      results.push({
        inputPath: filePath,
        outputPath: '',
        success: false,
        error: `지원하지 않는 이미지 형식: ${inputExt}`
      });
      continue;
    }

    // 출력 파일명 생성
    const inputFileName = path.basename(filePath, path.extname(filePath));
    const outputFileName = `${inputFileName}.${normalizedOutputFormat}`;
    const outputPath = path.join(finalOutputDir, outputFileName);

    // 이미지 변환
    try {
      await sharp(filePath)
        .toFormat(normalizedOutputFormat as any)
        .toFile(outputPath);

      results.push({
        inputPath: filePath,
        outputPath: outputPath,
        success: true
      });
    } catch (error) {
      results.push({
        inputPath: filePath,
        outputPath: '',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  return results;
}

