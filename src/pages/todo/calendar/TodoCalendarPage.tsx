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

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

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

    return (
        <div style={{ padding: "24px" }}>
            <div style={styles.headerRow}>
                <Link to="/" style={styles.backLink}>←</Link>
                <h2 style={styles.title}>TODO 캘린더</h2>
            </div>

            <div style={styles.monthButton}>
                <button onClick={prevMonth}>◀</button>
                <span style={styles.monthText}>
                    {year}년 {month + 1}월
                </span>
                <button onClick={nextMonth}>▶</button>
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
    );
};

const styles: Record<string, React.CSSProperties> = {
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

