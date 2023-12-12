import React from 'react';
import Checkbox from '@mui/material/Checkbox';

interface StaticCheckboxProps {
    checked: boolean;
}

export const StaticCheckbox: React.FC<StaticCheckboxProps> = ({ checked }) => {
    return <Checkbox checked={checked} color='primary' disabled />;
};
