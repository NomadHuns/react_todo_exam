# TODO 프로젝트

## 프로젝트 접속 방법
http://13.209.230.80
- 위 링크로 들어가 기능들을 사용할 수 있음

## 사용된 라이브러리
- React
- Recoil: 전역 상태 관리 라이브러리
- react-router-dom: 페이지 라우팅 라이브러리

## 특징
- 비회원 할일들은 LocalStorage로 저장되며 브라우저 종료시에도 삭제되지 않고 저장되어있음. 단, 기존 저장된 브라우저가 아닌 다른 브라우저 사용시 기존 데이터 존재하지 않음.
- 회원 할일들은 서버 데이터베이스에 저장됨.

## 화면 구현
- React.CSSProperties를 사용하여 css 적용
### 할일 목록 페이지
<img width="578" alt="스크린샷 2025-06-07 오후 5 05 34" src="https://github.com/user-attachments/assets/0305b985-1be8-4201-9b99-7551f0024245" />

## 기능
### 할일 생성 기능
<img width="1015" alt="스크린샷 2025-06-07 오후 1 34 10" src="https://github.com/user-attachments/assets/e5a49afa-683d-4d3e-9636-1e6be417aac6" />

- 생성된 새로운 할일은 우선순위에 따라 자동 정렬됨.
- 동일 우선순위 내에서는 생성된 일시의 역순으로 정렬됨.(최신 데이터가 상위 노출)
  
### 우선순위 필터링
<img width="1015" alt="스크린샷 2025-06-07 오후 1 34 10" src="https://github.com/user-attachments/assets/8e65da63-96ed-476b-bc88-ffb01bd58509" />

- 전체 필터링일 경우 우선 순위에 따라 자동 정렬되어 노출.
- 우선순위 / 태그명으로 필터링 가능.
- 특정 우선 순위 선택시 선택한 우선 순위 할일만 노출됨.
- 특정 우선 순위 선택시 새 할일 생성 우선순위 섹렉트 값도 선택한 값으로 변경됨.

### 할일 삭제 기능
![무제](https://github.com/user-attachments/assets/00ef6a38-230a-45e9-bbe6-2700ca358859)

- 특정 할일의 삭제 버튼 클릭 시 삭제 확인 모달 출력됨.
- 삭제 확인 모달의 '확인' 선택시 해당 할일 삭제됨.

### 할일 수정
<img width="1015" alt="스크린샷 2025-06-07 오후 1 34 10" src="https://github.com/user-attachments/assets/e5a49afa-683d-4d3e-9636-1e6be417aac6" />

- 특정 할일의 제목 클릭시 수정 기능으로 전환됨.
- 제목과 우선순위 및 기한 수정 가능.
- 새로운 태그 추가시 태그명을 입력하고 엔터/페이스바를 입력하여 추가 가능.
- 기존 태그 삭제시 태그 옆 x 버튼을 클릭하여 삭제 가능
- 해당 정보 수정시 바로 적용됨.
- 확인 버튼을 선택하여 수정 기능 종료.
- 수정 기능이 열린 상태에서 다른 할일 제목 클릭시 기존 수정 기능창은 자동 닫힘.

### 비회원 / 회원 할일 구분
<img width="1015" alt="스크린샷 2025-06-07 오후 1 34 10" src="https://github.com/user-attachments/assets/bcc7d0dd-c8d3-4e5a-8211-d3bd850dc192" />
<img width="1015" alt="스크린샷 2025-06-07 오후 1 34 10" src="https://github.com/user-attachments/assets/953d02a6-3b87-4aac-a61a-3b62de950299" />

- 회원 할일은 서버를 통하여 서버 데이터베이스에 저장됨.
- 비회원 할일은 브라우저의 로컬 스토리지를 이용하여 저장됨.
- 회원에서 할일을 생성/수정/삭제 후 로그아웃 할경우 브라우저의 로컬 스토리지의 할일들을 불러옴.
- 회원 / 비회원 할일은 서로 동기화되지 않음.

## API 문서
### 로그인 API
사용자 로그인 요청을 처리하고, 인증 토큰(access/refresh)을 발급합니다.

요청(Request)
```
POST /api/v1/auth/login

Headers {
  Content-Type: application/json
}

Body {
  "username": "tmember1",
  "password": "1234"
}
```

응답(Response)
```
{
  "success": true,
  "response": {
    "user": {
      "id": 2,
      "username": "tmember1",
      "authorities": [
        "MEMBER"
      ],
      "status": {
        "status": "ACTIVE",
        "text": "활성화"
      },
      "createdAt": "2025-06-08T15:11:18.665995",
      "updatedAt": "2025-06-08T15:11:18.665995"
    },
    "token": {
      "accessToken": "Bearer ...",
      "refreshToken": "Bearer ..."
    }
  },
  "error": null
}
```

- success:	요청 처리 결과 (성공 여부)
- user.id:	사용자 고유 ID
- user.username:	사용자 아이디
- user.authorities:	권한 목록 (MEMBER, ADMIN 등)
- user.status.status:	계정 상태 코드 (ACTIVE, BANNED 등)
- user.status.text:	계정 상태 설명
- token.accessToken:	Access Token (JWT 형식, Bearer 포함)
- token.refreshToken:	Refresh Token (JWT 형식, Bearer 포함)

### 회원 할일 목록 조회
인증된 사용자의 할 일(Todo) 목록을 조회합니다.

요청(Request)
```
GET /api/v1/todos

Headers {
  Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUx...
}
```

응답(Response)
```
{
  "success": true,
  "response": [
    {
      "id": 1749395618949,
      "creator": {
        "id": 2,
        "username": "tmember1",
        "authorities": ["MEMBER"],
        "status": {
          "status": "ACTIVE",
          "text": "활성화"
        },
        "createdAt": "2025-06-08T15:11:18.665995",
        "updatedAt": "2025-06-08T15:11:18.665995"
      },
      "text": "안녕하세요.",
      "completed": false,
      "priority": "medium",
      "expiredAt": "2025-06-11",
      "createdAt": "2025-06-08T16:07:16.511803",
      "tags": []
    }
  ],
  "error": null
}
```

- success:	요청 처리 결과
- response[].id:	할 일 항목 고유 ID
- response[].creator:	생성한 사용자 정보
- response[].text:	할 일 내용
- response[].completed:	완료 여부 (true / false)
- response[].priority:	우선순위 (low, medium, high)
- response[].expiredAt:	만료일 (yyyy-MM-dd)
- response[].createdAt:	생성일시
- response[].tags:	태그 목록 (문자열 배열)

## 회원 할일 목록 저장
인증된 사용자의 할 일(Todo) 목록을 저장합니다.

요청(Request)
```
PUT /api/v1/todos

Headers {
  Content-Type: application/json
  Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUx...
}

Body
[
  {
    "id": 1749395618949,
    "text": "안녕하세요.",
    "completed": false,
    "priority": "medium",
    "expiredAt": "2025-06-11",
    "createdAt": "2025-06-08T16:17:07.524062",
    "tags": []
  }
]
```

응답(Response)
```
{
  "success":true,
  "response":"저장 완료",
  "error":null
}
```

## 작업중 발생 이슈
### Recoil 적용중 에러 발생
- 에러 메시지: Right side of assignment cannot be destructured...(생략)
- 문제 발생 이유: Recoil 라이브러리가 React 19 버전을 호환하는 버전이 출시되지 않음.
```bash
    gimtaehun@gimtaehun-ui-MacBookPro react_todo_exam % npm ls recoil react react-dom            
    react_todo_exam@0.1.0 /Users/gimtaehun/development/Workspace/react_todo_exam
    ├─┬ @testing-library/react@16.3.0
    │ ├── react-dom@18.3.1 deduped
    │ └── react@18.3.1 deduped
    ├─┬ react-dom@18.3.1
    │ └── react@18.3.1 deduped
    ├─┬ react-scripts@5.0.1
    │ └── react@18.3.1 deduped
    ├── react@18.3.1
    └─┬ recoil@0.7.7
      └── react@18.3.1 deduped
```
- 해결 방법: 리액트 버전 다운그래이드 후 재설치
```bash
    npm install react@18.2.0 react-dom@18.2.0
    rm -rf node_modules package-lock.json
    npm install
```

### 태그 생성시 한글자 남음 문제
- 문제 발생 이유: 한글 조합 입력(IME: Input Method Editor)을 처리할 때 발생하는 문제
- 해결 방법
```ts
    onKeyDown={(e) => {
    if ((e.key === "Enter" || e.key === " ") && tagValue.trim().length > 1) {
        e.preventDefault();
        saveTag(tagValue.trim());
        setTimeout(() => setTagValue(""), 10); // 해당 부분 짧은 딜레이로 처리
    }
}}
```
