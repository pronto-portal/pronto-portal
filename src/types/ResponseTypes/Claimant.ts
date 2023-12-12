import { TotalRowCount } from './base';
import { Address, Assignment, Claimant } from '../ObjectTypes';

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

export interface UpdateClaimantResponse {
    updateClaimant: Claimant;
}
