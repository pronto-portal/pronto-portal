import { TotalRowCount } from './base';
import { Assignment } from '../ObjectTypes';

export interface GetAssignments extends TotalRowCount {
    assignments: Assignment[];
}

export interface GetAssignmentsResponse {
    getAssignments: GetAssignments;
}

export interface CreateAssignmentResponse {
    createAssignment: Assignment;
}

export interface UpdateAssignmentResponse {
    updateAssignment: Assignment;
}
