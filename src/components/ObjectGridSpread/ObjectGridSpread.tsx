import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { firstCharToUpper } from '../../utils/firstCharToUpper';
import { FlexRowGridItem } from '../FlexRowGridItem';

interface ObjectGridSpreadProps<T extends {}> {
    object: T;
    showNestedObjects?: boolean;
}

export const ObjectGridSpread = <T extends {}>({ object, showNestedObjects }: ObjectGridSpreadProps<T>) => {
    const entries = Object.entries(object);

    return (
        <Grid container direction={'column'} spacing={2} padding={2} alignItems='start' alignContent='space-between' width={1} maxWidth={1}>
            {entries.map(([key, value]) => {
                let displayValue: React.ReactNode = '';

                if (value && typeof value === 'object' && showNestedObjects) {
                    return (
                        <Card key={key} sx={{ width: '100%', padding: 0 }}>
                            <CardHeader title={firstCharToUpper(key)} />
                            <CardContent sx={{ padding: 0 }}>
                                <ObjectGridSpread<typeof value> object={value} />
                            </CardContent>
                        </Card>
                    );
                }

                if (value && value instanceof Date) {
                    displayValue = value.toLocaleDateString();
                }

                if ((value && typeof value === 'boolean') || typeof value === 'number' || typeof value === 'string') {
                    displayValue = value.toString();
                }

                if (Array.isArray(value) && value.length && typeof value[0] === 'string') {
                    displayValue = (
                        <Stack direction='row' spacing={1} alignItems='center' justifyContent='flex-start' flexWrap='wrap'>
                            {value.map((v) => (
                                <Chip label={v} key={v} />
                            ))}
                        </Stack>
                    );
                }

                if (!displayValue) return null;

                return (
                    <FlexRowGridItem key={key} sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Typography fontWeight='bold'>{firstCharToUpper(key)}</Typography>
                        {typeof displayValue === 'string' ? <Typography>{displayValue}</Typography> : displayValue}
                    </FlexRowGridItem>
                );
            })}
        </Grid>
    );
};

ObjectGridSpread.defaultProps = {
    showNestedObjects: false,
};
