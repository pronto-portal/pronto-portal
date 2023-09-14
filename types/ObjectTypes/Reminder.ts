import { Assignment } from "./Assignment";
import { User } from "./User";

export interface Reminder {
  id: string;
  assignment: Assignment;
  assignmentId: string;
  claimantMessage: string;
  translatorMessage: string;
  createdBy: User;
  createdById: string;
}
