import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';

export const Profile = () => {
    const isAuth=useSelector<AppRootStateType,boolean>(state => state.auth.isAuth);
    if(!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <div>
            Profile page
        </div>
    )
}