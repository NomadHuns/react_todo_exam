import React, {useState} from "react";
import {Priority, Todo} from "../../../../models/Todos";
import {PRIORITY_LABELS} from "../../../../commons/Constants";

interface TodoCalenderDayCellProps {
    inToday: boolean;
    inCurrentMonth: boolean;
    date: number;
    year: number;
    month: number;
    todos: Todo[];
    onDropTodo: (todoId: number, newDate: string) => void;
}

const TodoCalenderDayCell: React.FC<TodoCalenderDayCellProps> = ({inToday, inCurrentMonth, date, year, month, todos, onDropTodo}) => {
    const [showModal, setShowModal] = useState(false);

    if (!inCurrentMonth || date < 1) {
        return <div style={styles.emptyCell} />;
    }

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    const dayTodos = todos.filter(todo => todo.expiredAt === dateString)
        .sort((a, b) => {
            const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    const visibleTodos = dayTodos.slice(0, 3)
        .sort((a, b) => {
            const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    const hiddenCount = dayTodos.length - visibleTodos.length;

    return (
        <>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const todoId = parseInt(e.dataTransfer.getData("todoId"), 10);
                    if (!isNaN(todoId)) {
                        onDropTodo(todoId, dateString);
                    }
                }}
                style={{
                    ...styles.cell,
                    ...(inToday ? styles.todayCell : {})
                }}
            >
                <div style={{
                    ...styles.dateLabel,
                    ...(inToday ? styles.todayDateLabel : {})
                }}>
                    {date}
                </div>

                {visibleTodos.map(todo => (
                    <div
                        key={todo.id}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("todoId", todo.id.toString());
                        }}
                        style={{
                            ...styles.todoItem,
                            ...(todo.completed ? styles.completedTodo : {})
                        }}
                    >
                        {PRIORITY_LABELS[todo.priority]} {todo.text}
                    </div>
                ))}

                {hiddenCount > 0 && (
                    <div
                        onClick={() => setShowModal(true)}
                        style={styles.moreLink}
                    >
                        +{hiddenCount}개 더보기
                    </div>
                )}
            </div>

            {showModal && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <h4 style={{ marginTop: 0 }}>{dateString}</h4>
                        <ul style={{ paddingLeft: "1em" }}>
                            {dayTodos.map(todo => (
                                <li key={todo.id} style={{
                                    fontSize: "13px",
                                    color: todo.completed ? "#9ca3af" : "#111",
                                    textDecoration: todo.completed ? "line-through" : "none"
                                }}>
                                    {PRIORITY_LABELS[todo.priority]} {todo.text}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowModal(false)}
                            style={styles.closeButton}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    emptyCell: {
        height: "90px",
        backgroundColor: "#f5f5f5"
    },
    cell: {
        height: "90px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "4px",
        backgroundColor: "#fafafa",
        fontSize: "12px",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative"
    },
    todayCell: {
        backgroundColor: "#e0f2fe"
    },
    dateLabel: {
        fontWeight: "bold",
        color: "#111",
        marginBottom: "4px"
    },
    todayDateLabel: {
        color: "#0284c7"
    },
    todoItem: {
        fontSize: "11px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#111",
        cursor: "grab"
    },
    completedTodo: {
        color: "#9ca3af",
        textDecoration: "line-through"
    },
    moreLink: {
        fontSize: "11px",
        color: "#6b7280",
        marginTop: "2px",
        cursor: "pointer",
        textDecoration: "underline"
    },
    modalBackdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
    },
    closeButton: {
        marginTop: "12px",
        padding: "6px 12px",
        backgroundColor: "#3b82f6",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    }
};

export default TodoCalenderDayCell;