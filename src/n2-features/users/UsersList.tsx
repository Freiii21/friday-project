import {useEffect} from 'react';
import {usersAPI} from '../../n1-main/m2-bll/api/users_api';

export const UsersList = () => {
  useEffect(()=>{
    usersAPI.getUsers({pageCount:1000}).then((res)=>{
      console.log(res)
    })
  },[])
  return(<>
    List Users
  </>)
}