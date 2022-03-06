import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox';
import s from './TestPage.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {getPingT} from '../../n1-main/m2-bll/testReducer';
import {AppRootStateType} from '../../n1-main/m2-bll/store';
import {ResponsePingType} from '../../n1-main/m2-bll/app/app';

export const TestPage = () => {
   const dispatch=useDispatch();
   const dataPing=useSelector<AppRootStateType,ResponsePingType>(state => state.test.data)
   const handleBut = () => {
     dispatch(getPingT());
   }
   if(!dataPing) return <div>preloader</div>
    return (
        <div className={s.common}>
            <SuperInputText placeholder={"Super input"}
                            style={{backgroundColor:'white',
                                height:'30px',
                                marginRight:'10px'
            }}/>
            <SuperButton
                onClick={handleBut}
                style={{width:'120px',
                backgroundColor:'green',marginRight:'10px'
            }}>Super button</SuperButton>
            <SuperCheckbox/>
            {dataPing&&<div>
                <p>ping: {dataPing.ping}</p>
                <p>backTime: {dataPing.backTime}</p>
                <p>info: {dataPing.info}</p>
            </div>}
        </div>
    )
}