import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox';
import s from './TestPage.module.css'

export const TestPage = () => {
    return (
        <div className={s.common}>
            <SuperInputText placeholder={"Super input"}
                            style={{backgroundColor:'white',
                                height:'30px',
                                marginRight:'10px'
            }}/>
            <SuperButton style={{width:'120px',
                backgroundColor:'green',marginRight:'10px'
            }}>Super button</SuperButton>
            <SuperCheckbox/>
        </div>
    )
}