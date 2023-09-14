import { Person } from "./Person";

export interface User extends Person {
  createdAt: Date;
  updatedAt: Date;
  profilePic: string;
  isManager: boolean;
  isTranslator: boolean;
  isBanned: boolean;
  isProfileComplete: boolean;
  city: string;
  state: string;
}
