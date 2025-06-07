# TODO 프로젝트

## 사용된 라이브러리
- React
- Recoil: 전역 상태 관리 라이브러리

## 특징
- 모든 할일들은 LocalStorage로 저장되며 브라우저 종료시에도 삭제되지 않고 저장되어있음. 단, 기존 저장된 브라우저가 아닌 다른 브라우저 사용시 기존 데이터 존재하지 않음.

## 화면 구현
- React.CSSProperties를 사용하여 css 적용
### 할일 목록 페이지
<img width="593" alt="image" src="https://github.com/user-attachments/assets/37ca0a6f-d2dc-4808-9a40-459fa72efe0b" />

## 기능
### 할일 생성 기능
<img width="578" alt="스크린샷 2025-06-07 오후 1 25 46" src="https://github.com/user-attachments/assets/490114c4-c7a7-4d5e-b08b-820ef11cf953" />
<img width="1015" alt="스크린샷 2025-06-07 오후 1 34 10" src="https://github.com/user-attachments/assets/3b8430ab-0891-470f-9f34-eb5ee52300ae" />

- 생성된 새로운 할일은 우선순위에 따라 자동 정렬됨.
- 동일 우선순위 내에서는 생성된 일시의 역순으로 정렬됨.(최신 데이터가 상위 노출)
  
### 우선순위 필터링
<img width="994" alt="스크린샷 2025-06-07 오후 1 44 01" src="https://github.com/user-attachments/assets/4adae1d3-40a1-43d2-bd2a-6703f3c32bd9" />

- 전체 필터링일 경우 우선 순위에 따라 자동 정렬되어 노출.
- 특정 우선 순위 선택시 선택한 우선 순위 할일만 노출됨.
- 특정 우선 순위 선택시 새 할일 생성 우선순위 섹렉트 값도 선택한 값으로 변경됨.

### 할일 삭제 기능
![무제](https://github.com/user-attachments/assets/00ef6a38-230a-45e9-bbe6-2700ca358859)

- 특정 할일의 삭제 버튼 클릭 시 삭제 확인 모달 출력됨.
- 삭제 확인 모달의 '확인' 선택시 해당 할일 삭제됨.

### 할일 수정
![무제-2](https://github.com/user-attachments/assets/432a4a6c-8ce6-4b0c-922b-3814ab7820a9)

- 특정 할일의 제목 클릭시 수정 기능으로 전환됨.
- 제목과 우선순위 수정 가능.
- 해당 정보 수정시 바로 적용됨.
- 확인 버튼을 선택하여 수정 기능 종료.
- 수정 기능이 열린 상태에서 다른 할일 제목 클릭시 기존 수정 기능창은 자동 닫힘.
- 우선 순위 필터 버튼 클릭시에도 수정 기능창 닫힘.

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