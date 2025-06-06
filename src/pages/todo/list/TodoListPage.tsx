import React, {useState} from "react";
import {Priority} from "../../../models/Todos";
import {TodoListProvider} from "./TodoListProvider";
import MySelectBox, {OptionItem} from "../../../components/MySelectBox";
import MyButton from "../../../components/MyButton";
import MyTextInput from "../../../components/MyTextInput";
import TodoListElement from "./components/TodoListElement";

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
        putTodo,
        deleteTodo,
        toggleComplete,
        filteredTodos,
    } = TodoListProvider();

    const [openedId, setOpenedId] = useState<number | null>(null);

    return (
        <div style={styles.container}>
            <h2>TODO Exam</h2>

            <div style={styles.inputRow}>
                <MyTextInput value={input} onChange={(e) => setInput(e)}
                             placeholder={"할 일을 입력하세요."}
                />
                <MySelectBox
                    value={priority}
                    onChange={(e) => setPriority(e as Priority)}
                    options={PRIORITY_OPTIONS} />
                <MyButton key={"add"} onClick={addTodo} text={"+ 추가"} />
            </div>

            <div style={styles.filterRow}>
                {["all", ...PRIORITY_OPTIONS.map(value => value.value)].map((f) => (
                    <MyButton key={f}
                              onClick={() => {
                                  setFilter(f as Priority | "all");
                                  if (f !== "all") {
                                      setPriority(f as Priority);
                                  }
                                  setOpenedId(null);
                              }}
                              text={f === "all"
                                    ? "전체"
                                    : f === "high"
                                        ? "높음"
                                        : f === "medium"
                                            ? "중간"
                                            : "낮음"}
                              style={{
                                  ...styles.filterBtn,
                                  fontWeight: filter === f ? "bold" : "normal",
                              }}
                    />
                ))}
            </div>

            <ul style={styles.todoList}>
                {filteredTodos.map((todo) => (
                    <TodoListElement
                        todo={todo}
                        deleteTodo={() => deleteTodo(todo.id)}
                        toggleComplete={() => toggleComplete(todo.id)}
                        changeText={(e) => putTodo({text: e, id: todo.id, priority: todo.priority, completed: todo.completed})}
                        setPriority={(e) => putTodo({text: todo.text, id: todo.id, priority: e as Priority, completed: todo.completed})}
                        openedId={openedId}
                        setOpenedId={setOpenedId}
                    />
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
};

export default TodoListPage;
