import { Assignment } from './Assignment';
import { User } from './User';

export interface BaseAddress {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
}
export interface Address extends BaseAddress {
    id: string;
    user: User;
    userId: string;
    assignment?: Assignment[];
}
