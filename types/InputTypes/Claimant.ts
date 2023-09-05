import { Claimant } from "../ObjectTypes";
import { PaginatedInput } from "./base";

export interface GetClaimantsFilter {
  language?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetClaimantsInput {
  paginatedInput?: PaginatedInput;
  where?: GetClaimantsFilter;
}

export interface CreateClaimantsInput {
  input: Omit<Claimant, "id" | "user" | "userId">;
}
