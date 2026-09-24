# 밸류플러스 (ValuePlus) 공식 회사 웹사이트

> **데이터로 가치를 더하고, IT로 솔루션을 완성합니다.**  
> 학술연구용역·통계분석 전문기관 및 현장 특화 IT 솔루션(시모니 1.0, 전담센터 ERP) 개발

---

## 1. 프로젝트 개요

본 웹사이트는 밸류플러스(ValuePlus)의 공식 웹 포털로, 기존의 단편적인 블로그 형태를 넘어 회사의 양대 핵심 경쟁력인:
1. **전문 학술연구용역 및 통계분석 보고서**: 고객 및 수요자 만족도 조사, 대상자 사전-사후 역량검사, 공공기관 및 대학교 사업단 연구용역
2. **현장 특화 IT 솔루션 & 기술지원**: 소방공무원 상담 특화 ERP **'시모니 1.0'**, **'학생정신건강 전담센터 통합관리 ERP'**, 온라인 스마트 설문 엔진

을 일목요연하고 신뢰감 있게 전달하도록 기획·제작된 모던 반응형 웹사이트입니다.

---

## 2. 디렉토리 구조

```
vp/
├── index.html                  # 메인 웹사이트 진입점 (시맨틱 HTML5)
├── css/
│   └── style.css               # 모던 프리미엄 반응형 스타일시트 (Pretendard 기반)
├── js/
│   └── main.js                 # 반응형 햄버거 메뉴, 스크롤 인터랙션, 문의 폼 처리
├── assets/                     # 공식 로고 및 그래픽 에셋
│   ├── logo_symbol.jpg         # 밸류플러스 '+' 심볼 로고
│   ├── logo_with_name.jpg      # 심볼 + 사명 조합 로고
│   └── business_card.jpg       # 공식 명함 에셋
├── [사업 소개서 및 제안서]/    # 원본 소개서, 제안서, 견본 보고서 보관 폴더
└── README.md                   # 프로젝트 설명 및 배포 가이드
```

---

## 3. 로컬 실행 방법

브라우저에서 `index.html` 파일을 직접 더블 클릭하여 실행하거나, 로컬 웹 서버를 실행하여 확인할 수 있습니다:

```bash
# Python 내장 웹 서버 실행 (포트 3000)
python -m http.server 3000

# 또는 npx serve 사용 시
npx serve .
```

실행 후 웹 브라우저에서 `http://localhost:3000`으로 접속합니다.

---

## 4. GitHub 연동 및 배포 가이드

### 1단계: Git 저장소 초기화 및 첫 커밋
```bash
git init
git add index.html css/ js/ assets/ README.md
git commit -m "feat: 밸류플러스 공식 웹사이트 초안 구축 (학술통계 및 시모니/ERP 포트폴리오)"
```

### 2단계: GitHub 리포지토리 생성 및 푸시
GitHub(`teen9busy-cloud`)에서 신규 저장소(`valueplus`)를 생성한 후:
```bash
git remote add origin https://github.com/teen9busy-cloud/valueplus.git
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 또는 Vercel 연동
- **GitHub Pages**:
  - 저장소의 `Settings` ➔ `Pages` 메뉴 이동
  - `Branch`를 `main`, 폴더를 `/ (root)`로 지정 후 `Save`
  - 약 1분 후 `https://teen9busy-cloud.github.io/valueplus/`로 자동 무료 배포 완료
- **Vercel**:
  - `vercel.com`에서 `teen9busy-cloud/valueplus` 저장소를 Import하면 즉시 초고속 글로벌 CDN 배포 완료 (추후 단독 도메인 `valueplus.co.kr` 등 연결 용이)
