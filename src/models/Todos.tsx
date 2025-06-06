
export type Priority = "high" | "medium" | "low";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: Priority;
    // TODO: 생성일시 추가
}