import s from './PasswordRecovery.module.css'
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {passwordRecoveryTC} from '../../../n1-main/m2-bll/reducers/authReducer';


type ValidateType = {
    email?: string

}


export const PasswordRecovery = () => {

    let message = `<div style="background-color: lime; padding: 15px">
                             password recovery link: 
                        <a href='http://localhost:3000/friday-project#/creatingNewPassword/$token$'>
                     link for password recovery </a>
                  </div>`

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            message: message,
        },
        validate: (values) => {
            const errors: ValidateType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {

            dispatch(passwordRecoveryTC(values))
            formik.resetForm()
        },
    });
    return (
        <div className={s.main_block}>
            <div className={s.container}>
                <h3>Forgot you password ?</h3>
                <div className={s.form_block}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={s.form__group}>
                            <input
                                className={s.form__field}
                                placeholder="email"
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                            />
                            <label className={s.form__label} htmlFor="email">Email</label>
                            {formik.touched.email && formik.errors.email ? (
                                <div className={s.text_error}>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className={s.text_about_form}> <span>Enter your email address and we will
                    send you further instruction </span></div>
                        <button className={s.btn_form} type="submit">Submit</button>
                    </form>
                </div>

            </div>

        </div>
    )
}


