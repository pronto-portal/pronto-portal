import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const NavBarContainer = styled(Box)`
    color: ${({ theme }) => theme.palette.primary.main};
    width: 100%;
    position: static;
    borderradius: 0;
    backgroundcolor: '#fff';
    borderbottom: 1;
    bordercolor: 'divider';
`;

export default NavBarContainer;
