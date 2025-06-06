import React from "react";

interface MyTextInputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ placeholder, value, onChange }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.input}
        />
    );
};

const styles: Record<string, React.CSSProperties> = {
    input: {
        flex: 1,
        padding: 8,
        fontSize: 14,
    },
};

export default MyTextInput;