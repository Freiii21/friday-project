import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {styleForCardButtons} from '../../../../../n1-main/m1-ui/utilities/for css';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../../../n1-main/m1-ui/routes/RoutesComponent';
import React from 'react';

type PropsType = {
    getNewCard: () => void;
    idPack: string;
    namePack: string;
    card_id: string
}
export const ButtonsForCard = ({getNewCard, idPack, namePack, card_id}: PropsType) => {
    return (
        <Grid container xs={12} justifyContent={'space-around'}
              direction={'row'}
              sx={{marginTop: 5}}>
            <Button
                sx={styleForCardButtons}
                size={'small'}
                type={'button'} variant={'contained'} color={'primary'}
            >
                <NavLink to={PATH.PACKS_CARDS}
                         style={{color: 'inherit', textDecoration: 'none'}}>
                    Cancel
                </NavLink>
            </Button>
            <Button

                type={'submit'}
                sx={styleForCardButtons}
                size={'small'}
                variant={'contained'} color={'primary'}
                onClick={getNewCard}

            >
                <NavLink style={{textDecoration: 'none', color: 'white'}}
                         to={`/card/${idPack}/${namePack}/${card_id}`}>Next</NavLink>
            </Button>
        </Grid>
    );
}