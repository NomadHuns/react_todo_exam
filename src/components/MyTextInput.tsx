import React from "react";

interface MyTextInputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    autoFocus? : boolean;
    style?: React.CSSProperties;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ placeholder, value, onChange, onKeyDown, autoFocus, style }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            style={style == null ? styles.input : style}
            autoFocus={autoFocus}
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