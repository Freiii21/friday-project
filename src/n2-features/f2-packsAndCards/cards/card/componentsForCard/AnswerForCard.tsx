import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import {colorBlueMI} from '../../../../../n1-main/m1-ui/utilities/for css';

type PropsTypeA = {
    answer: string;
    answerImg: string|undefined;
}
export const AnswerForCard = ({answer, answerImg}: PropsTypeA) => {
    return (
        <Grid container sx={{marginBottom: '10px'}}>
            <Grid item textAlign={'center'}>
                {answerImg&& <img src={answerImg} style={{width: '80%'}} alt="question"/> }

            </Grid>
            <Grid item>
                <Typography variant={'body1'} component={'div'}>
                    Answer: <span style={{color:colorBlueMI}}>{answer}</span>
                </Typography>
            </Grid>


        </Grid>
    )
}