import { Assignment } from "./Assignment";
import { User } from "./User";

export interface Claimant {
  id: string;
  user: User;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  assignment?: Assignment[];
  languages: string[];
}
