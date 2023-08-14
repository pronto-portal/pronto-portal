import { User } from "./User";

export interface GetTranslators {
  getTranslators: { totalRowCount: number; translators: User[] };
}
