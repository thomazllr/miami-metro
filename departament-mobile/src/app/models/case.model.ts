import { Killer } from './killer.model';
import { PoliceOfficer } from './police-officer.model';

export interface Case {
    id: number;
    case_number: string;
    title: string;
    description: string;
    status: number;
    status_display?: string;
    killer?: Killer;
    officers?: PoliceOfficer[];
    date_opened: string;
    date_closed?: string;
    created_at: string;
    updated_at: string;
}
