import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

interface ModelNestedRowActionsProps<T extends {}> {
    onEditClick: () => void;
    datum: T;
}

export const ModelNestedRowActionsProps = <T extends {}>({ onEditClick }: ModelNestedRowActionsProps<T>) => {
    return (
        <Stack direction='row' spacing={1}>
            <IconButton size='small' onClick={onEditClick}>
                <EditIcon />
            </IconButton>
        </Stack>
    );
};
