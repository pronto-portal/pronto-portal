import React, { useState, useContext, createContext } from "react";
import { Address, Claimant } from "../../types/ObjectTypes";
import { Wrapper } from "../../types/PropTypes/Wrapper";
import { Reminder } from "../../types/ObjectTypes";

interface AddAssignmentFlowContextProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  claimant: Claimant;
  setClaimant: React.Dispatch<React.SetStateAction<Claimant>>;
  reminder: Reminder;
  setReminder: React.Dispatch<React.SetStateAction<Reminder>>;
}

const AddAssignmentFlowContext = createContext<AddAssignmentFlowContextProps>(
  {} as AddAssignmentFlowContextProps
);

export const AddAssignmentFlowProvider: React.FC<Wrapper> = ({ children }) => {
  const [address, setAddress] = useState<Address>({} as Address);
  const [claimant, setClaimant] = useState<Claimant>({} as Claimant);
  const [reminder, setReminder] = useState<Reminder>({} as Reminder);

  return (
    <AddAssignmentFlowContext.Provider
      value={{
        address,
        setAddress,
        claimant,
        setClaimant,
        reminder,
        setReminder,
      }}
    >
      {children}
    </AddAssignmentFlowContext.Provider>
  );
};

export const useAddAssignmentFlow = () => {
  const data = useContext(AddAssignmentFlowContext);

  if (!data)
    throw new Error(
      "useAddAssignmentFlow must be used within AddAssignmentFlowProvider"
    );

  return data;
};
