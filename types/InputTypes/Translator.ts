import { PaginatedInput } from "./base";

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
