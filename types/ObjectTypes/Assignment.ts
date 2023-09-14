import { Address } from "./Address";
import { Claimant } from "./Claimant";
import { Reminder } from "./Reminder";
import { User } from "./User";

export interface Assignment {
  id: string;
  createdAt: Date;
  assignedTo: User;
  assignedToUserId: string;
  createdBy: User;
  createdByUserId: string;
  claimant: Claimant;
  claimantId: string;
  dateTime: string;
  address: Address;
  addressId: string;
  isComplete: boolean;
  claimantNoShow: boolean;
  translatorNoShow: boolean;
  reminder: Reminder;
}
