export interface MoodData {
    id: number;
    mood: string;
    reason: string;
    explanation: string;
    date: Date;
}

export interface AuthenticationResponse {
    token: string;
}
