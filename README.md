# TODO 프로젝트

## 사용된 라이브러리
- React
- Recoil: 전역 상태 관리 라이브러리

## 화면 구현
- React.CSSProperties를 사용하여 css 적용

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