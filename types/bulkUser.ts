export interface BulkUserData {
    username: string;
    email: string;
    phone: string;
    sessions_left: number;
    start_date?: string; // YYYY-MM-DD format
    end_date: string; // YYYY-MM-DD format
}
