#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import * as path from 'path';
import * as textUtils from '../lib/text';
import * as hashUtils from '../lib/hash';
import * as encodeUtils from '../lib/encode';
import * as jsonUtils from '../lib/json';
import * as dateUtils from '../lib/date';
import * as miscUtils from '../lib/misc';
import * as imageUtils from '../lib/image';

const program = new Command();

program
  .name('util')
  .description('다양한 유틸리티를 제공하는 터미널 프로그램')
  .version('1.0.0');

// 텍스트 변환 명령어
program
  .command('text')
  .description('텍스트 변환 유틸리티')
  .option('-u, --uppercase <text>', '대문자로 변환')
  .option('-l, --lowercase <text>', '소문자로 변환')
  .option('-r, --reverse <text>', '문자열 역순')
  .option('-c, --count <text>', '문자 수 세기')
  .option('-w, --words <text>', '단어 수 세기')
  .action((options: { uppercase?: string; lowercase?: string; reverse?: string; count?: string; words?: string }) => {
    if (options.uppercase) {
      console.log(chalk.green(textUtils.toUpperCase(options.uppercase)));
    } else if (options.lowercase) {
      console.log(chalk.green(textUtils.toLowerCase(options.lowercase)));
    } else if (options.reverse) {
      console.log(chalk.green(textUtils.reverse(options.reverse)));
    } else if (options.count) {
      console.log(chalk.green(`문자 수: ${textUtils.countChars(options.count)}`));
    } else if (options.words) {
      console.log(chalk.green(`단어 수: ${textUtils.countWords(options.words)}`));
    } else {
      console.log(chalk.red('옵션을 지정해주세요. --help를 사용하여 사용법을 확인하세요.'));
    }
  });

// 해시 생성 명령어
program
  .command('hash')
  .description('해시 생성 유틸리티')
  .option('-m, --md5 <text>', 'MD5 해시 생성')
  .option('-s, --sha256 <text>', 'SHA256 해시 생성')
  .option('-1, --sha1 <text>', 'SHA1 해시 생성')
  .action((options: { md5?: string; sha256?: string; sha1?: string }) => {
    if (options.md5) {
      console.log(chalk.green(`MD5: ${hashUtils.md5(options.md5)}`));
    } else if (options.sha256) {
      console.log(chalk.green(`SHA256: ${hashUtils.sha256(options.sha256)}`));
    } else if (options.sha1) {
      console.log(chalk.green(`SHA1: ${hashUtils.sha1(options.sha1)}`));
    } else {
      console.log(chalk.red('옵션을 지정해주세요. --help를 사용하여 사용법을 확인하세요.'));
    }
  });

// 인코딩/디코딩 명령어
program
  .command('encode')
  .description('인코딩/디코딩 유틸리티')
  .option('-b64e, --base64-encode <text>', 'Base64 인코딩')
  .option('-b64d, --base64-decode <text>', 'Base64 디코딩')
  .option('-ue, --url-encode <text>', 'URL 인코딩')
  .option('-ud, --url-decode <text>', 'URL 디코딩')
  .action((options: { base64Encode?: string; base64Decode?: string; urlEncode?: string; urlDecode?: string }) => {
    if (options.base64Encode) {
      console.log(chalk.green(`Base64: ${encodeUtils.base64Encode(options.base64Encode)}`));
    } else if (options.base64Decode) {
      try {
        console.log(chalk.green(`Decoded: ${encodeUtils.base64Decode(options.base64Decode)}`));
      } catch (e) {
        console.log(chalk.red('디코딩 실패: 유효하지 않은 Base64 문자열입니다.'));
      }
    } else if (options.urlEncode) {
      console.log(chalk.green(`URL Encoded: ${encodeUtils.urlEncode(options.urlEncode)}`));
    } else if (options.urlDecode) {
      try {
        console.log(chalk.green(`URL Decoded: ${encodeUtils.urlDecode(options.urlDecode)}`));
      } catch (e) {
        console.log(chalk.red('디코딩 실패: 유효하지 않은 URL 인코딩 문자열입니다.'));
      }
    } else {
      console.log(chalk.red('옵션을 지정해주세요. --help를 사용하여 사용법을 확인하세요.'));
    }
  });

// JSON 처리 명령어
program
  .command('json')
  .description('JSON 처리 유틸리티')
  .option('-f, --format <json>', 'JSON 포맷팅')
  .option('-m, --minify <json>', 'JSON 압축')
  .option('-v, --validate <json>', 'JSON 유효성 검사')
  .action((options: { format?: string; minify?: string; validate?: string }) => {
    if (options.format) {
      try {
        console.log(chalk.green(jsonUtils.format(options.format)));
      } catch (e) {
        console.log(chalk.red('JSON 포맷팅 실패: 유효하지 않은 JSON입니다.'));
      }
    } else if (options.minify) {
      try {
        console.log(chalk.green(jsonUtils.minify(options.minify)));
      } catch (e) {
        console.log(chalk.red('JSON 압축 실패: 유효하지 않은 JSON입니다.'));
      }
    } else if (options.validate) {
      const isValid = jsonUtils.validate(options.validate);
      if (isValid) {
        console.log(chalk.green('✓ 유효한 JSON입니다.'));
      } else {
        console.log(chalk.red('✗ 유효하지 않은 JSON입니다.'));
      }
    } else {
      console.log(chalk.red('옵션을 지정해주세요. --help를 사용하여 사용법을 확인하세요.'));
    }
  });

// 날짜/시간 명령어
program
  .command('date')
  .description('날짜/시간 유틸리티')
  .option('-n, --now', '현재 날짜/시간')
  .option('-u, --unix <timestamp>', 'Unix 타임스탬프를 날짜로 변환')
  .option('-t, --timestamp <date>', '날짜를 Unix 타임스탬프로 변환')
  .option('-f, --format <format>', '날짜 포맷 지정 (예: YYYY-MM-DD HH:mm:ss)')
  .action((options: { now?: boolean; unix?: string; timestamp?: string; format?: string }) => {
    if (options.now) {
      console.log(chalk.green(dateUtils.now()));
    } else if (options.unix) {
      console.log(chalk.green(dateUtils.unixToDate(options.unix)));
    } else if (options.timestamp) {
      console.log(chalk.green(`Unix Timestamp: ${dateUtils.dateToUnix(options.timestamp)}`));
    } else if (options.format) {
      console.log(chalk.green(dateUtils.formatDate(options.format)));
    } else {
      console.log(chalk.green(dateUtils.now()));
    }
  });

// 기타 유틸리티 명령어
program
  .command('misc')
  .description('기타 유틸리티')
  .option('-u, --uuid', 'UUID 생성')
  .option('-r, --random <length>', '랜덤 문자열 생성')
  .option('-h, --hex <number>', '숫자를 16진수로 변환')
  .option('-d, --decimal <hex>', '16진수를 10진수로 변환')
  .option('-c, --color <hex>', '16진수 색상 코드를 RGB로 변환')
  .action((options: { uuid?: boolean; random?: string; hex?: string; decimal?: string; color?: string }) => {
    if (options.uuid) {
      console.log(chalk.green(miscUtils.generateUUID()));
    } else if (options.random) {
      const length = parseInt(options.random) || 10;
      console.log(chalk.green(miscUtils.randomString(length)));
    } else if (options.hex) {
      console.log(chalk.green(`Hex: ${miscUtils.toHex(options.hex)}`));
    } else if (options.decimal) {
      console.log(chalk.green(`Decimal: ${miscUtils.fromHex(options.decimal)}`));
    } else if (options.color) {
      const rgb = miscUtils.hexToRgb(options.color);
      if (rgb) {
        console.log(chalk.green(`RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`));
      } else {
        console.log(chalk.red('유효하지 않은 색상 코드입니다.'));
      }
    } else {
      console.log(chalk.red('옵션을 지정해주세요. --help를 사용하여 사용법을 확인하세요.'));
    }
  });

// 이미지 변환 명령어
program
  .command('image')
  .description('이미지 확장자 변환 유틸리티 (단일 파일 또는 glob 패턴 지원, SVG 변환 지원)')
  .requiredOption('-i, --input <path>', '입력 이미지 파일 경로 또는 glob 패턴 (예: ./images/*.jpg)')
  .requiredOption('-f, --format <format>', '출력 이미지 형식 (jpg, png, webp, gif, bmp, tiff)')
  .option('-o, --output <dir>', '출력 디렉토리 (기본값: ./output)')
  .option('-s, --size <size>', '이미지 크기 (예: 100x100, SVG의 경우 기본값: 48x48)')
  .action(async (options: { input: string; format: string; output?: string; size?: string }) => {
    try {
      // Windows CMD에서 백슬래시가 이스케이프되어 올 수 있으므로 정규화
      let inputPath = options.input;
      if (inputPath) {
        // 이스케이프된 백슬래시를 일반 백슬래시로 변환
        inputPath = inputPath.replace(/\\\\/g, '\\');
      }
      
      // 입력값 검증
      if (!inputPath || inputPath.trim() === '') {
        console.log(chalk.red('✗ 오류: 입력 파일 경로를 지정해주세요.'));
        console.log(chalk.yellow('\n사용 예시:'));
        console.log(chalk.cyan('  npm start image --input "./photo.jpg" --format "png"'));
        console.log(chalk.cyan('  npm start image --input "./images/*.jpg" --format "png"'));
        console.log(chalk.cyan('  npm start image --input "C:\\Users\\user\\images\\*.jpg" --format "png"\n'));
        process.exit(1);
      }

      if (!options.format || options.format.trim() === '') {
        console.log(chalk.red('✗ 오류: 출력 형식을 지정해주세요.'));
        console.log(chalk.yellow('\n지원 형식: jpg, png, webp, gif, bmp, tiff'));
        process.exit(1);
      }

      // 크기 파싱 (예: "100x100" 또는 "100")
      let width: number | undefined;
      let height: number | undefined;
      if (options.size) {
        const sizeMatch = options.size.match(/^(\d+)(?:x(\d+))?$/i);
        if (sizeMatch) {
          width = parseInt(sizeMatch[1]);
          height = sizeMatch[2] ? parseInt(sizeMatch[2]) : width; // 높이가 없으면 너비와 동일
        } else {
          console.log(chalk.red('✗ 오류: 크기 형식이 올바르지 않습니다. (예: 100x100 또는 100)'));
          process.exit(1);
        }
      }
      
      // glob 패턴인지 확인 (* 또는 ? 포함 여부)
      const isGlobPattern = inputPath.includes('*') || inputPath.includes('?') || inputPath.includes('[');
      
      if (isGlobPattern) {
        // 여러 파일 변환
        const results = await imageUtils.convertImages({
          inputPath: inputPath,
          outputFormat: options.format,
          outputDir: options.output,
          width: width,
          height: height
        });

        const successCount = results.filter(r => r.success).length;
        const failCount = results.filter(r => !r.success).length;

        console.log(chalk.cyan(`\n총 ${results.length}개 파일 처리 완료:`));
        console.log(chalk.green(`✓ 성공: ${successCount}개`));
        if (failCount > 0) {
          console.log(chalk.red(`✗ 실패: ${failCount}개`));
        }

        // 성공한 파일 목록
        if (successCount > 0) {
          console.log(chalk.green('\n변환 완료된 파일:'));
          results.filter(r => r.success).forEach(result => {
            console.log(chalk.green(`  ✓ ${result.outputPath}`));
          });
        }

        // 실패한 파일 목록
        if (failCount > 0) {
          console.log(chalk.red('\n변환 실패한 파일:'));
          results.filter(r => !r.success).forEach(result => {
            console.log(chalk.red(`  ✗ ${result.inputPath}: ${result.error || '알 수 없는 오류'}`));
          });
        }
      } else {
        // 단일 파일 변환
        const outputPath = await imageUtils.convertImage({
          inputPath: inputPath,
          outputFormat: options.format,
          outputDir: options.output,
          width: width,
          height: height
        });
        
        // 크기 정보 표시 (SVG인 경우)
        const inputExt = path.extname(inputPath).toLowerCase().slice(1);
        if (inputExt === 'svg' && (width || height)) {
          const finalWidth = width || 48;
          const finalHeight = height || 48;
          console.log(chalk.green(`✓ 이미지 변환 완료: ${outputPath} (크기: ${finalWidth}x${finalHeight})`));
        } else if (inputExt === 'svg') {
          console.log(chalk.green(`✓ 이미지 변환 완료: ${outputPath} (크기: 48x48, 기본값)`));
        } else {
          console.log(chalk.green(`✓ 이미지 변환 완료: ${outputPath}`));
        }
      }
    } catch (error) {
      console.log(chalk.red(`✗ 오류: ${error instanceof Error ? error.message : String(error)}`));
      console.log(chalk.yellow('\n사용법을 확인하려면:'));
      console.log(chalk.cyan('  npm start image --help'));
      process.exit(1);
    }
  });

// 오류 처리 개선 - required option 오류를 더 친화적으로 표시
program.configureOutput({
  writeErr: (str) => {
    // required option 오류를 더 친화적으로 표시
    if (str.includes('required option')) {
      const command = process.argv[2];
      if (command === 'image') {
        console.log(chalk.red('✗ 오류: 필수 옵션이 누락되었습니다.\n'));
        console.log(chalk.yellow('사용 예시:'));
        console.log(chalk.cyan('  npm start image --input "./photo.jpg" --format "png"'));
        console.log(chalk.cyan('  npm start image --input "./images/*.jpg" --format "png"'));
        console.log(chalk.cyan('  npm start image --input "C:\\Users\\user\\images\\*.jpg" --format "png"\n'));
        console.log(chalk.yellow('⚠ 중요: npm start 사용 시 옵션 앞에 -- 를 추가해야 합니다:'));
        console.log(chalk.cyan('  npm start image -- --input "./photo.jpg" --format "png"'));
        console.log(chalk.cyan('  npm start image -- --input "C:/Users/user/images/*.jpg" --format "png"\n'));
        console.log(chalk.yellow('또는 직접 node 명령어를 사용할 수도 있습니다:'));
        console.log(chalk.cyan('  node dist/bin/cli.js image --input "./photo.jpg" --format "png"\n'));
        console.log(chalk.yellow('Windows 경로 참고:'));
        console.log(chalk.cyan('  - 백슬래시 두 번: "C:\\\\Users\\\\user\\\\images\\\\*.jpg"'));
        console.log(chalk.cyan('  - 슬래시 사용: "C:/Users/user/images/*.jpg" (권장)\n'));
        console.log(chalk.yellow('도움말 보기:'));
        console.log(chalk.cyan('  npm start image --help\n'));
      } else {
        process.stderr.write(str);
      }
    } else {
      process.stderr.write(str);
    }
  }
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

