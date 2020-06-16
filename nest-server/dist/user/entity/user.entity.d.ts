export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    lastLoginDate: Date;
    registrationDate: Date;
    blocked: boolean;
    comparePassword(attempt: string): Promise<boolean>;
    updateDates(): void;
    hashPassword(): Promise<void>;
}
