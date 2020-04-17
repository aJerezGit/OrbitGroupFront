import { Student } from "./student";

export interface ApiResponse {
    data: Student[];
    message: string;
    isError: boolean;
}
