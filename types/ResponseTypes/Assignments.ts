import { Assignment } from "../ObjectTypes";
import { TotalRowCount } from "./base";

export interface GetAssignments extends TotalRowCount {
  assignments: Assignment[];
}

export interface GetAssignmentsResponse {
  getAssignments: GetAssignments;
}

export interface CreateAssignmentResponse {
  createAssignment: Assignment;
}
