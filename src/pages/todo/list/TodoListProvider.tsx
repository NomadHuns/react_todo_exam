// hooks/useTodos.ts
import {Priority, Todo} from "../../../models/Todos";
import {getKoreanISOString} from "../../../utils/FormatUtils";
import {useRecoilState} from "recoil";
import {todoFilterState, todoInputState, todoListState, todoPriorityState} from "./TodoListAtom";
import React, {useEffect} from "react";

export const TodoListProvider = () => {
    const [todos, setTodos] = useRecoilState(todoListState);
    const [input, setInput] = useRecoilState(todoInputState);
    const [priority, setPriority] = useRecoilState(todoPriorityState);
    const [filter, setFilter] = useRecoilState(todoFilterState);

    // todos 상태 변경시 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    /*
        투두 추가 함수
    */
    const addTodo = () => {
        // 인풋 값이 공백이거나 없을 경우 함수 종료
        if (!input.trim()) return;

        // 투두 인터페이스 객체를 토대로 새로운 객체 인스턴스
        const newTodo: Todo = {
            id: Date.now(),
            text: input,
            completed: false,
            priority,
            createdAt: getKoreanISOString(),
        };
        // 기존 투두 리스트의 앞에 새로 인스턴스된 객체를 깊은 복사 형태로 생성하여 상태 변경
        setTodos([newTodo, ...todos]);
        // 인풋값 상태 변경
        setInput("");
    };

    /*
        투두 요소 수정 함수
     */
    const putTodo = (updatedTodo: Todo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    };

    /*
        투두 요소 완료 토글 함수
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
        투두 요소 삭제
    */
    const deleteTodo = (id: number) => {
        // 선택된 id 의 투두를 배열에서 삭재 후 상태 변경
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    /*
        투두 필터링 기능
    */
    const filteredTodos = todos
        .filter((todo) => filter === "all" || todo.priority === filter)
        .sort((a, b) => {
            const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
            return order[a.priority] - order[b.priority];
        });

    return {
        input,
        priority,
        filter,
        setInput,
        setPriority,
        setFilter,
        addTodo,
        putTodo,
        toggleComplete,
        deleteTodo,
        filteredTodos,
    };
};
