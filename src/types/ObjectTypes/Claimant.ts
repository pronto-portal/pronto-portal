import { Assignment } from './Assignment';
import { Person } from './Person';
import { User } from './User';

export interface Claimant extends Person {
    user: User;
    userId: string;
    assignment?: Assignment[];
    primaryLanguage: string;
}
