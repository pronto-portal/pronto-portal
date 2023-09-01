import { Assignment } from "./Assignment";
import { User } from "./User";

export interface Address {
  id: string;
  user: User;
  userId: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  assignment?: Assignment[];
}
