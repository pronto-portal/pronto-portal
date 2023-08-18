export interface PaginatedInput {
  page: number;
  countPerPage: number;
}

export interface GetTranslatorsFilters {
  language?: string;
  city?: string;
  state?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetTranslatorsInput {
  input: PaginatedInput;
  where?: GetTranslatorsFilters;
}
