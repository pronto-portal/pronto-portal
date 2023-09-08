export interface ModelForm<T = undefined> {
  onSuccess: (data?: T) => void;
  mode?: "create" | "edit";
}

export interface AssignmentFlowForm extends ModelForm {
  onSuccess: () => void;
  mode?: "create" | "edit";
}
