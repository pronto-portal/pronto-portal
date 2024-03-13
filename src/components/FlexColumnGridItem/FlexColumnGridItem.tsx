import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

export const FlexColumnGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    rowGap: 10,
    columnGap: 10,
});

FlexColumnGridItem.defaultProps = {
    ...FlexColumnGridItem.defaultProps,
    item: true,
};
