export interface PaginatedInput {
  page: number;
  countPerPage: number;
}

export interface GetTranslatorsFilters {
  id?: string;
  email?: string;
  phone?: string;
  languages?: string[];
  city?: string;
  state?: string;
}

export interface GetTranslatorsInput {
  input: PaginatedInput;
  where?: GetTranslatorsFilters;
}

export interface AddAndCreateTranslatorInput {
  input: {
    email: string;
    phone: string;
    firstName: string;
    lastName?: string;
    languages: string[];
    city?: string;
    state?: string;
  };
}

export interface DateRange {
  date1: Date;
  date2: Date;
}

export interface GetAddressesFilter {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface GetClaimantsFilter {
  language?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetAssignmentsFilter {
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
