import {atom} from "recoil";
import {Priority, Todo} from "../../../models/Todos";

export const todoListState = atom<Todo[]>({
    key: "todoListState",
    default: (() => {
        const stored = localStorage.getItem("todos");
        console.log(stored);
        try {
            const parsed = stored ? JSON.parse(stored) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })(),
});

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
export const todoFilterState = atom<Priority | "all" | "completed" | "incomplete">({
    key: "todoFilterState",
    default: "all",
});

export const selectedTagState = atom<string>({
    key: "selectedTagState",
    default: "",
});