import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

interface StaticCheckboxProps {
    checked: boolean;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    isEditable?: boolean;
}

export const StaticCheckbox: React.FC<StaticCheckboxProps> = ({ checked, handleChange, isEditable = false }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (isEditable && handleChange) {
            handleChange(event, checked);
        }
    };

    return <Checkbox checked={checked} color='primary' onChange={handleCheckboxChange} disabled={!isEditable} />;
};
