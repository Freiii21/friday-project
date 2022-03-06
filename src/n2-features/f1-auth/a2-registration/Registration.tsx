import s from './Registration.module.css'

export const Registration = () => {
    return (
        <div className={s.common}>
            <div className={s.regWindow}>
                <div className={s.text}>
                    <span>It-incubator</span>
                </div>
                <div className={s.text2}>
                    <span>Sign Up</span>
                </div>
                <div>
                    <input type="email" placeholder="Enter email"/>
                </div>
                <div>
                    <input type="password" placeholder="Enter password"/>
                </div>
                <div>
                    <input type="password" placeholder="Confirm password"/>
                </div>
                <div>
                    <button>Register</button>
                </div>
            </div>
        </div>
    )
}