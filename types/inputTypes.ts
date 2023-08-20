export interface PaginatedInput {
  page: number;
  countPerPage: number;
}

export interface GetTranslatorsFilters {
  languages?: string[];
  city?: string;
  state?: string;
}

export interface GetTranslatorsInput {
  input: PaginatedInput;
  where?: GetTranslatorsFilters;
}
