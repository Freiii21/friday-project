import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type PropsType = {
    userId: boolean;
    name_1?: string;
    name_2: string;
    name_3: string;
    color?: boolean;
    callBack1?: () => void;
    callBack2?: ()=>void;
    callBack3?: () => void;
}
const fontSize = {fontSize: '0.6rem'}
export default function BasicButtonGroup(
    {userId, name_1, name_2, name_3, color, callBack1, callBack2, callBack3}: PropsType) {
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group" size={'small'}>
            {userId && <Button style={fontSize}
                               color={'secondary'}
                               onClick={callBack1}
            >
                {name_1}
            </Button>}
            {
                color
                    ? <Button
                        style={fontSize} color={'secondary'} onClick={callBack2}>
                        {name_2}
                    </Button>
                    : <Button style={fontSize} onClick={callBack2}>
                        {name_2}
                    </Button>
            }

            <Button style={fontSize} onClick={callBack3}>{name_3}</Button>
        </ButtonGroup>
    );
}