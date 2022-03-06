import o from './Login.module.css';
import {AddFormLogin} from './AddFormLogin';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setRegistered} from '../../../n1-main/m2-bll/authReducer';

export const Login = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setRegistered(false))
    },[])

    return (
        <div className={o.wrapper}>
                <AddFormLogin/>
        </div>
    )
}
