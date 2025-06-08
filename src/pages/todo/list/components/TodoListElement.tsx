import {Todo} from "../../../../models/Todos";
import React, {useState} from "react";
import MyButton from "../../../../components/MyButton";
import MyTextInput from "../../../../components/MyTextInput";
import MySelectBox from "../../../../components/MySelectBox";
import {formatKoreanDate, getRelativeDayLabel} from "../../../../utils/FormatUtils";
import MyTagButton from "../../../../components/MyTagButton";
import {PRIORITY_LABELS, PRIORITY_OPTIONS} from "../../../../commons/Constants";

interface TodoListElementProp {
    todo: Todo;
    toggleComplete: () => void;
    deleteTodo: () => void;
    changeText: (value: string) => void;
    setPriority: (value: string) => void;
    openedId: number | null;
    setOpenedId: (id: number | null) => void;
    setExpiredAt: (value: string) => void;
    saveTag: (value: string) => void;
    deleteTag: (value: string) => void;
}

const TodoListElement: React.FC<TodoListElementProp> = ({ todo, toggleComplete, deleteTodo, changeText, setPriority, openedId, setOpenedId, setExpiredAt, saveTag, deleteTag }) => {
    const isOpen = openedId === todo.id;
    const [tagValue, setTagValue] = useState<string>("");

    return (
        <>
            <li style={styles.todoItem}>
                <div
                    style={styles.leftWrap}
                    onClick={() => setOpenedId(todo.id)} // ✅ 왼쪽 전체를 클릭 가능하게
                >
                    <div
                        style={styles.checkboxWrapper}
                        onClick={(e) => e.stopPropagation()} // ✅ 체크박스 클릭 시 이벤트 전파 막기
                    >
                        <input
                            type="checkbox"
                            id={`checkbox-${todo.id}`}
                            onChange={toggleComplete}
                            checked={todo.completed}
                            style={styles.checkbox}
                        />
                        <label htmlFor={`checkbox-${todo.id}`} style={styles.customCheckbox}>
                            {todo.completed && <div style={styles.checkMark} />}
                        </label>
                    </div>

                    {isOpen && (
                        <MyTextInput value={todo.text} onChange={(e) => changeText(e)}
                                     placeholder={"할 일을 입력하세요."}
                                     autoFocus={true}
                        />
                    )}
                    {!isOpen && (
                        <span
                            style={{
                                flex: 1,
                                textDecoration: todo.completed ? "line-through" : "none",
                                opacity: todo.completed ? 0.6 : 1,
                                cursor: "pointer",
                                marginLeft: 8,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "inline-block",
                            }}
                        >
                            {PRIORITY_LABELS[todo.priority]} {todo.text}
                        </span>
                    )}
                    <span
                        style={{
                            opacity: todo.completed ? 0.6 : 1,
                            cursor: "pointer",
                            marginLeft: 8,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            fontWeight: "bold"
                        }}
                    >
                        {getRelativeDayLabel(todo.expiredAt)}
                    </span>
                </div>

                <div onClick={(e) => e.stopPropagation()}> {/* ✅ 삭제 버튼도 이벤트 분리 */}
                    <MyButton onClick={() => {
                                    if (window.confirm("해당 할일을 삭제하시겠습니까?")) {
                                        deleteTodo();
                                    }
                                }}
                              style={styles.delBtn} text="삭제" />
                </div>
            </li>
            {/* 상세 영역 */}
            {isOpen && (
                <div style={styles.detailBox}>
                    <div style={styles.detailRow}>
                        <div style={styles.detailLabel}>우선 순위</div>
                        <div style={styles.detailInputBoxWrap}>
                            <MySelectBox
                                value={todo.priority}
                                onChange={(e) => setPriority(e)}
                                options={PRIORITY_OPTIONS}
                                style={styles.select}
                            />
                        </div>
                    </div>
                    <div style={styles.detailRow}>
                        <div style={styles.detailLabel}>기한</div>
                        <div style={styles.detailInputBoxWrap}>
                            <input
                                type="date"
                                value={todo.expiredAt}
                                onChange={(e) => setExpiredAt(e.target.value)}
                                style={{
                                    padding: "8px 12px",
                                    fontSize: "14px",
                                    borderRadius: "8px",
                                    border: "1px solid #d1d5db",
                                    backgroundColor: "#fff",
                                    color: "#111827",
                                    outline: "none",
                                    transition: "border-color 0.2s ease",
                                    appearance: "none",
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                }}
                            />
                        </div>
                    </div>
                    <div style={styles.detailRow}>
                        <div style={styles.detailLabel}>태그</div>
                        <div style={styles.detailInputBoxWrap}>
                            <div style={styles.tagListWrap}>
                                {todo.tags?.map((tag) => (
                                    <MyTagButton deleteTag={() => deleteTag(tag)} tag={tag}/>
                                ))}
                            </div>
                            <MyTextInput
                                value={tagValue}
                                onChange={(e) => setTagValue(e)}
                                onKeyDown={(e) => {
                                    if ((e.key === "Enter" || e.key === " ") && tagValue.trim().length > 1) {
                                        e.preventDefault();
                                        saveTag(tagValue.trim());
                                        setTimeout(() => setTagValue(""), 10);
                                    }
                                }}
                                placeholder={"ex) 공부"}
                                style={styles.input}
                                maxLength={10}
                            />
                        </div>
                    </div>
                    <div style={styles.detailRow}>
                        <div style={styles.detailLabel}>생성일시</div>
                        <div style={styles.detailInputBoxWrap}>
                            {formatKoreanDate(todo.createdAt)}
                        </div>
                    </div>
                    <div style={styles.detailButtonWrap}>
                        <MyButton onClick={() => setOpenedId(null)} text="확인" />
                    </div>
                </div>
            )}
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    detailRow: {
        display: "flex",
        width: "100%",
        padding: "8px 0",
    },
    detailLabel: {
        width: "20%",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingRight: 12,
        boxSizing: "border-box",
    },
    detailInputBoxWrap: {
        width: "80%",
    },
    select: {
        width: "100%",
        padding: "8px 10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: 6,
        backgroundColor: "#fff",
        WebkitAppearance: "none" as const,
        appearance: "none" as const,
        boxSizing: "border-box",
    },
    todoItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
        borderBottom: "1px solid #eee",
    },
    leftWrap: {
        display: "flex",
        minWidth: 0,
        gap: 8,
        alignItems: "center",
        flex: 1,
        padding: "8px",
        cursor: "pointer",
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
    detailBox: {
        padding: "8px 12px",
        backgroundColor: "#f9f9f9",
        borderBottom: "1px solid #ddd",
        fontSize: "14px",
        color: "#333",
    },
    detailButtonWrap: {
        display: "flex",
        justifyContent: "center",
        marginTop: 12,
    },
    tagListWrap: {
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginBottom: "8px",
        alignItems: "center",
    },
    tagItem: {
        backgroundColor: "#e0e7ff",
        color: "#1e40af",
        padding: "6px 10px",
        borderRadius: "9999px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: 500,
        maxWidth: "100%",
    },
    tagDeleteBtn: {
        border: "none",
        background: "transparent",
        color: "#64748b",
        fontSize: "14px",
        cursor: "pointer",
        lineHeight: 1,
        padding: 0,
        margin: 0,
        transition: "color 0.2s ease",
    },
    input: {
        flex: 1,
        padding: "8px 12px",
        fontSize: "14px",
        borderRadius: "9999px",
        border: "1px solid #d1d5db",
        outline: "none",
        backgroundColor: "#fff",
        transition: "border-color 0.2s ease",
    },
};

export default TodoListElement;