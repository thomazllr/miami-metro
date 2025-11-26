export interface KillerPhoto {
    id: number;
    image: string;
    uploaded_at: string;
}

export interface Killer {
    id: number;
    name: string;
    nickname?: string;
    crimes: string;
    danger_level: number;
    status: number;
    status_display?: string;
    created_at: string;
    updated_at: string;
    photos?: KillerPhoto[];
}
