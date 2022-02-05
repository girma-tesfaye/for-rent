import React from 'react';
import Paper from '@mui/material/Paper';

export const showLoading = () => (
    <Paper 
        sx={{ 
            backgroundColor:'rgb(237, 247, 237)', 
            p: '12px', 
            margin: '12px', 
            textAlign: 'center', 
            display: 'initial',
            width:'400px' , 
            maxWidth:'100%'
        }}
    >
        Wait for a while...
    </Paper>
  );
