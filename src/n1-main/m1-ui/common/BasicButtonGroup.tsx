import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type PropsType = {
    userId: boolean;
}
const fontSize = {fontSize: '0.6rem'}
export default function BasicButtonGroup({userId}: PropsType) {
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group" size={'small'}>
            {userId && <Button style={fontSize} color={'secondary'}>Del</Button>}
            <Button style={fontSize}>Edit</Button>
            <Button style={fontSize}>Learn</Button>
        </ButtonGroup>
    );
}