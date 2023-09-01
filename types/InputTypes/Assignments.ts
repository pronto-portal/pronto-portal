import { GetAddressesFilter } from "./Address";
import { GetClaimantsFilter } from "./Claimant";
import { GetTranslatorsFilters } from "./Translator";
import { DateRange, PaginatedInput } from "./base";

export interface GetAssignmentsFilter {
  id?: string;
  assignedTo?: GetTranslatorsFilters;
  address?: GetAddressesFilter;
  claimant?: GetClaimantsFilter;
  dateRange?: DateRange;
  date?: Date;
}

export interface GetAssignmentsInput {
  input: PaginatedInput;
  where?: GetAssignmentsFilter;
}
