import {Priority, Todo} from "../../../../models/Todos";
import React from "react";
import MyButton from "../../../../components/MyButton";

interface TodoListElementProp {
    todo: Todo;
    toggleComplete: () => void;
    deleteTodo: () => void;
}

const PRIORITY_LABELS: Record<Priority, string> = {
    high: "🔴",
    medium: "🟡",
    low: "🔵",
};

const TodoListElement: React.FC<TodoListElementProp> = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li style={styles.todoItem}>
            <div style={styles.leftWrap}>
                <input type="checkbox" onClick={toggleComplete} checked={todo.completed} />
                <span
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        opacity: todo.completed ? 0.6 : 1,
                        cursor: "pointer",
                        marginLeft: 8,
                    }}
                >
                    {PRIORITY_LABELS[todo.priority]} {todo.text}
                </span>
            </div>
            <MyButton key={"delete"} onClick={deleteTodo} style={styles.delBtn} text="삭제" />
        </li>
    );
};

const styles: Record<string, React.CSSProperties> = {
    todoItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: "1px solid #eee",
    },
    delBtn: {
        background: "none",
        border: "none",
        color: "#ef4444",
        cursor: "pointer",
    },
};

export default TodoListElement;