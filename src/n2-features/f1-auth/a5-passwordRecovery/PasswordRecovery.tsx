import s from './PasswordRecovery.module.css'
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {passwordRecoveryTC} from "../../../n1-main/m2-bll/authReducer";

export const PasswordRecovery = () => {

    let message = `<div style="background-color: lime; padding: 15px">
                             password recovery link: 
                        <a href='http://localhost:3000/friday-project#/creatingNewPassword/$token$'>
                     link</a>
                  </div>`
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            message:message,
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(passwordRecoveryTC(values))
        },
    });
    return (
        <div className={s.main_block}>
            <div className={s.container}>
                <h3>Forgot you password</h3>
                <div className={s.form_block}>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        <button className={s.btn_form} type="submit">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}


