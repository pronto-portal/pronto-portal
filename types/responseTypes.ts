import { User } from "./User";

export interface GetTranslators {
  totalRowCount: number;
  translators: User[];
}

export interface GetTranslatorsResponse {
  getTranslators: GetTranslators;
}
