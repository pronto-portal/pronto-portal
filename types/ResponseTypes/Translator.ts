import { User } from "../User";
import { TotalRowCount } from "./base";

export interface AddAndCreateTranslatorResponse {
  addAndCreateTranslator: User;
}

export interface GetTranslators extends TotalRowCount {
  translators: User[];
}

export interface GetTranslatorsResponse {
  getTranslators: GetTranslators;
}
