import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import img_log from './img/jester1.png';
import React from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {useDispatch} from 'react-redux';
import {setLogoutT} from '../../../n1-main/m2-bll/reducers/authReducer';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import {widthLogo} from '../../../n1-main/m1-ui/utilities/for css';

export const ProfileMI = () => {
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(setLogoutT())
    const user = useTypedSelector(state => state.auth.user)
    const isAuth = useTypedSelector(state => state.auth.isAuth)
    const registerData = DateTime.fromISO(user.created).toFormat('DDD')


    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
        }}><Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                padding: 5,
                border: '2px solid lightgrey',
                borderRadius: 3,
                width: 350,
                height: '80%',
                backgroundColor: 'whitesmoke',
                '&:hover': {
                    backgroundColor: 'white',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <h1 style={{marginBottom: '20px', textAlign: 'center'}}>Profile</h1>
                    {user.avatar
                        ? <img src={user.avatar} style={widthLogo} alt="AVATAR"/>
                        : <img src={img_log} style={widthLogo} alt={'logo'}/>
                    }

                </Grid>
                <Grid item
                      sx={{
                          marginTop: '70px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          fontSize: '0.8rem',
                          padding: '0 20px',
                          lineHeight: '1.3rem',
                      }}
                >
                    <span>Email: {user.email}</span>
                    <span>NickName: {user.email}</span>
                    <span>Card count: {user.publicCardPacksCount}</span>
                    <span>Date of registration: {registerData}</span>
                </Grid>
            </Grid>
        </Box>
        </div>
    )
}