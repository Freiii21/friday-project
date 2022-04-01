import Grid from '@mui/material/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import React, {ChangeEvent} from 'react';

type PropsType = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export const RadioGroupForCard = ({onChange, value}: PropsType) => {
    return (
        <Grid item justifyContent={'center'} sx={{minHeight: '30%'}}>

            <FormControl component="fieldset">
                <FormLabel component="legend">Rate yourself</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value}
                            onChange={onChange}
                >
                    <FormControlLabel value="1" control={<Radio size={'small'}/>} label="Don`t know "/>
                    <FormControlLabel value="2" control={<Radio size={'small'}/>} label="Forgot"/>
                    <FormControlLabel value="3" control={<Radio size={'small'}/>}
                                      label="A lot of thought"/>
                    <FormControlLabel value="4" control={<Radio size={'small'}/>} label="Confused"/>
                    <FormControlLabel value="5" control={<Radio size={'small'}/>}
                                      label="Knew the answer"/>
                </RadioGroup>
            </FormControl>
        </Grid>
    )
}