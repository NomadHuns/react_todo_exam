import React, {useEffect, useState} from "react";
import {Priority} from "../../../models/Todos";
import {TodoListProvider} from "./TodoListProvider";
import MySelectBox from "../../../components/MySelectBox";
import MyButton from "../../../components/MyButton";
import MyTextInput from "../../../components/MyTextInput";
import TodoListElement from "./components/TodoListElement";
import MyTagButton from "../../../components/MyTagButton";
import {Link} from "react-router-dom";
import {TodoProvider} from "../TodoProvider";
import {PRIORITY_OPTIONS} from "../../../commons/Constants";

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
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <div style={styles.titleRow}>
                    <h2 style={{ margin: 0 }}>TODO List</h2>
                    {!isLogin && (
                        <Link to="/login" style={styles.calendarLink}>로그인 &gt;</Link>
                    )}
                    {isLogin && (
                        <Link
                            to="/"
                            onClick={() => {
                                localStorage.removeItem("accessToken");
                                localStorage.removeItem("refreshToken");
                                setIsLogin(false);
                            }}
                            style={styles.calendarLink}
                        >
                            로그아웃 &gt;
                        </Link>
                    )}
                </div>

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
                <MyButton onClick={() => {
                    let newTodo = addTodo();
                    if (typeof newTodo == "undefined") setOpenedId(null);
                    if (typeof newTodo != "undefined") setOpenedId(newTodo.id);
                }} text={"+ 추가"} />
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
                            if (f !== "all") {
                                setPriority(f as Priority);
                            } else {
                                setPriority("medium");
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
                        changeText={(e) => putTodo({...todo, text: e})}
                        setPriority={(e) => putTodo({...todo, priority: e as Priority})}
                        openedId={openedId}
                        setOpenedId={setOpenedId}
                        setExpiredAt={(e) => putTodo({...todo, expiredAt: e})}
                        saveTag={(e) => saveTag(todo.id, e)}
                        deleteTag={(e) => deleteTag(todo.id, e)}
                    />
                ))}
            </ul>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    titleRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
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
