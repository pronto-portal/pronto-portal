import React from "react";
import { useAddAssignmentFlow } from "../../contextProviders/AddAssignmentFlowProvider";
import { AssignmentFlowForm } from "../../types/PropTypes/AssignmentFlowForm";
import { TranslatorSelect } from "../TranslatorSelect";

export const TranslatorForm: React.FC<AssignmentFlowForm> = ({ onSuccess }) => {
  const { translator, setTranslator } = useAddAssignmentFlow();
  const handleSubmit = () => {
    if (Object.keys(translator).length) {
      onSuccess();
    }
  };

  return (
    <TranslatorSelect
      onConfirm={(translator) => {
        setTranslator(translator);
        handleSubmit();
      }}
      buttonText="Next"
      buttonDisabled={!Object.keys(translator).length}
      onChange={(translator) => setTranslator(translator)}
      defaultValue={
        translator && Object.keys(translator).length ? translator : undefined
      }
    />
  );
};
