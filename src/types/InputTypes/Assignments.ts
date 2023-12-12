import { GetAddressesFilter } from './Address';
import { DateRange, PaginatedInput } from './base';
import { GetClaimantsFilter } from './Claimant';
import { GetTranslatorsFilters } from './Translator';
import { Assignment } from '../ObjectTypes';

export interface GetAssignmentsFilter {
    id?: string;
    assignedTo?: GetTranslatorsFilters;
    address?: GetAddressesFilter;
    claimant?: GetClaimantsFilter;
    dateRange?: DateRange;
    date?: Date;
}

export interface GetAssignmentsInput {
    input?: PaginatedInput;
    where?: GetAssignmentsFilter;
}

export interface CreateAssignmentInput {
    input: {
        translatorId: string;
        addressId: string;
        claimantId: string;
        dateTime: Date;
    };
}

// t.nonNull.string("id");
// t.nullable.string("translatorId");
// t.nullable.string("claimantId");
// t.nullable.string("addressId");
// t.nullable.field("dateTime", {
//   type: "DateTime",
// });
// t.nullable.boolean("isComplete");
// t.nullable.boolean("claimantNoShow");
// t.nullable.boolean("translatorNoShow");

export type UpdateAssignment = Pick<Assignment, 'id'> &
    Partial<Pick<Assignment, 'assignedToId' | 'claimantId' | 'address' | 'addressId' | 'dateTime' | 'claimantNoShow' | 'translatorNoShow' | 'isComplete'>>;

export interface UpdateAssignmentInput {
    input: UpdateAssignment;
}
