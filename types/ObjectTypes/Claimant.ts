import { Assignment } from "./Assignment";
import { User } from "./User";
import { Person } from "./Person";

export interface Claimant extends Person {
  user: User;
  userId: string;
  assignment?: Assignment[];
  primaryLanguage: string;
}
