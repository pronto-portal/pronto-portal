import { Person } from "./Person";
import { Role } from "./Role";

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
  autoRenewSubscription: boolean;
  subscriptionEndDate: Date;
  role: Role;
  translatorsCount: number;
  remindersCount: number;
  remindersCreatedThisMonth: number;
}
