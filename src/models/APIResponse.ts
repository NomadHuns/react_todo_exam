import {Errors} from "./Errors";

export type APIResponse<T> = {
    success: boolean
    content: T[] | null;
    error: Errors | null;
};