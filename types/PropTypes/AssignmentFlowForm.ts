import { CreateEdit } from "../CRUDModes";

export interface ModelForm<T = undefined> {
  id?: string;
  onSuccess: (data?: T) => void;
  mode?: CreateEdit;
}

export interface AssignmentFlowForm extends ModelForm {
  onSuccess: () => void;
}
