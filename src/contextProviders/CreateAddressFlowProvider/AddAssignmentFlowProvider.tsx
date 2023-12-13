import React, { useState, useContext, createContext } from 'react';
import { Address } from '../../types/ObjectTypes';
import { Wrapper } from '../../types/PropTypes/Wrapper';

interface CreateAddressFlowContextProps {
    address: Address;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
}

const CreateAddressFlowContext = createContext<CreateAddressFlowContextProps>({} as CreateAddressFlowContextProps);

export const CreateAddressFlowProvider: React.FC<Wrapper> = ({ children }) => {
    const [address, setAddress] = useState<Address>({} as Address);

    return <CreateAddressFlowContext.Provider value={{ address, setAddress }}>{children}</CreateAddressFlowContext.Provider>;
};

export const useCreateAddressFlow = () => {
    const data = useContext(CreateAddressFlowContext);

    if (!data) throw new Error('useCreateAddressFlow must be used within CreateAddressFlowProvider');

    return data;
};
