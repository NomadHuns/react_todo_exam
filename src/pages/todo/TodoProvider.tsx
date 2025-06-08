import {useRecoilState} from "recoil";
import {todoListState} from "./TodoAtom";
import {Todo} from "../../models/Todos";

export const TodoProvider = () => {
    const [todos, setTodos] = useRecoilState(todoListState);

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