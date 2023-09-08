import { Address, Assignment, Claimant } from "../ObjectTypes";
import { TotalRowCount } from "./base";

export interface GetClaimantResponse {
  getClaimant: Claimant;
}

export interface CreateClaimantResponse {
  createClaimant: Claimant;
}

export interface GetClaimants extends TotalRowCount {
  claimants: Claimant[];
}

export interface GetClaimantsResponse {
  getClaimants: GetClaimants;
}
