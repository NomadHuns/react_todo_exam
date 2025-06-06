import React from "react";

interface MyButtonProps {
    text: string;
    onClick: () => void; // 수정
    style?: React.CSSProperties;
}

const MyButton: React.FC<MyButtonProps> = ({ text, onClick, style }) => {
    return (
        <button onClick={onClick} style={style == null ? styles.button : style}>
            {text}
        </button>
    );
};

const styles: Record<string, React.CSSProperties> = {
    button: {
        padding: "8px 12px",
        backgroundColor: "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
    },
};

export default MyButton;