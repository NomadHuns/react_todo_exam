import {useRecoilState} from "recoil";
import {todoListState} from "./TodoAtom";
import {Todo} from "../../models/Todos";
import {useEffect, useState} from "react";
import {authGet, authPut} from "../../commons/Constants";
import {useNavigate} from "react-router-dom";

export const TodoProvider = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [todos, setTodos] = useRecoilState(todoListState);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
        const getTodosIfLoggedIn = async () => {
            if (token) {
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

    useEffect(() => {
        const saveTodosIfLoggedIn = async () => {
            if (isLogin) {
                await authPut("/api/v1/todos", JSON.stringify(todos), navigate)();
            } else {
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