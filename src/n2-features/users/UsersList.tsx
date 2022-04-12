import {useEffect, useState} from 'react';
import {User2Type, usersAPI} from '../../n1-main/m2-bll/api/users_api';
import {useDispatch} from 'react-redux';
import {getUsers} from '../../n1-main/m2-bll/reducers/usersReducer';
import {useTypedSelector} from '../../n1-main/m2-bll/redux';


export const UsersList = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<User2Type | null>(null)
    const users = useTypedSelector(state => state.users.users);
    useEffect(() => {
        dispatch(getUsers());

    }, []);

    console.log(user)
    return (
        <>

            {users.map(x => <div>{x.name}<span><img src={x.avatar} width={50} alt="avatar"/></span></div>)}
        </>)
}