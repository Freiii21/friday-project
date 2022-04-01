import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Box, Input, InputLabel} from '@mui/material';
import {Navigate, NavLink} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {passwordRecoveryTC} from '../../../n1-main/m2-bll/reducers/authReducer';
import {fontSizeButtonAuth, redStyle, wrapper} from '../../../n1-main/m1-ui/utilities/for css';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';


export const PasswordRecoveryMI = () => {
    const dispatch = useDispatch();
    const isSent = useTypedSelector(state => state.app.isSent);
    let message = `<div style="background-color: lime; padding: 15px">
                             password recovery link: 
                        <a href='http://localhost:3000/friday-project#/creatingNewPassword/$token$'>
                     link for password recovery </a>
                  </div>`
    const formik = useFormik({
        initialValues: {
            email: '',
            message: message,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            dispatch(passwordRecoveryTC(values));
            formik.resetForm();
        },
    });
    if (isSent) return <Navigate to={PATH.CHECK_EMAIL}/>
    return (
        <div style={wrapper}>
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
                    height: '90%',
                    overflow: 'auto',
                    backgroundColor: 'whitesmoke',
                    '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <Grid container justifyContent={'center'} alignContent={'center'} sx={{margin: 'auto'}}>
                    <form onSubmit={formik.handleSubmit}>

                        <FormLabel>
                            <h2 style={{marginBottom: '30%'}}>Forgot you password?</h2>
                        </FormLabel>

                        <FormControl>
                            <InputLabel htmlFor="password">Email</InputLabel>
                            <Input
                                id={'email'}
                                type={'text'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email
                                ? <div style={redStyle}>{formik.errors.email}</div>
                                : null}
                            <FormLabel>
                                <p style={{fontSize: '0.8rem', margin: '20% 0 '}}>
                                    Enter your email address
                                    and
                                    we will send you further instructions
                                </p>
                            </FormLabel>
                            <Grid container xs={12} justifyContent={'center'}>
                                <Button
                                    style={fontSizeButtonAuth}
                                    sx={{
                                        height: '20%',
                                        width: '100%',
                                        borderRadius: 10,

                                    }}
                                    type={'submit'} variant={'contained'} color={'primary'}>
                                    Send instructions
                                </Button>
                            </Grid>
                        </FormControl>

                    </form>
                    <Grid item
                          sx={{
                              marginTop: '20%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',

                          }}
                    >
                        <div style={{fontSize: '0.7rem'}}>Did you remember your password?</div>
                        <div><NavLink
                            style={{textDecoration: 'none', fontSize: '0.8rem'}}
                            to={PATH.LOGIN}
                        >Try to logging in
                        </NavLink></div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
