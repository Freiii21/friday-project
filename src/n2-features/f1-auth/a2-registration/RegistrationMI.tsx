import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {Navigate, NavLink} from 'react-router-dom';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import * as Yup from 'yup';
import {Box, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {fontSizeButtonAuth, redStyle, wrapper} from '../../../n1-main/m1-ui/utilities/for css';
import {BlankDiv} from '../../../n1-main/m1-ui/common/ComponentsForTabels/BlankDiv';
import {setRegistered, setRegisteredT} from '../../../n1-main/m2-bll/reducers/authReducer';

type State = {
    password: string;
    showPassword: boolean;
    email: string;
}
export const RegistrationMI = () => {
    const dispatch = useDispatch();
    const isRegistered = useTypedSelector(state => state.auth.isRegistered);
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
        email: '',
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Require'),

        }),
        onSubmit: values => {
            dispatch(setRegisteredT({email: values.email, password: values.password}));
            formik.resetForm();
        },
    });
    {
        if (isAuth) return <Navigate to={PATH.LOGIN}/>
    }
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
                    overflow:'auto',
                    backgroundColor: 'whitesmoke',
                    '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <Grid container justifyContent={'center'} sx={{margin:'auto'}} >
                    <Grid item justifyContent={'center'}>
                        <form onSubmit={formik.handleSubmit}>

                            <FormLabel>
                                <h2 style={{marginBottom: '30%', textAlign: 'center'}}>Sign Up</h2>
                            </FormLabel>

                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id={'email'}
                                    type={'text'}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email
                                    ? <div style={redStyle}>{formik.errors.email}</div>
                                    : null}
                            </FormControl>

                            <BlankDiv/>

                            <FormControl size={'small'}>
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
                            </FormControl>

                            <BlankDiv/>

                            <FormControl>
                                <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                                <Input
                                    id="confirm_password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    name={'confirmPassword'}
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
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
                                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                <div style={redStyle}>{formik.errors.confirmPassword}</div>}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginTop: '90px',
                                    }}>
                                    <Button
                                        style={fontSizeButtonAuth}
                                        sx={{
                                            marginTop: '30%',
                                            height: '20%',
                                            width: '45%',
                                            borderRadius: 10,
                                        }}
                                        size={'small'}
                                        type={'button'} variant={'contained'} color={'primary'}
                                    >
                                        <NavLink to={PATH.LOGIN}
                                                 style={{color: 'inherit', textDecoration: 'none'}}>
                                            Cancel
                                        </NavLink>
                                    </Button>
                                    <Button
                                        style={fontSizeButtonAuth}
                                        sx={{
                                            marginTop: '30%',
                                            marginLeft: '10%',
                                            height: '20%',
                                            width: '50%',
                                            borderRadius: 10,
                                        }}
                                        size={'small'}
                                        type={'submit'} variant={'contained'} color={'primary'}>
                                        Register
                                    </Button>
                                </div>
                            </FormControl>

                        </form>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

