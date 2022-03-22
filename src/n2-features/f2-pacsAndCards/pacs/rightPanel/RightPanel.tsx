import Grid from '@mui/material/Grid';
import React, {ChangeEvent} from 'react';
import {Search} from './Search';
import {TablePacks} from './table/TablePacks';
import {useDispatch} from 'react-redux';
import {setCardsName} from '../../../../n1-main/m2-bll/reducers/packsReducer';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';


export const RightPanel = () => {
    const dispatch = useDispatch()
    const cardsName = useTypedSelector(state => state.packs.getPackData.packName)

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        dispatch(setCardsName(e.currentTarget.value))
    }

    return (
        <Grid container xs={8} md={9} xl={10}
              sx={{backgroundColor: 'rgb(63, 81, 181)', padding: ' 0 0.5%'}}
        >
            <Search
                isButton={true}
                titleSearch={'Packs List'}
                value={cardsName}
                onChange={onChangeHandler}
            />
            <TablePacks/>
        </Grid>
    )
}