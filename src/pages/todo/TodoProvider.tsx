import {useRecoilState} from "recoil";
import {todoListState} from "./TodoAtom";
import {Todo} from "../../models/Todos";
import {useEffect, useRef, useState} from "react";
import {authGet, authPut} from "../../commons/Constants";
import {useNavigate} from "react-router-dom";

export const TodoProvider = () => {
    const [todos, setTodos] = useRecoilState(todoListState);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const isLoggedIn = !!token;
        const getTodosIfLoggedIn = async () => {
            if (isLoggedIn) {
                const raw = await authGet("/api/v1/todos", navigate)();
                const todos: Todo[] = raw.response.map((item: any) => ({
                    id: item.id,
                    text: item.text,
                    completed: item.completed,
                    priority: item.priority,
                    expiredAt: item.expiredAt || undefined,
                    createdAt: item.createdAt,
                    tags: item.tags || [],
                }));

                setTodos(todos);
            }
        };

        getTodosIfLoggedIn();
    }, []);

    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            return; // 첫 렌더링 시점에는 실행하지 않음
        }

        const token = localStorage.getItem("accessToken");
        const isLoggedIn = !!token;

        const saveTodosIfLoggedIn = async () => {
            if (isLoggedIn) {
                console.log("로그인함");
                await authPut("/api/v1/todos", JSON.stringify(todos), navigate)();
            } else {
                console.log("로그인안함");
                localStorage.setItem("todos", JSON.stringify(todos));
            }
        };

        saveTodosIfLoggedIn();
    }, [todos]);

    /*
        할일 요소 수정 함수
     */
    const putTodo = (updatedTodo: Todo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    };

    return {
        todos,
        putTodo,
    };
}