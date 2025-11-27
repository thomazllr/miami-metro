import { Case } from './case.model';

export interface PoliceOfficer {
    id: number;
    name: string;
    rank: number;
    rank_display?: string;
    department: number;
    department_display?: string;
    status: number;
    status_display?: string;
    badge_number: string;
    photo: string | null;
    created_at: string;
    updated_at: string;
    cases?: Case[];
}
