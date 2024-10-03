# Contributor guide

## Prerequisites

- Node.js v18.20.4+ [^1]

### Run

```
$ cd web
$ npm i
$ npm run dev
```

### Folder structure[^2]

`/api` : 백엔드와의 통신을 담당하는 코드  
`/assets` : 사용되는 에셋 파일  
`/components` : 공통으로 쓰이는 컴포넌트  
`/config` : 애플리케이션의 설정 파일들  
`/contents` : 문서나 파일  
`/model` : 데이터 구조를 정의하는 인터페이스나 타입  
`/hooks` : 컴포넌트에서 사용되는 hook 파일들  
`/i18n` : 다국어 지원을 위한 번역 파일들  
`/layout`: 전체 애플리케이션의 구조를 정의하는 컴포넌트들  
`/libs` : 공통으로 사용되는 라이브러리  
`/store` : 상태 관리 로직과 관련 파일들  
`/service` : 비즈니스 로직을 처리하는 서비스 레이어  
`/utils` : 공통으로 사용되는 유틸리티 함수들  
`/pages` : 실제 라우팅되는 페이지 컴포넌트들을 포함  
`/routes` : 라우팅 설정과 관련된 코드  
`/server` : 서버관련 파일들  
`/styles` : 전역 스타일이나 스타일 관련 설정  
`/types` : 전역으로 사용되는 타입 정의  

## Reference

- shadcn/ui v2.1.0+ [^3]
- lucide-react v0.447.0+ [^4]


[^1]: Refer [`.nvmrc`](web/.nvmrc).  
[^2]: Refer [`프론트엔드 개발자 관점으로 바라보는 관심사의 분리와 좋은 폴더 구조 (feat. FSD)`](https://velog.io/@teo/separation-of-concerns-of-frontend).
[^3]: Refer [`shadcn/ui docs`](https://ui.shadcn.com/docs).
[^4]: Refer [`lucide-react icons`](https://lucide.dev/icons/).