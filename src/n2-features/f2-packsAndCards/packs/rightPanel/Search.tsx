import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import React, {ChangeEvent} from 'react';
import {colorBlueMI, fontSizeButtonAuth} from '../../../../n1-main/m1-ui/utilities/for css';
import {useDispatch} from 'react-redux';
import {setUserID} from '../../../../n1-main/m2-bll/reducers/packsReducer';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

type PropsType = {
    isButton: boolean;
    isArrowBack?: boolean;
    titleSearch: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    callBack?: (open: boolean) => void;
    location: string;
}


export const Search = ({isArrowBack, isButton, titleSearch, onChange, value, callBack, location}: PropsType) => {
    const dispatch = useDispatch()
    const status = useTypedSelector(state => state.app.status);

    const onClickAddPack = () => {
        callBack && callBack(true);
    }
    const onClickReturnToPack = () => dispatch(setUserID(''));
    return (
        <Grid container
              xs={12}
              sx={{backgroundColor: 'ghostwhite', height: '15%', padding: '1%', margin: 0}}
              justifyContent={'space-around'}
              alignItems={'center'}

        >
            <Grid item xs={6}>
                <Typography variant={'h6'}>
                    {isArrowBack &&

                    <Button disabled={status === 'loading'} onClick={onClickReturnToPack}>
                        <NavLink to={'/packsCards'}
                                 style={{textDecoration: 'none'}}
                        >
                            <AssignmentReturnIcon style={{
                                color: 'rgb(63, 81, 181)',
                                position: 'relative',
                                top: '5px',
                                marginRight: '5px'
                            }}/>
                        </NavLink>
                    </Button>
                    }
                    <span style={{color: colorBlueMI}}> {titleSearch}</span>
                </Typography>
                <TextField
                    fullWidth={true} size={'small'}
                    variant={'standard'} placeholder={`search ${location}`}
                    value={value}
                    onChange={onChange}
                    disabled={status === 'loading'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            {
                isButton &&
                <Grid item xs={4}>

                    <Button variant={'contained'}
                            onClick={onClickAddPack}
                            color={'primary'}
                            size={'small'}
                            style={fontSizeButtonAuth}
                            disabled={status === 'loading'}
                    >Add pack</Button>


                </Grid>
            }

        </Grid>
    )
}