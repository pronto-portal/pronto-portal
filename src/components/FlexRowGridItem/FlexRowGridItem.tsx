import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

export const FlexRowGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    rowGap: 10,
    columnGap: 10,
});

FlexRowGridItem.defaultProps = {
    ...FlexRowGridItem.defaultProps,
    item: true,
};
