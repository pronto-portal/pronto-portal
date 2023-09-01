import { Assignment } from "../Assignment";
import { TotalRowCount } from "./base";

export interface GetAssignments extends TotalRowCount {
  assignments: Assignment[];
}

export interface GetAssignmentsResponse {
  getAssignments: GetAssignments;
}
