import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavLink} from 'react-router-dom';
import React, {ChangeEvent} from 'react';

type PropsType = {
    isButton: boolean;
    isArrowBack?: boolean;
    title: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({isArrowBack, isButton, title, onChange, value}: PropsType) => {
    return (
        <Grid container
              xs={12}
              sx={{backgroundColor: 'ghostwhite', minHeight: '10vh', padding: '5px', margin: 0}}
              justifyContent={'space-around'}
              alignItems={'center'}
        >
            <Grid item xs={6}>
                <Typography variant={'h6'}>
                    {isArrowBack &&
                    <NavLink to={'/packsCards'}
                             style={{textDecoration: 'none'}}
                    >
                        <ArrowBackIcon
                            style={{color: 'rgb(63, 81, 181)', position: 'relative', top: '5px', marginRight: '5px'}}
                        />
                    </NavLink>}
                    {titleSearch}
                </Typography>
                <TextField
                    fullWidth={true} size={'small'}
                    variant={'standard'} placeholder={'search pack'}
                    value={value}
                    onChange={onChange}

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
                <Grid item xs={3}>
                    <Button variant={'contained'} color={'primary'} size={'small'} onClick={()=>setOpen(true)}>Add pack</Button>
                </Grid>
            }
            <ModalMi title={'Add Pack'} open={open} setOpen={setOpen} type={'input'} titleOfPage={'Pack'}/>
        </Grid>
    )
}