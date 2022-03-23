import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {Navigate, NavLink} from 'react-router-dom';
import {Box} from '@mui/material';
import {PATH} from '../../../../n1-main/m1-ui/routes/RoutesComponent';
import {colorBlueMI, wrapper} from '../../../../n1-main/m1-ui/utilities/for css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@mui/material/Typography';
import s from './card.module.css';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';

export const Card = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const namePack = useTypedSelector(state => state.cards.namePack);
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const handleSubmit = () => {
        alert(value)
    }

        if(!isAuth) return <Navigate to={PATH.LOGIN}/>

    return (
        <div style={wrapper}>
            <Box
                className={s.box}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    border: '2px solid lightgrey',
                    borderRadius: 3,
                    width: 450,
                    height: '90%',
                    backgroundColor: 'whitesmoke',
                    '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <Grid container justifyContent={'center'} style={{display: 'flex', flexDirection: 'column',}}>
                    <Grid className={s.grid1} item style={{alignSelf: 'flex-start', marginBottom: '10%'}}>
                        <Typography variant={'h6'}>
                            Learn: <span style={{color: colorBlueMI}}>{namePack}</span>
                        </Typography>
                    </Grid>
                    <Grid item sx={{marginBottom: '10px'}}>

                        <Typography variant={'body1'} component={'div'}>
                            Question: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, eaque!</>

                        </Typography>
                        <Typography variant={'body1'} component={'div'}>
                            Answer:<>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at dolore
                            dolorum fuga impedit ipsam maiores perspiciatis, porro quas ut? Aperiam eaque eligendi hic
                            ipsa iure magnam neque perspiciatis? Quidem!
                        </>
                        </Typography>
                    </Grid>
                    <Grid item justifyContent={'center'} sx={{minHeight: '30%'}}>
                        <form onSubmit={handleSubmit}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Rate yourself</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value}
                                            onChange={(e) => setValue(e.currentTarget.value)}
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
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                    marginTop: '2%',
                                }}>
                                <Button
                                    sx={{
                                        marginTop: '30%',
                                        height: 20,
                                        width: 90,
                                        borderRadius: 10,
                                        fontSize: '0.5rem',
                                    }}
                                    size={'small'}
                                    type={'button'} variant={'contained'} color={'primary'}
                                >
                                    <NavLink to={PATH.PACKS_CARDS}
                                             style={{color: 'inherit', textDecoration: 'none'}}>
                                        Cancel
                                    </NavLink>
                                </Button>
                                <Button
                                    sx={{
                                        marginTop: '30%',
                                        marginLeft: '10%',
                                        height: 20,
                                        width: 90,
                                        borderRadius: 10,
                                        fontSize: '0.5rem',
                                    }}
                                    size={'small'}
                                    type={'submit'} variant={'contained'} color={'primary'}>
                                    Next
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

