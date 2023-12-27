import { Assignment } from './Assignment';
import { Person } from './Person';

export interface Translator extends Person {
    city?: string;
    state?: string;
    createdAt?: Date;
    updatedAt?: Date;
    assignedTo: Assignment[];
}
