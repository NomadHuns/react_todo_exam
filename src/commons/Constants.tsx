import {Priority} from "../models/Todos";
import {OptionItem} from "../components/MySelectBox";

export const PRIORITY_LABELS: Record<Priority, string> = {
    high: "🔴",
    medium: "🟡",
    low: "🔵",
};

export const PRIORITY_OPTIONS: OptionItem[] = [{value: "high", label:"🔴"}, {value: "medium", label:"🟡"}, {value: "low", label:"🔵"}];
