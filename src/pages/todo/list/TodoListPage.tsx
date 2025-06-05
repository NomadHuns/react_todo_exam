import React from "react";
import {Priority} from "../../../models/Todos";
import {TodoListProvider} from "./TodoListProvider";
import MySelectBox, {OptionItem} from "../../../components/MySelectBox";

const PRIORITY_OPTIONS: OptionItem[] = [{value: "high", label:"높음"}, {value: "medium", label:"중간"}, {value: "low", label:"낮음"}];

const PRIORITY_LABELS: Record<Priority, string> = {
    high: "🔴",
    medium: "🟡",
    low: "🔵",
};

const TodoListPage: React.FC = () => {
    const {
        input,
        setInput,
        priority,
        setPriority,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        toggleComplete,
        filteredTodos,
    } = TodoListProvider();

    return (
        <div style={styles.container}>
            <h2>📝 MyTodoApp</h2>

            <div style={styles.inputRow}>
                <input
                    type="text"
                    placeholder="할 일을 입력하세요..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                />
                <MySelectBox
                    value={priority}
                    onChange={(e) => setPriority(e as Priority)}
                    options={PRIORITY_OPTIONS} />
                <button onClick={addTodo} style={styles.button}>
                    + 추가
                </button>
            </div>

            <div style={styles.filterRow}>
                {["all", ...PRIORITY_OPTIONS.map(value => value.value)].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as Priority | "all")}
                        style={{
                            ...styles.filterBtn,
                            fontWeight: filter === f ? "bold" : "normal",
                        }}
                    >
                        {f === "all"
                            ? "전체"
                            : f === "high"
                                ? "높음"
                                : f === "medium"
                                    ? "중간"
                                    : "낮음"}
                    </button>
                ))}
            </div>

            <ul style={styles.todoList}>
                {filteredTodos.map((todo) => (
                    <li key={todo.id} style={styles.todoItem}>
            <span
                onClick={() => toggleComplete(todo.id)}
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.6 : 1,
                    cursor: "pointer",
                }}
            >
              {PRIORITY_LABELS[todo.priority]} {todo.text}
            </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={styles.delBtn}
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: 500,
        margin: "50px auto",
        padding: 20,
        background: "#f9fafb",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif",
    },
    inputRow: {
        display: "flex",
        gap: 8,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 14,
    },
    select: {
        padding: "8px 10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: 6,
        backgroundColor: "#fff",
        WebkitAppearance: "none" as const,
        appearance: "none" as const,
    },
    button: {
        padding: "8px 12px",
        backgroundColor: "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
    },
    filterRow: {
        marginBottom: 12,
        display: "flex",
        gap: 6,
    },
    filterBtn: {
        padding: "4px 10px",
        borderRadius: 6,
        background: "#e5e7eb",
        border: "none",
        cursor: "pointer",
    },
    todoList: {
        listStyle: "none",
        padding: 0,
    },
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

export default TodoListPage;
