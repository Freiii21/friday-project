import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from 'react';

type PropsType = {
    text: string;
}
export const ButtonForTableCell = ({text}: PropsType) => {
    return (
        <>
            <span>{text} </span>
            <Button variant="text" size={'small'}style={{marginLeft:'25px'}}>
                To Cards
                <ExitToAppIcon/>
            </Button>

        </>
    )
}