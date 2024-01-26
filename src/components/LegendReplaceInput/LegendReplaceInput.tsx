import React, { useEffect } from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Word from '../../types/word';

const Legend = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
}));

interface LegendReplaceInputProps {
    words: Word[];
    enablePreview?: boolean;
    defaultValue?: string;
    onChange: (value: string) => void;
}

export const LegendReplaceInput: React.FC<LegendReplaceInputProps> = ({ words, enablePreview = false, defaultValue = '', onChange }) => {
    const [value, setValue] = React.useState<string>(defaultValue);
    const previewText = enablePreview ? words.reduce((acc, { label, word }) => acc.replaceAll(`{{${label}}}`, word), value) : '';

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        onChange(value);
    }, [value, onChange]);

    return (
        <Stack direction='column' spacing={1} alignItems='center' width={1} justifyContent='center'>
            <Grid container direction='row' spacing={2} height='100%'>
                <Grid
                    item
                    container
                    xs={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                    }}
                    direction='column'
                >
                    <Grid item xs={6} width='100%'>
                        <TextField multiline rows={5} fullWidth value={value} onChange={handleOnChange} />
                    </Grid>

                    <Grid item xs={5} sx={{ overflowY: 'scroll' }} width='100%'>
                        <Typography variant='h6'>Preview</Typography>
                        <Typography fontStyle='italic' whiteSpace='wrap'>
                            {previewText}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} width='100%'>
                        <Divider />
                    </Grid>
                </Grid>
                <Grid item xs={4} height='100%'>
                    <Legend>
                        <Typography variant='h6'>Legend</Typography>
                        <Divider />
                        <List dense>
                            {words.map(({ label, word }) => (
                                <ListItem
                                    key={`legendReplaceInput${label}${word}`}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: grey[100],
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={<Typography fontWeight={'bold'}> {`{{${label}}}`} </Typography>}
                                        onClick={() => {
                                            setValue((prev) => {
                                                console.log('prev', value);
                                                return prev + `{{${label}}}`;
                                            });
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Legend>
                </Grid>
            </Grid>
        </Stack>
    );
};
