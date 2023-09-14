import { Address, Assignment } from "../ObjectTypes";
import { TotalRowCount } from "./base";

export interface GetAddressResponse {
  getAddress: Address;
}

export interface GetAddresses extends TotalRowCount {
  addresses: Address[];
}

export interface GetAddressesResponse {
  getAddresses: GetAddresses;
}

export interface CreateAddressResponse {
  createAddress: Address;
}

export interface UpdateAddressResponse {
  updateAddress: Address;
}
