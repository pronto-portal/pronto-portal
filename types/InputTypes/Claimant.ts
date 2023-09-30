import { Claimant } from "../ObjectTypes";
import { PaginatedInput } from "./base";

export interface GetClaimantsFilter {
  language?: string;
  primaryLanguages?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetClaimantsInput {
  input?: PaginatedInput;
  where?: GetClaimantsFilter;
}

export interface CreateClaimantsInput {
  input: Omit<Claimant, "id" | "user" | "userId">;
}

export interface UpdateClaimantsInput {
  input: Omit<Claimant, "id" | "user" | "userId" | "assignment">;
}

export interface GetClaimantInput {
  input: {
    id: string;
  };
}
