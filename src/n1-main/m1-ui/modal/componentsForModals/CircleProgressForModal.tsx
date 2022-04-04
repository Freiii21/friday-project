import {CircularProgress} from '@mui/material';
import * as React from 'react';

export const CircleProgressForModal = () => {
    return (
        <div style={{position: 'relative'}}>
            <CircularProgress
                style={{height: '20px', width: '20px', position: 'absolute', top: '0px', right: '0px'}}
            />
        </div>
    )
}