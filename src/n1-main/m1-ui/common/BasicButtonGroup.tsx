import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type PropsType = {
    userId: boolean;
}
export default function BasicButtonGroup({userId}: PropsType) {
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group" size={'small'}>
            {userId && <Button color={'secondary'}>Del</Button>}
            <Button>Edit</Button>
            <Button>Learn</Button>
        </ButtonGroup>
    );
}