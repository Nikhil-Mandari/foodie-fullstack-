export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: string;
    id?: number;
}
