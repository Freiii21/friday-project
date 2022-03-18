import {Box, Button, Input, TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import img_log from './img/jester1.png';
import React, {ChangeEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import {widthLogo} from '../../../n1-main/m1-ui/utilities/for css';
import {setNewNameAvatarTC} from '../../../n1-main/m2-bll/reducers/authReducer';
import {useDispatch} from 'react-redux';
import {BlankDiv} from '../../../n1-main/m1-ui/common/BlankDiv';

export const ProfileMI = () => {
    const user = useTypedSelector(state => state.auth.user)
    const isAuth = useTypedSelector(state => state.auth.isAuth)
    const registerData = DateTime.fromISO(user.created).toFormat('DDD')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const setAvatar = () => {
        dispatch(setNewNameAvatarTC({avatar: photo, name}))
        setPhoto('');
        setName('');
    }

    const setNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const setPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.currentTarget.value)
    }

    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
        }}>
            <Box
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
                              marginTop: '15px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              flexDirection: 'column',
                              fontSize: '0.8rem',
                              padding: '0 20px',
                              lineHeight: '1.3rem',

                          }}
                    >
                        <span>Email: {user.email}</span>
                        <span>NickName: {user.name}</span>
                        <span>Card count: {user.publicCardPacksCount}</span>
                        <span>Date of registration: {registerData}</span>
                        <div>
                            <TextField size={'small'}
                                       placeholder={'http://...'}
                                       type={'text'}
                                       variant={'filled'}
                                       onChange={setPhotos}
                                       value={photo}
                                       style={{marginTop: '10px'}}

                            />
                            <BlankDiv/>
                            <TextField size={'small'}
                                       placeholder={'New name'}
                                       type={'text'}
                                       variant={'filled'}
                                       onChange={setNickName}
                                       value={name}
                            />
                        </div>

                        <Button onClick={setAvatar} size={'small'}
                                style={{fontSize: '0.7rem', marginTop: '10px'}}> CHANGE AVATAR OR NAME </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}