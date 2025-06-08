import {atom} from "recoil";
import {Priority} from "../../../models/Todos";

// 새 투두 입력값 상태
export const todoInputState = atom<string>({
    key: "todoInputState",
    default: "",
});

// 새 투두 우선순위 상태
export const todoPriorityState = atom<Priority>({
    key: "todoPriorityState",
    default: "medium",
});

// 필터 상태 (우선순위별 보기용)
export const todoFilterState = atom<Priority | "all">({
    key: "todoFilterState",
    default: "all",
});

// 선택된 완료 상태
export const todoCompleteState = atom<string>({
    key: "todoCompleteState",
    default: "all",
});

// 선택된 태그 필터
export const selectedTagState = atom<string>({
    key: "selectedTagState",
    default: "",
});