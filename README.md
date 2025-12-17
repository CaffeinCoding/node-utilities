# Web Utility

다양한 유틸리티를 제공하는 Node.js 기반 터미널 프로그램입니다. TypeScript로 작성되었습니다.

> 📖 **상세한 사용 가이드**: [HowToUse.md](./HowToUse.md) 파일에서 각 유틸리티별 사용 방법을 확인하세요.

## 설치

```bash
npm install
```

## 빌드

TypeScript를 JavaScript로 컴파일합니다:

```bash
npm run build
```

개발 모드 (빌드 후 실행):

```bash
npm run dev
```

## 사용법

### 텍스트 변환

```bash
# 대문자로 변환
npm start text --uppercase "hello world"

# 소문자로 변환
npm start text --lowercase "HELLO WORLD"

# 문자열 역순
npm start text --reverse "hello"

# 문자 수 세기
npm start text --count "hello world"

# 단어 수 세기
npm start text --words "hello world"
```

### 해시 생성

```bash
# MD5 해시
npm start hash --md5 "hello"

# SHA256 해시
npm start hash --sha256 "hello"

# SHA1 해시
npm start hash --sha1 "hello"
```

### 인코딩/디코딩

```bash
# Base64 인코딩
npm start encode --base64-encode "hello"

# Base64 디코딩
npm start encode --base64-decode "aGVsbG8="

# URL 인코딩
npm start encode --url-encode "hello world"

# URL 디코딩
npm start encode --url-decode "hello%20world"
```

### JSON 처리

```bash
# JSON 포맷팅
npm start json --format '{"name":"John","age":30}'

# JSON 압축
npm start json --minify '{"name": "John", "age": 30}'

# JSON 유효성 검사
npm start json --validate '{"name":"John"}'
```

### 날짜/시간

```bash
# 현재 날짜/시간
npm start date --now

# Unix 타임스탬프를 날짜로 변환
npm start date --unix 1609459200

# 날짜를 Unix 타임스탬프로 변환
npm start date --timestamp "2021-01-01"

# 날짜 포맷 지정
npm start date --format "YYYY-MM-DD HH:mm:ss"
```

### 기타 유틸리티

```bash
# UUID 생성
npm start misc --uuid

# 랜덤 문자열 생성
npm start misc --random 10

# 숫자를 16진수로 변환
npm start misc --hex 255

# 16진수를 10진수로 변환
npm start misc --decimal "ff"

# 16진수 색상 코드를 RGB로 변환
npm start misc --color "#FF5733"
```

### 이미지 변환

```bash
# 단일 이미지 확장자 변환 (기본 출력 폴더: ./output)
npm start image -- --input "./photo.jpg" --format "png"

# 여러 이미지 일괄 변환 (glob 패턴 지원)
npm start image -- --input "./images/*.jpg" --format "png"
npm start image -- --input "./photos/**/*.png" --format "webp"

# Windows 절대 경로 사용 (백슬래시 두 번 또는 슬래시 사용)
npm start image -- --input "C:\\Users\\user\\images\\*.jpg" --format "png"
npm start image -- --input "C:/Users/user/images/*.jpg" --format "png"

# 이미지 확장자 변환 (출력 폴더 지정)
npm start image -- --input "./photo.jpg" --format "webp" --output "./converted"

# SVG를 PNG/WebP/JPG로 변환 (기본 크기: 48x48)
npm start image -- --input "./icon.svg" --format "png"
npm start image -- --input "./icons/*.svg" --format "webp"

# SVG를 지정 크기로 변환
npm start image -- --input "./icon.svg" --format "png" --size "100x100"
npm start image -- --input "./icon.svg" --format "png" --size "64"  # 64x64

# 지원 형식: jpg, jpeg, png, webp, gif, bmp, tiff
# SVG 변환: SVG → PNG, WebP, JPG (기본 크기: 48x48)
# 크로스 플랫폼 경로 지원 (Windows, Linux, macOS)
# 참고: npm start 사용 시 옵션 앞에 -- 를 추가하세요
```

## 전역 설치 (선택사항)

전역으로 설치하여 어디서나 `util` 명령어를 사용할 수 있습니다:

```bash
npm install -g .
npm run build
```

그 후 다음과 같이 사용할 수 있습니다:

```bash
util text --uppercase "hello"
util hash --md5 "hello"
```

## 개발

TypeScript 파일을 감시 모드로 컴파일:

```bash
npm run watch
```

## 기술 스택

- **TypeScript**: 타입 안정성을 위한 언어
- **Commander.js**: CLI 명령어 파싱
- **Chalk**: 터미널 색상 출력
- **Sharp**: 고성능 이미지 처리 라이브러리

## 기능 목록

- ✅ 텍스트 변환 (대소문자, 역순, 문자/단어 수 세기)
- ✅ 해시 생성 (MD5, SHA1, SHA256)
- ✅ 인코딩/디코딩 (Base64, URL)
- ✅ JSON 처리 (포맷팅, 압축, 유효성 검사)
- ✅ 날짜/시간 변환
- ✅ UUID 생성
- ✅ 랜덤 문자열 생성
- ✅ 진법 변환 (10진수 ↔ 16진수)
- ✅ 색상 코드 변환 (Hex → RGB)
- ✅ 이미지 확장자 변환 (jpg, png, webp, gif, bmp, tiff)
- ✅ SVG 변환 (SVG → PNG, WebP, JPG, 기본 크기: 48x48, 크기 지정 가능)

## 라이선스

MIT
