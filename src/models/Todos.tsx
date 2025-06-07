
export type Priority = "high" | "medium" | "low";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: Priority;
    expiredAt: string | undefined;
    createdAt: string;
}