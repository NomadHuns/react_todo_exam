import React from "react";

interface MyTagButtonProps {
    tag: string;
    deleteTag: (value: string) => void;
}

const MyTagButton: React.FC<MyTagButtonProps> = ({ tag, deleteTag }) => {
    return (
        <span key={tag} style={styles.tagItem}>
                                       {tag}
            <button
                onClick={() => deleteTag(tag)}
                style={styles.tagDeleteBtn}
            >
                ×
            </button>
        </span>
    );
};

const styles: Record<string, React.CSSProperties> = {
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
};

export default MyTagButton;