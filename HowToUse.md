# 사용 가이드 (How To Use)

이 문서는 web-utility 프로그램의 각 유틸리티 기능에 대한 상세한 사용 방법을 설명합니다.

## 목차

1. [텍스트 변환](#텍스트-변환)
2. [해시 생성](#해시-생성)
3. [인코딩/디코딩](#인코딩디코딩)
4. [JSON 처리](#json-처리)
5. [날짜/시간](#날짜시간)
6. [기타 유틸리티](#기타-유틸리티)
7. [이미지 변환](#이미지-변환)

---

## 텍스트 변환

텍스트 문자열을 다양한 방식으로 변환하거나 분석할 수 있습니다.

### 대문자로 변환

입력된 텍스트를 모두 대문자로 변환합니다.

```bash
npm start text --uppercase "hello world"
# 출력: HELLO WORLD

util text --uppercase "안녕하세요"
# 출력: 안녕하세요
```

### 소문자로 변환

입력된 텍스트를 모두 소문자로 변환합니다.

```bash
npm start text --lowercase "HELLO WORLD"
# 출력: hello world

util text --lowercase "HELLO"
# 출력: hello
```

### 문자열 역순

입력된 텍스트의 문자 순서를 뒤집습니다.

```bash
npm start text --reverse "hello"
# 출력: olleh

util text --reverse "안녕"
# 출력: 녕안
```

### 문자 수 세기

입력된 텍스트의 총 문자 수를 계산합니다. 공백도 포함됩니다.

```bash
npm start text --count "hello world"
# 출력: 문자 수: 11

util text --count "안녕하세요"
# 출력: 문자 수: 5
```

### 단어 수 세기

입력된 텍스트의 단어 수를 계산합니다. 공백으로 구분된 단어를 세며, 연속된 공백은 하나로 처리됩니다.

```bash
npm start text --words "hello world"
# 출력: 단어 수: 2

util text --words "안녕하세요 반갑습니다"
# 출력: 단어 수: 2

util text --words "one   two    three"
# 출력: 단어 수: 3
```

---

## 해시 생성

텍스트 문자열의 해시 값을 생성합니다. 암호화, 데이터 무결성 검증 등에 사용됩니다.

### MD5 해시

MD5 알고리즘을 사용하여 해시 값을 생성합니다.

```bash
npm start hash --md5 "hello"
# 출력: MD5: 5d41402abc4b2a76b9719d911017c592

util hash --md5 "password123"
# 출력: MD5: 482c811da5d5b4bc6d497ffa98491e38
```

### SHA256 해시

SHA-256 알고리즘을 사용하여 해시 값을 생성합니다. MD5보다 더 안전합니다.

```bash
npm start hash --sha256 "hello"
# 출력: SHA256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

util hash --sha256 "sensitive data"
# 출력: SHA256: [해시 값]
```

### SHA1 해시

SHA-1 알고리즘을 사용하여 해시 값을 생성합니다.

```bash
npm start hash --sha1 "hello"
# 출력: SHA1: aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d

util hash --sha1 "test"
# 출력: SHA1: [해시 값]
```

**참고**: SHA-1은 보안상 취약점이 있어 새로운 프로젝트에서는 SHA-256을 권장합니다.

---

## 인코딩/디코딩

텍스트를 다양한 형식으로 인코딩하거나 디코딩합니다.

### Base64 인코딩

텍스트를 Base64 형식으로 인코딩합니다. 바이너리 데이터를 텍스트로 변환할 때 사용됩니다.

```bash
npm start encode --base64-encode "hello"
# 출력: Base64: aGVsbG8=

util encode --base64-encode "안녕하세요"
# 출력: Base64: [인코딩된 값]
```

### Base64 디코딩

Base64로 인코딩된 텍스트를 원래 형태로 디코딩합니다.

```bash
npm start encode --base64-decode "aGVsbG8="
# 출력: Decoded: hello

util encode --base64-decode "7JWI64WV7ZWY7ISc7Jq4="
# 출력: Decoded: 안녕하세요
```

**오류 처리**: 유효하지 않은 Base64 문자열인 경우 오류 메시지가 표시됩니다.

### URL 인코딩

텍스트를 URL에 안전한 형식으로 인코딩합니다. 특수 문자를 퍼센트 인코딩으로 변환합니다.

```bash
npm start encode --url-encode "hello world"
# 출력: URL Encoded: hello%20world

util encode --url-encode "안녕하세요"
# 출력: URL Encoded: %EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94

util encode --url-encode "user@example.com"
# 출력: URL Encoded: user%40example.com
```

### URL 디코딩

URL 인코딩된 텍스트를 원래 형태로 디코딩합니다.

```bash
npm start encode --url-decode "hello%20world"
# 출력: URL Decoded: hello world

util encode --url-decode "%EC%95%88%EB%85%95"
# 출력: URL Decoded: 안녕
```

**오류 처리**: 유효하지 않은 URL 인코딩 문자열인 경우 오류 메시지가 표시됩니다.

---

## JSON 처리

JSON 문자열을 포맷팅, 압축, 검증할 수 있습니다.

### JSON 포맷팅

압축된 JSON 문자열을 읽기 쉬운 형식으로 포맷팅합니다.

```bash
npm start json --format '{"name":"John","age":30}'
# 출력:
# {
#   "name": "John",
#   "age": 30
# }

util json --format '{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]}'
# 출력: 포맷팅된 JSON
```

**오류 처리**: 유효하지 않은 JSON인 경우 오류 메시지가 표시됩니다.

### JSON 압축

포맷팅된 JSON 문자열을 한 줄로 압축합니다. 공백과 줄바꿈을 제거합니다.

```bash
npm start json --minify '{
  "name": "John",
  "age": 30
}'
# 출력: {"name":"John","age":30}

util json --minify '{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ]
}'
# 출력: {"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]}
```

### JSON 유효성 검사

JSON 문자열이 유효한지 검사합니다.

```bash
npm start json --validate '{"name":"John"}'
# 출력: ✓ 유효한 JSON입니다.

util json --validate '{"name":"John",}'
# 출력: ✗ 유효하지 않은 JSON입니다.

util json --validate 'invalid json'
# 출력: ✗ 유효하지 않은 JSON입니다.
```

---

## 날짜/시간

날짜와 시간을 다양한 형식으로 변환하거나 표시합니다.

### 현재 날짜/시간

현재 날짜와 시간을 한국 시간 형식으로 표시합니다.

```bash
npm start date --now
# 출력: 2024. 01. 15. 오후 3:30:45

util date --now
# 출력: 현재 날짜/시간
```

옵션 없이 실행해도 현재 날짜/시간이 표시됩니다:

```bash
npm start date
# 출력: 현재 날짜/시간
```

### Unix 타임스탬프를 날짜로 변환

Unix 타임스탬프(초 단위)를 읽을 수 있는 날짜 형식으로 변환합니다.

```bash
npm start date --unix 1609459200
# 출력: 2021. 01. 01. 오전 9:00:00

util date --unix 1704067200
# 출력: 변환된 날짜/시간
```

### 날짜를 Unix 타임스탬프로 변환

날짜 문자열을 Unix 타임스탬프로 변환합니다.

```bash
npm start date --timestamp "2021-01-01"
# 출력: Unix Timestamp: 1609459200

util date --timestamp "2024-01-15T15:30:00"
# 출력: Unix Timestamp: [타임스탬프 값]
```

**날짜 형식**: ISO 8601 형식 또는 일반적인 날짜 형식을 지원합니다.

### 날짜 포맷 지정

현재 날짜/시간을 지정한 형식으로 표시합니다.

```bash
npm start date --format "YYYY-MM-DD HH:mm:ss"
# 출력: 2024-01-15 15:30:45

util date --format "YYYY/MM/DD"
# 출력: 2024/01/15

util date --format "HH시 mm분 ss초"
# 출력: 15시 30분 45초
```

**포맷 코드**:

- `YYYY`: 4자리 연도
- `MM`: 2자리 월
- `DD`: 2자리 일
- `HH`: 2자리 시간 (24시간 형식)
- `mm`: 2자리 분
- `ss`: 2자리 초

---

## 기타 유틸리티

다양한 유용한 유틸리티 기능들을 제공합니다.

### UUID 생성

고유한 UUID(Universally Unique Identifier)를 생성합니다.

```bash
npm start misc --uuid
# 출력: 550e8400-e29b-41d4-a716-446655440000

util misc --uuid
# 출력: [새로운 UUID]
```

매번 실행할 때마다 다른 UUID가 생성됩니다.

### 랜덤 문자열 생성

지정한 길이의 랜덤 문자열을 생성합니다. 영문 대소문자와 숫자를 포함합니다.

```bash
npm start misc --random 10
# 출력: aB3dEf9GhI

util misc --random 20
# 출력: [20자리 랜덤 문자열]

util misc --random 5
# 출력: [5자리 랜덤 문자열]
```

**기본값**: 길이를 지정하지 않으면 10자리 문자열이 생성됩니다.

### 숫자를 16진수로 변환

10진수 숫자를 16진수로 변환합니다.

```bash
npm start misc --hex 255
# 출력: Hex: ff

util misc --hex 16
# 출력: Hex: 10

util misc --hex 4095
# 출력: Hex: fff
```

### 16진수를 10진수로 변환

16진수 문자열을 10진수로 변환합니다.

```bash
npm start misc --decimal "ff"
# 출력: Decimal: 255

util misc --decimal "10"
# 출력: Decimal: 16

util misc --decimal "FFF"
# 출력: Decimal: 4095
```

### 색상 코드 변환 (Hex → RGB)

16진수 색상 코드를 RGB 값으로 변환합니다.

```bash
npm start misc --color "#FF5733"
# 출력: RGB: rgb(255, 87, 51)

util misc --color "#000000"
# 출력: RGB: rgb(0, 0, 0)

util misc --color "#FFFFFF"
# 출력: RGB: rgb(255, 255, 255)

util misc --color "FF5733"
# 출력: RGB: rgb(255, 87, 51)
```

**지원 형식**:

- `#RRGGBB` (6자리)
- `#RGB` (3자리, 자동 확장)
- `RRGGBB` (# 없이도 가능)

**오류 처리**: 유효하지 않은 색상 코드인 경우 오류 메시지가 표시됩니다.

---

## 이미지 변환

이미지 파일의 확장자를 변환합니다. 단일 파일 또는 여러 파일을 한 번에 변환할 수 있습니다. 다양한 이미지 형식 간 변환을 지원하며, Windows, Linux, macOS 등 모든 플랫폼에서 동작합니다.

### 단일 이미지 변환

입력 이미지 파일을 지정한 형식으로 변환합니다. 출력 폴더를 지정하지 않으면 프로젝트 루트의 `output` 폴더에 저장됩니다.

**⚠ 중요**: `npm start` 사용 시 옵션 앞에 `--`를 추가해야 합니다.

```bash
# npm start 사용 (-- 필수)
npm start image -- --input "./photo.jpg" --format "png"
# 출력: ✓ 이미지 변환 완료: [경로]/output/photo.png

# 직접 node 명령어 사용 (권장)
node dist/bin/cli.js image --input "./photo.jpg" --format "png"

# 전역 설치 후 사용
util image --input "./image.png" --format "webp"
# 출력: ✓ 이미지 변환 완료: [경로]/output/image.webp
```

### 여러 이미지 일괄 변환 (Glob 패턴)

glob 패턴을 사용하여 여러 이미지를 한 번에 변환할 수 있습니다. `*`, `?`, `**` 등의 와일드카드를 사용할 수 있습니다.

```bash
# 특정 폴더의 모든 JPG 파일을 PNG로 변환 (npm start 사용 시 -- 필수)
npm start image -- --input "./images/*.jpg" --format "png"

# 직접 node 명령어 사용 (권장)
node dist/bin/cli.js image --input "./images/*.jpg" --format "png"

# 하위 폴더 포함 모든 PNG 파일을 WebP로 변환
npm start image -- --input "./photos/**/*.png" --format "webp"

# 특정 폴더의 모든 이미지 파일 변환
npm start image -- --input "./images/*.{jpg,png}" --format "webp"

# Windows 절대 경로 예제 (슬래시 사용 권장)
npm start image -- --input "C:/Users/user/images/*.jpg" --format "png"
node dist/bin/cli.js image --input "C:/Users/user/images/*.jpg" --format "png"

# Windows 절대 경로 예제 (백슬래시 두 번)
npm start image -- --input "C:\\Users\\user\\images\\*.jpg" --format "png"

# Linux/Mac 경로 예제
npm start image -- --input "/home/user/images/*.jpg" --format "png"
```

**Glob 패턴 예제**:

- `./images/*.jpg`: `images` 폴더의 모든 `.jpg` 파일
- `./photos/**/*.png`: `photos` 폴더 및 모든 하위 폴더의 `.png` 파일
- `./images/*.{jpg,png}`: `images` 폴더의 `.jpg`와 `.png` 파일
- `./images/img-*.jpg`: `images` 폴더에서 `img-`로 시작하는 모든 `.jpg` 파일

**일괄 변환 결과 예시**:

```bash
npm start image --input "./images/*.jpg" --format "png"

# 출력:
# 총 5개 파일 처리 완료:
# ✓ 성공: 5개
#
# 변환 완료된 파일:
#   ✓ [경로]/output/photo1.png
#   ✓ [경로]/output/photo2.png
#   ✓ [경로]/output/photo3.png
#   ✓ [경로]/output/photo4.png
#   ✓ [경로]/output/photo5.png
```

일부 파일이 실패한 경우:

```bash
# 출력:
# 총 5개 파일 처리 완료:
# ✓ 성공: 4개
# ✗ 실패: 1개
#
# 변환 완료된 파일:
#   ✓ [경로]/output/photo1.png
#   ...
#
# 변환 실패한 파일:
#   ✗ ./images/corrupted.jpg: 이미지 변환 실패: [오류 메시지]
```

### SVG 변환

SVG 파일을 PNG, WebP, JPG 형식으로 변환할 수 있습니다. 기본 크기는 48x48이며, `--size` 옵션으로 크기를 지정할 수 있습니다.

```bash
# SVG를 PNG로 변환 (기본 크기: 48x48)
npm start image -- --input "./icon.svg" --format "png"
# 출력: ✓ 이미지 변환 완료: [경로]/output/icon.png (크기: 48x48, 기본값)

# SVG를 지정 크기로 변환
npm start image -- --input "./icon.svg" --format "png" --size "100x100"
# 출력: ✓ 이미지 변환 완료: [경로]/output/icon.png (크기: 100x100)

# 정사각형 크기 지정 (한 값만 입력하면 정사각형)
npm start image -- --input "./icon.svg" --format "webp" --size "64"
# 출력: ✓ 이미지 변환 완료: [경로]/output/icon.webp (크기: 64x64)

# 여러 SVG 파일 일괄 변환
npm start image -- --input "./icons/*.svg" --format "png" --size "128x128"
node dist/bin/cli.js image --input "./icons/*.svg" --format "png" --size "128x128"
```

**SVG 변환 특징**:

- SVG는 PNG, WebP, JPG 형식으로만 변환 가능
- 기본 크기: 48x48 픽셀
- 크기 형식: `100x100` (가로x세로) 또는 `100` (정사각형)
- 투명 배경 유지 (PNG, WebP)

### 출력 폴더 지정

출력 폴더를 직접 지정할 수 있습니다. 폴더가 없으면 자동으로 생성됩니다.

```bash
npm start image -- --input "./photo.jpg" --format "png" --output "./converted"
# 출력: ✓ 이미지 변환 완료: [경로]/converted/photo.png

util image --input "./image.png" --format "jpg" --output "./images/jpg"
# 출력: ✓ 이미지 변환 완료: [경로]/images/jpg/image.jpg
```

### 지원 형식

다음 이미지 형식을 지원합니다:

- **JPEG/JPG**: `jpg`, `jpeg`
- **PNG**: `png`
- **WebP**: `webp`
- **GIF**: `gif`
- **BMP**: `bmp`
- **TIFF**: `tiff`
- **SVG**: `svg` (PNG, WebP, JPG로만 변환 가능, 기본 크기: 48x48)

### 파일명 규칙

- 입력 파일명과 동일한 이름을 사용합니다 (확장자만 변경)
- 예: `photo.jpg` → `photo.png`

### 예제

```bash
# JPG를 PNG로 변환
npm start image -- --input "./photo.jpg" --format "png"

# PNG를 WebP로 변환 (고품질, 작은 파일 크기)
npm start image -- --input "./image.png" --format "webp" --output "./webp_images"

# GIF를 PNG로 변환
npm start image -- --input "./animation.gif" --format "png"

# BMP를 JPEG로 변환
npm start image -- --input "./bitmap.bmp" --format "jpg"

# SVG를 PNG로 변환 (기본 크기: 48x48)
npm start image -- --input "./icon.svg" --format "png"

# SVG를 WebP로 변환 (지정 크기: 128x128)
npm start image -- --input "./icon.svg" --format "webp" --size "128x128"

# 여러 SVG 파일을 일괄 변환
npm start image -- --input "./icons/*.svg" --format "png" --size "64"
```

### 오류 처리

**파일을 찾을 수 없는 경우**:

```bash
npm start image --input "./nonexistent.jpg" --format "png"
# 출력: ✗ 오류: 입력 파일을 찾을 수 없습니다: ./nonexistent.jpg
```

**지원하지 않는 형식**:

```bash
npm start image --input "./file.pdf" --format "png"
# 출력: ✗ 오류: 지원하지 않는 이미지 형식입니다: pdf
```

**변환 실패**:

```bash
# 손상된 이미지 파일 등
# 출력: ✗ 오류: 이미지 변환 실패: [상세 오류 메시지]
```

### 크로스 플랫폼 경로 지원

Windows, Linux, macOS 등 모든 운영체제에서 동일하게 작동합니다. 경로 구분자는 자동으로 처리됩니다.

```bash
# Windows
npm start image --input "C:\\Users\\user\\images\\*.jpg" --format "png"
npm start image --input "./images/*.jpg" --format "png"

# Linux/Mac
npm start image --input "/home/user/images/*.jpg" --format "png"
npm start image --input "./images/*.jpg" --format "png"
```

### 주의사항

1. **파일 경로**: 상대 경로와 절대 경로 모두 지원합니다. Windows, Linux, macOS 경로 모두 호환됩니다.
2. **출력 폴더**: 출력 폴더가 없으면 자동으로 생성됩니다.
3. **파일 덮어쓰기**: 같은 이름의 파일이 있으면 덮어씁니다.
4. **대용량 파일**: 매우 큰 이미지 파일의 경우 변환에 시간이 걸릴 수 있습니다.
5. **Glob 패턴**: 여러 파일을 변환할 때 일부 파일이 실패해도 나머지 파일은 계속 처리됩니다.
6. **파일 검색**: glob 패턴으로 파일을 찾지 못하면 오류가 발생합니다.

---

## 일반적인 사용 팁

### 명령어 단축

전역 설치 후 `util` 명령어를 사용하면 더 간편합니다:

```bash
# 전역 설치
npm install -g .
npm run build

# 사용
util text --uppercase "hello"
util hash --md5 "password"
util image --input "./photo.jpg" --format "png"
```

### 도움말 확인

각 명령어의 도움말을 확인하려면 `--help` 옵션을 사용하세요:

```bash
npm start --help
npm start text --help
npm start image --help
```

### 여러 명령어 조합

파이프를 사용하여 여러 명령어를 조합할 수 있습니다:

```bash
# Base64 인코딩 후 MD5 해시 생성
echo "hello" | xargs -I {} npm start encode --base64-encode {} | xargs -I {} npm start hash --md5 {}
```

---

## 문제 해결

### 빌드 오류

TypeScript 컴파일 오류가 발생하면:

```bash
npm run build
```

오류 메시지를 확인하고 코드를 수정하세요.

### 모듈을 찾을 수 없음

의존성이 설치되지 않은 경우:

```bash
npm install
```

### 이미지 변환 실패

1. 입력 파일 경로가 올바른지 확인하세요.
2. 파일이 손상되지 않았는지 확인하세요.
3. 지원하는 형식인지 확인하세요.

---

## 추가 정보

더 자세한 정보는 [README.md](./README.md)를 참고하세요.
