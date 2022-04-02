import {Box, Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import img_log from './img/jester1.png';
import React from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import {colorBlueMI, fontSizeButtonAuth, widthLogo} from '../../../n1-main/m1-ui/utilities/for css';
import ModalForProfile from '../../../n1-main/m1-ui/modal/ModalForProfile';

export const ProfileMI = () => {
//for modal
    const [open, setOpen] = React.useState(false);

    const user = useTypedSelector(state => state.auth.user);
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const registerData = DateTime.fromISO(user.created).toFormat('DDD');

    const styleSpan = {color: colorBlueMI, fontSize: '0.9rem',marginBottom:'2%'};
    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
            marginTop: 5,
        }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent:'space-around',
                    border: '2px solid lightgrey',
                    borderRadius: 3,
                    width: 350,
                    height: '90%',
                    overflow: 'auto',
                    backgroundColor: 'whitesmoke',
                    '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}
                      sx={{margin: 'auto'}}>
                    <Grid item>
                        {user.avatar
                            ? <img src={user.avatar} style={widthLogo} alt="AVATAR"/>
                            : <img src={img_log} style={widthLogo} alt={'logo'}/>
                        }

                    </Grid>
                    <Grid item
                          sx={{
                              margin: '15% 0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              flexDirection: 'column',
                              fontSize: '0.8rem',
                              padding: '0 10px',
                              lineHeight: '1.3rem',

                          }}
                    >
                        <span><span style={styleSpan}>Email: </span> {user.email}</span>
                        <span><span style={styleSpan}>Name: </span>{user.name}</span>
                        <span><span style={styleSpan}>Cards count: </span>{user.publicCardPacksCount}</span>
                        <span><span style={styleSpan}>Registration: </span>{registerData}</span>
                    </Grid>
                        <Button onClick={()=>setOpen(!open)} size={'small'} variant={'contained'}
                                style={fontSizeButtonAuth}> CHANGE AVATAR OR NAME </Button>

                </Grid>
            </Box>
            <ModalForProfile open={open} setOpen={setOpen}/>
        </div>
    )
}