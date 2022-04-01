import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

type PropsType = {
    question: string;
    questionImg: string | undefined;
}
export const QuestionForCard = ({question, questionImg}: PropsType) => {
    return (
        <Grid container sx={{marginBottom: '10px'}}>
            <Grid item textAlign={'center'}>
                {questionImg && <img src={questionImg} style={{width: '80%'}} alt="question"/>}
            </Grid>
            <Grid item>
                <Typography variant={'body1'} component={'div'}>
                    Question: <span style={{color: 'red'}}>{question}</span>
                </Typography>
            </Grid>


        </Grid>
    )
}