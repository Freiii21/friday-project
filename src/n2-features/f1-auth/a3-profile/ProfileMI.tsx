import {Box, Button, Checkbox, Input} from '@mui/material';
import Grid from '@mui/material/Grid';
import img_log from './img/jester1.png';
import React, {ChangeEvent, useRef, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import {colorBlueMI, widthLogo} from '../../../n1-main/m1-ui/utilities/for css';
import {setNewNameAvatarTC} from '../../../n1-main/m2-bll/reducers/authReducer';
import {useDispatch} from 'react-redux';

export const ProfileMI = () => {
    //for modify in base 64
    const refInput = useRef<HTMLInputElement>(null);

    const user = useTypedSelector(state => state.auth.user);
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const registerData = DateTime.fromISO(user.created).toFormat('DDD');
    const [photo, setPhoto] = useState<string | ArrayBuffer | null>('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
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
    const styleSpan = {color: colorBlueMI, fontSize: '0.9rem'};
    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    const onChangeCheckBox = () => setChecked(!checked);
    const onChangeToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            reader.onloadend = () => {
                if (checked) {
                    setPhoto(reader.result)
                }
            }
            reader.readAsDataURL(newFile);
        }
    };
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
                    alignItems: 'center',
                    margin: 0,
                    padding: 0,
                    border: '2px solid lightgrey',
                    borderRadius: 3,
                    width: 400,
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
                              marginTop: '15px',
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
                        <div style={{marginBottom: '20%'}}>

                            <Grid container direction={'row'}>
                                <Grid item xs={2}>
                                    <Checkbox checked={checked} onChange={onChangeCheckBox}
                                              inputProps={{'aria-label': 'controlled'}}
                                              size={'small'}
                                              style={{
                                                  position: 'relative',
                                                  top: '10px',
                                                  left: '6px'
                                              }}/>
                                </Grid>
                                {checked ?
                                    <div style={{height: '10px', width: '10px', margin: '10px 0'}}>
                                        <input type={'file'} ref={refInput} onChange={onChangeToBase64}/>
                                    </div>
                                    : <Grid item xs={9.5}><Input size={'small'}
                                                                 placeholder={'http://...'}
                                                                 type={'text'}
                                                                 onChange={setPhotos}
                                                                 value={photo}
                                                                 style={{
                                                                     marginTop: '10px',
                                                                     minHeight: '10px',
                                                                     paddingLeft: '10px'
                                                                 }}

                                    /></Grid>
                                }
                            </Grid>

                            <div style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>change avatar</div>
                            <Input size={'small'}
                                   placeholder={'New name'}
                                   type={'text'}
                                   onChange={setNickName}
                                   value={name}
                                   style={{marginLeft: '22px'}}
                            />
                            <div style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>change name</div>
                        </div>

                        <Button onClick={setAvatar} size={'small'}
                                style={{fontSize: '0.7rem', marginTop: '10px'}}> CHANGE AVATAR OR NAME </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}