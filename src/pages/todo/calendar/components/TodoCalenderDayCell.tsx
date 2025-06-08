import React from "react";
import {Todo} from "../../../../models/Todos";

interface TodoCalenderDayCellProps {
    inToday: boolean;
    inCurrentMonth: boolean;
    date: number;
    year: number;
    month: number;
    todos: Todo[];
    onDropTodo: (todoId: number, newDate: string) => void;
}

const TodoCalenderDayCell: React.FC<TodoCalenderDayCellProps> = ({ inToday, inCurrentMonth, date, year, month, todos, onDropTodo }) => {
    if (!inCurrentMonth || date < 1) {
        return <div style={{ height: "80px", backgroundColor: "#f5f5f5" }} />;
    }
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    const dayTodos = todos.filter(todo => todo.expiredAt === dateString);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={(e) => {
                e.preventDefault();
                const todoId = parseInt(e.dataTransfer.getData("todoId"), 10);
                if (!isNaN(todoId)) {
                    onDropTodo(todoId, dateString);
                }
            }}
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
            {/*TODO: 할일 4개 이상일경우 짤림 현상 수정*/}
            {dayTodos.map(todo => (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("todoId", todo.id.toString());
                    }}
                    style={{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: todo.completed ? "#9ca3af" : "#111",
                        cursor: "grab"
                    }}
                >
                    • {todo.text}
                </div>
            ))}
        </div>
    );
};

export default TodoCalenderDayCell;