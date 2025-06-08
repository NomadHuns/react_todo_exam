import React, {useState} from "react";
import TodoCalenderDayCell from "./components/TodoCalenderDayCell";
import {Link} from "react-router-dom";
import {TodoProvider} from "../TodoProvider";

const CalendarPage: React.FC = () => {
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const {
        todos,
        putTodo
    } = TodoProvider();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const rawFirstDay = new Date(year, month, 1).getDay();
    const firstDayOfMonth = (rawFirstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarCells = [];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const today = new Date();
    const isToday = (dateNum: number) => {
        return (
            dateNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    for (let i = 0; i < totalCells; i++) {
        const date = i - firstDayOfMonth + 1;
        const inCurrentMonth = date > 0 && date <= daysInMonth;
        const inToday = inCurrentMonth && isToday(date);

        calendarCells.push(
            <TodoCalenderDayCell
                key={"i"+i}
                date={date}
                inToday={inToday}
                inCurrentMonth={inCurrentMonth}
                todos={todos}
                year={year}
                month={month}
                onDropTodo={(todoId, newDate) => {
                    const target = todos.find(todo => todo.id === todoId);
                    if (!target) return;
                    putTodo({
                        ...target,
                        expiredAt: newDate,
                    });
                }}
            />
        );
    }

    const unscheduledTodos = todos.filter(todo => !todo.completed).filter(todo => !todo.expiredAt);

    return (
        <>
            <style>{`
                .calendar-container {
                  display: flex;
                  flex-direction: row;
                  gap: 24px;
                  padding: 24px;
                }
            
                @media (max-width: 868px) {
                  .calendar-container {
                    flex-direction: column;
                  }
                  .unscheduled-dropzone {
                    width: 100% !important;
                    margin-left: 0 !important;
                    box-sizing: border-box;
                  }
                }
              `}
            </style>
            <div style={styles.container} className="calendar-container">
                <div style={styles.leftContent}>
                    <div style={styles.headerRow}>
                        <Link to="/" style={styles.backLink}>←</Link>
                        <h2 style={styles.title}>TODO Calendar</h2>
                    </div>

                    <div style={styles.monthButton}>
                        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀</button>
                        <span style={styles.monthText}>{year}년 {month + 1}월</span>
                        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>▶</button>
                    </div>

                    <div style={styles.daysOfWeek}>
                        {daysOfWeek.map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div style={styles.calendarCells}>
                        {calendarCells}
                    </div>
                </div>

                <div
                    className="unscheduled-dropzone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const todoId = parseInt(e.dataTransfer.getData("todoId"), 10);
                        if (!isNaN(todoId)) {
                            const target = todos.find(todo => todo.id === todoId);
                            if (!target) return;
                            putTodo({ ...target, expiredAt: undefined });
                        }
                    }}
                    style={{
                        width: "300px",
                        padding: "16px",
                        border: "2px dashed #bbb",
                        borderRadius: "8px",
                        backgroundColor: "#f9fafb",
                        marginLeft: "24px",
                        height: "calc(100% - 48px)",
                        overflowY: "auto"
                    }}
                >
                    <h3 style={{ marginTop: 0, marginBottom: "12px" }}>날짜 미지정</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {unscheduledTodos.map(todo => (
                            <li
                                key={todo.id}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("todoId", todo.id.toString());
                                }}
                                style={{
                                    marginBottom: "8px",
                                    fontSize: "14px",
                                    color: todo.completed ? "#9ca3af" : "#111",
                                    textDecoration: todo.completed ? "line-through" : "none",
                                    cursor: "grab",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    padding: "6px 8px"
                                }}
                            >
                                • {todo.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        gap: "24px",
        padding: "24px"
    },
    leftContent: {
        flex: "1",
        minWidth: "0"
    },
    rightSidebar: {
        width: "240px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#fafafa",
        fontSize: "14px",
        overflowY: "auto",
        maxHeight: "calc(100vh - 48px)"
    },
    headerRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "12px",
        marginBottom: "16px",
    },
    backLink: {
        fontSize: "20px",
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
    title: {
        fontSize: "20px",
        margin: 0,
    },
    monthButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "16px",
        gap: "16px"
    },
    monthText: {
        fontSize: "18px", fontWeight: "bold"
    },
    daysOfWeek: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "8px"
    },
    calendarCells: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px"
    },
};

export default CalendarPage;

