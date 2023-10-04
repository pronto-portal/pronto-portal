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

export type UpdateClaimant = Pick<Claimant, "id"> &
  Omit<Partial<Claimant>, "id" | "user" | "userId" | "assignment">;

export interface UpdateClaimantsInput {
  input: UpdateClaimant;
}

export interface GetClaimantInput {
  input: {
    id: string;
  };
}
