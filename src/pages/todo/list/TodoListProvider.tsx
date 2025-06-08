// hooks/useTodos.ts
import {Priority, Todo} from "../../../models/Todos";
import {getKoreanISOString} from "../../../utils/FormatUtils";
import {useRecoilState} from "recoil";
import {
    selectedTagState,
    todoCompleteState,
    todoFilterState,
    todoInputState,
    todoPriorityState
} from "./TodoListAtom";
import {useEffect} from "react";
import {todoListState} from "../TodoAtom";

export const TodoListProvider = () => {
    const [todos, setTodos] = useRecoilState(todoListState);
    const [input, setInput] = useRecoilState(todoInputState);
    const [priority, setPriority] = useRecoilState(todoPriorityState);
    const [filter, setFilter] = useRecoilState(todoFilterState);
    const [completed, setCompleted] = useRecoilState(todoCompleteState);
    const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);

    // todos 상태 변경시 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    /*
        할일 추가 함수
    */
    const addTodo = () => {
        // 인풋 값이 공백이거나 없을 경우 함수 종료
        if (!input.trim()) return;

        // 투두 인터페이스 객체를 토대로 새로운 객체 인스턴스
        const newTodo: Todo = {
            id: Date.now(),
            text: input,
            completed: completed === "completed",
            priority: priority,
            expiredAt: undefined,
            createdAt: getKoreanISOString(),
            tags: selectedTag !== "" ? [selectedTag] : []
        };
        // 기존 투두 리스트의 앞에 새로 인스턴스된 객체를 깊은 복사 형태로 생성하여 상태 변경
        setTodos([newTodo, ...todos]);
        // 인풋값 상태 변경
        setInput("");
    };

    /*
        할일 요소 완료 토글 함수
    */
    const toggleComplete = (id: number) => {
        // 선택된 id 의 투두의 completed 필드값을 수정하여 상태 변경
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    /*
        할일 요소 삭제
    */
    const deleteTodo = (id: number) => {
        // 선택된 id 의 투두를 배열에서 삭재 후 상태 변경
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    /*
        할일 필터링 기능
    */
    const filteredTodos = todos
        .filter((todo) => {
            if (completed === "all") return true;
            if (completed === "completed") return todo.completed;
            if (completed === "incomplete") return !todo.completed;
        })
        .filter((todo) => {
            if (filter === "all") return true;
            return todo.priority === filter;
        })
        .filter((todo) => {
            // 2차 필터: 선택된 태그가 있다면 해당 태그를 포함하는 todo만
            if (!selectedTag) return true;
            return todo.tags?.includes(selectedTag);
        })
        .sort((a, b) => {
            const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) return priorityDiff;

            const dateA = a.expiredAt ? new Date(a.expiredAt).getTime() : Infinity;
            const dateB = b.expiredAt ? new Date(b.expiredAt).getTime() : Infinity;

            return dateA - dateB;
        });

    const saveTag = (id: number, tag: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? {...todo,
                        tags: todo.tags
                            ? todo.tags.includes(tag)
                                ? todo.tags
                                : [...todo.tags, tag]
                            : [tag]} : todo
            )
        );
    };

    const deleteTag = (id: number, tag: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? {
                        ...todo,
                        tags: todo.tags?.filter((t) => t !== tag)} : todo
            )
        );
    };

    const uniqueTags = Array.from(
        new Set(
            todos.flatMap((todo) => todo.tags ?? []) // null-safe 평탄화 후 Set으로 중복 제거
        )
    );

    return {
        input,
        priority,
        filter,
        setInput,
        setPriority,
        setFilter,
        addTodo,
        toggleComplete,
        deleteTodo,
        filteredTodos,
        saveTag,
        deleteTag,
        uniqueTags,
        selectedTag,
        setSelectedTag,
        completed,
        setCompleted
    };
};
