import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export const Words = styled(Stack)`
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: row;
    row-gap: 1rem;
    column-gap: 1rem;
`;

export const TextArea = styled(TextareaAutosize)`
    width: 100%;
    min-height: 25%;
`;
