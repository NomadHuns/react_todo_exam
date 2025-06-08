import {atom} from "recoil";
import {Todo} from "../../models/Todos";

export const todoListState = atom<Todo[]>({
    key: "todoListState",
    default: (() => {
        const stored = localStorage.getItem("todos");
        try {
            const parsed = stored ? JSON.parse(stored) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })(),
});