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
                <div style={styles.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id={`checkbox-${todo.id}`}
                        onClick={toggleComplete}
                        checked={todo.completed}
                        style={styles.checkbox}
                    />
                    <label htmlFor={`checkbox-${todo.id}`} style={styles.customCheckbox}>
                        {todo.completed && <div style={styles.checkMark} />}
                    </label>
                </div>
                <span style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.6 : 1,
                    cursor: "pointer",
                    marginLeft: 8,
                }}>
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
        alignItems: "center", // 중요
        padding: "6px 0",
        borderBottom: "1px solid #eee",
    },
    leftWrap: {
        display: "flex",
        alignItems: "center", // 체크박스와 텍스트 수직 정렬 맞춤
    },
    checkboxWrapper: {
        position: "relative",
        width: 20,
        height: 20,
        marginRight: 8,
    },
    checkbox: {
        position: "absolute",
        opacity: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        cursor: "pointer",
        zIndex: 2,
    },
    customCheckbox: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        border: "2px solid #4f46e5",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        cursor: "pointer",
    },
    checkMark: {
        width: 10,
        height: 10,
        backgroundColor: "#4f46e5",
        borderRadius: 2,
    },
    todoText: {
        textDecoration: "none",
        opacity: 1,
        cursor: "pointer",
        fontSize: 14,
    },
    delBtn: {
        background: "none",
        border: "none",
        color: "#ef4444",
        cursor: "pointer",
    },
};

export default TodoListElement;