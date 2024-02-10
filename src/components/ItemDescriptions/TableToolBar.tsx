import React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

// TODO add save all or cancel options for edit
const TableToolbar = ({ onEditClick }: any) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <Chip label='Edit' onClick={onEditClick} color='primary' variant='outlined' style={{ cursor: 'pointer' }} />
            <Chip label='Filter' onClick={onEditClick} color='primary' variant='outlined' style={{ cursor: 'pointer' }} />
        </div>
    );
};

export default TableToolbar;
