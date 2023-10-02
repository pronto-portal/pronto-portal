import { CreateEdit } from "../CRUDModes";

export interface ModelForm<T = undefined> {
  id?: string;
  onSuccess: (data?: T) => void;
  mode?: CreateEdit;
  selectExisting?: boolean;
}

export interface AssignmentFlowForm extends ModelForm {
  onSuccess: () => void;
}
