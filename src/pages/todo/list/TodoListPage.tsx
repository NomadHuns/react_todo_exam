import React, {useState} from "react";
import {Priority} from "../../../models/Todos";
import {TodoListProvider} from "./TodoListProvider";
import MySelectBox, {OptionItem} from "../../../components/MySelectBox";
import MyButton from "../../../components/MyButton";
import MyTextInput from "../../../components/MyTextInput";
import TodoListElement from "./components/TodoListElement";
import MyTagButton from "../../../components/MyTagButton";
import {Link} from "react-router-dom";
import {TodoProvider} from "../TodoProvider";

const PRIORITY_OPTIONS: OptionItem[] = [{value: "high", label:"높음"}, {value: "medium", label:"중간"}, {value: "low", label:"낮음"}];

const TodoListPage: React.FC = () => {
    const {
        input,
        setInput,
        priority,
        setPriority,
        filter,
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
    } = TodoListProvider();

    const {
        todos,
        putTodo
    } = TodoProvider();

    const [openedId, setOpenedId] = useState<number | null>(null);

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <h2 style={{ margin: 0 }}>TODO Exam</h2>
                <Link to="/calendar" style={styles.calendarLink}>캘린더 &gt;</Link>
            </div>

            <div style={styles.inputRow}>
                <MyTextInput value={input} onChange={(e) => setInput(e)}
                             placeholder={"할 일을 입력하세요."}
                />
                <MySelectBox
                    value={priority}
                    onChange={(e) => setPriority(e as Priority)}
                    options={PRIORITY_OPTIONS} />
                <MyButton onClick={addTodo} text={"+ 추가"} />
            </div>

            <div style={styles.filterRow}>
                {["all", "completed", "incomplete"].map((f) => (
                    <MyButton
                        key={"c" + f}
                        onClick={() => {
                            setCompleted(f);
                            if (f !== "all" && f !== "completed" && f !== "incomplete") {
                                setCompleted(f);
                            }
                            setOpenedId(null);
                        }}
                        text={
                            f === "all"
                                ? "전체"
                                : f === "completed"
                                    ? "완료됨"
                                    : "미완료"
                        }
                        style={{
                            ...styles.filterBtn,
                            fontWeight: completed === f ? "bold" : "normal",
                        }}
                    />
                ))}
            </div>

            <div style={styles.filterRow}>
                {["all", ...PRIORITY_OPTIONS.map(value => value.value)].map((f) => (
                    <MyButton
                        key={f}
                        onClick={() => {
                            setFilter(f as Priority | "all");
                            if (f !== "all" && f !== "completed" && f !== "incomplete") {
                                setPriority(f as Priority);
                            }
                            setOpenedId(null);
                        }}
                        text={
                            f === "all"
                                ? "전체"
                                : f === "high"
                                    ? "높음"
                                    : f === "medium"
                                        ? "중간"
                                        : "낮음"
                        }
                        style={{
                            ...styles.filterBtn,
                            fontWeight: filter === f ? "bold" : "normal",
                        }}
                    />
                ))}
            </div>
            <div style={styles.filterRow}>
                <MyTagButton
                    key={"전체"}
                    tag={"전체"}
                    selected={selectedTag === ""}
                    onClick={() => {
                        setSelectedTag("");
                        setOpenedId(null);
                    }}
                />
                {uniqueTags.map((tag) => (
                    <MyTagButton
                        key={tag}
                        tag={tag}
                        selected={selectedTag === tag}
                        onClick={() => {
                            setSelectedTag(tag);
                            setOpenedId(null);
                        }}
                    />
                ))}
            </div>

            <ul style={styles.todoList}>
                {filteredTodos.map((todo) => (
                    <TodoListElement
                        key={todo.id}
                        todo={todo}
                        deleteTodo={() => deleteTodo(todo.id)}
                        toggleComplete={() => toggleComplete(todo.id)}
                        changeText={(e) => putTodo({text: e, id: todo.id, priority: todo.priority,
                            completed: todo.completed, expiredAt: todo.expiredAt, createdAt: todo.createdAt, tags: todo.tags})}
                        setPriority={(e) => putTodo({text: todo.text, id: todo.id,
                            priority: e as Priority, completed: todo.completed, expiredAt: todo.expiredAt,
                            createdAt: todo.createdAt, tags: todo.tags})}
                        openedId={openedId}
                        setOpenedId={setOpenedId}
                        setExpiredAt={(e) => putTodo({text: todo.text, id: todo.id,
                            priority: todo.priority, completed: todo.completed, expiredAt: e, createdAt: todo.createdAt,
                            tags: todo.tags})}
                        saveTag={(e) => saveTag(todo.id, e)}
                        deleteTag={(e) => deleteTag(todo.id, e)}
                    />
                ))}
            </ul>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    calendarLink: {
        fontSize: "14px",
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
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
    filterRow: {
        marginBottom: 12,
        display: "flex",
        gap: 7,
        flexWrap: "wrap",
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
};

export default TodoListPage;
