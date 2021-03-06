import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Box, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Navigate, useParams} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {createNewPassword} from '../../../n1-main/m2-bll/reducers/authReducer';
import {fontSizeButtonAuth, redStyle, wrapper} from '../../../n1-main/m1-ui/utilities/for css';


export const CreatingNewPassword = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState<{ showPassword: boolean }>({
        showPassword: false,
    });

    const {token} = useParams();

    const handleClickShowPassword = () => {
        setValues({
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: token,
        },
        validationSchema: Yup.object({

            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
        }),
        onSubmit: values => {
            values && dispatch(createNewPassword(values));
            formik.resetForm();
        },
    });
    if (token === ':token') return <Navigate to={PATH.PASSWORD_RECOVERY}/>
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
                <Grid container justifyContent={'center'} sx={{margin: 'auto'}}>
                    <Grid item justifyContent={'center'}>
                        <form onSubmit={formik.handleSubmit}>

                            <FormLabel>
                                <h2 style={{marginBottom: '30%'}}>Create New Password</h2>
                            </FormLabel>

                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    {...formik.getFieldProps('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                                {formik.touched.password && formik.errors.password &&
                                <div style={redStyle}>{formik.errors.password}</div>}
                                <FormLabel><p style={{fontSize: '0.8rem', marginTop: '20%'}}>Create new password and we
                                    will
                                    send you further instructions to email</p></FormLabel>
                                <Button
                                    style={fontSizeButtonAuth}
                                    sx={{
                                        marginTop: '30%',
                                        marginLeft: '10%',
                                        height: '20%',
                                        width: '100%',
                                        borderRadius: 10,
                                        fontSize: '0.5rem',
                                    }}
                                    type={'submit'} variant={'contained'} color={'primary'}>
                                    Create New Password
                                </Button>
                            </FormControl>

                        </form>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
