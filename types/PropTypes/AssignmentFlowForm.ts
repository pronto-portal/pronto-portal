export interface ModelForm<T = undefined> {
  id?: string;
  onSuccess: (data?: T) => void;
  mode?: "create" | "edit";
}

export interface AssignmentFlowForm extends ModelForm {
  onSuccess: () => void;
  mode?: "create" | "edit";
}
