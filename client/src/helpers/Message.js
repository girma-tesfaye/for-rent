import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export const errorMsgAlert = msg => (
    <Paper 
        sx={{ 
            backgroundColor:'rgb(253, 237, 237)', 
            p: '4px', 
            margin: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            width:'400px' , 
            maxWidth:'100%'
        }}
    >
        <Stack>
            <Alert sx={{ padding: '0px' }} severity="error">{msg}</Alert>
        </Stack>
    </Paper>
);

export const successMsgAlert = msg => (
    <Paper 
        sx={{ 
            backgroundColor:'rgb(237, 247, 237)', 
            p: '0px', 
            margin: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            width:'400px' , 
            maxWidth:'100%'
        }}
    >
        <Stack>
            <Alert severity="success">{msg}</Alert>
        </Stack>
    </Paper>
);