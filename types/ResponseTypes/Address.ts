import { Assignment } from "../ObjectTypes";
import { TotalRowCount } from "./base";

export interface GetAddressResponse {
  getAddress: Assignment;
}

export interface GetAddresses extends TotalRowCount {
  assignments: Assignment[];
}

export interface GetAddressesResponse {
  getAddresses: GetAddresses;
}
