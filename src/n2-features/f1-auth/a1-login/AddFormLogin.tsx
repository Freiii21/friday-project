import {useFormik} from 'formik';
import * as Yup from 'yup';
import o from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {setLoginT} from '../../../n1-main/m2-bll/reducers/authReducer';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {Navigate} from 'react-router-dom';

export const AddFormLogin = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType, boolean>((state => state.auth.isAuth));
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(7, 'Must be 7 characters or more')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(setLoginT(values));
            formik.resetForm();
        },
    });
    if (isAuth) return <Navigate to={PATH.PROFILE}/>
    return (
        <div className={o.container_form}>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id={'email'}
                    type="text"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className={o.red}>{formik.errors.email}</div>
                ) : null}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="text"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={o.red}>{formik.errors.password}</div>
                ) : null}

                <div className={o.submit}>
                    <div>
                        <label htmlFor="rememberMe">Remember me</label>
                        <input
                            id="rememberMe"
                            type="checkbox"
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}