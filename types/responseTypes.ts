import { Assignment } from "./Assignment";
import { User } from "./User";

interface TotalRowCount {
  totalRowCount: number;
}

export interface AddAndCreateTranslatorResponse {
  addAndCreateTranslator: User;
}

export interface GetTranslators extends TotalRowCount {
  translators: User[];
}

export interface GetTranslatorsResponse {
  getTranslators: GetTranslators;
}

export interface GetAssignments extends TotalRowCount {
  assignments: Assignment[];
}

export interface GetAssignmentsResponse {
  getAssignments: GetAssignments;
}
