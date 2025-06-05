import React from "react";

export interface OptionItem {
    value: string;
    label: string;
}
interface PrioritySelectProps {
    value: string;
    onChange: (value: string) => void;
    options: OptionItem[];
}

const MySelectBox: React.FC<PrioritySelectProps> = ({ value, onChange, options }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.select}
        >
            {options.map((p) => (
                <option key={p.value} value={p.value}>
                    {p.label}
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