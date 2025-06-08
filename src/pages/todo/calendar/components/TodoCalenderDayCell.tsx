import React from "react";
import {Todo} from "../../../../models/Todos";

interface TodoCalenderDayCellProps {
    inToday: boolean;
    inCurrentMonth: boolean;
    date: number;
    year: number;
    month: number;
    todos: Todo[];
}

const TodoCalenderDayCell: React.FC<TodoCalenderDayCellProps> = ({ inToday, inCurrentMonth, date, year, month, todos }) => {
    if (!inCurrentMonth || date < 1) {
        return <div style={{ height: "80px", backgroundColor: "#f5f5f5" }} />;
    }
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    const dayTodos = todos.filter(todo => todo.expiredAt === dateString);

    return (
        <div
            style={{
                height: "80px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "4px",
                backgroundColor: inToday ? "#e0f2fe" : "#fafafa",
                fontSize: "12px",
                boxSizing: "border-box",
                overflow: "hidden"
            }}
        >
            <div style={{
                fontWeight: "bold",
                color: inToday ? "#0284c7" : "#111",
                marginBottom: "4px"
            }}>
                {date}
            </div>

            {dayTodos.map(todo => (
                <div
                    key={todo.id}
                    style={{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: todo.completed ? "#9ca3af" : "#111"
                    }}
                >
                    • {todo.text}
                </div>
            ))}
        </div>
    );
};

export default TodoCalenderDayCell;