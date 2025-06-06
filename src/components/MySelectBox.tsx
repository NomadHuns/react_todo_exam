import React from "react";

export interface OptionItem {
    value: string;
    label: string;
}
interface MySelectBoxProps {
    value: string;
    onChange: (value: string) => void;
    options: OptionItem[];
}

const MySelectBox: React.FC<MySelectBoxProps> = ({ value, onChange, options }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.select}
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    );
};

const styles: Record<string, React.CSSProperties> = {
    select: {
        padding: "8px 10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: 6,
        backgroundColor: "#fff",
        WebkitAppearance: "none" as const,
        appearance: "none" as const,
    },
};

export default MySelectBox;