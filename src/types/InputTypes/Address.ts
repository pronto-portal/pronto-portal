import { PaginatedInput } from './base';

export interface GetAddressesFilter {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export interface GetAddressesInput {
    paginatedInput?: PaginatedInput;
    where?: GetAddressesFilter;
}

export interface CreateAddressInput {
    input: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

export interface UpdateAddressInput {
    input: {
        id: string;
        address1?: string;
        address2?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
}
