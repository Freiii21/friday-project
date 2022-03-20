import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, {useState} from 'react';
import {useTypedSelector} from '../../../m2-bll/redux';
import {useDispatch} from 'react-redux';
import {getPacksCards} from '../../../m2-bll/reducers/packsReducer';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {colorBlueMI} from '../../utilities/for css';

type PropsType = {
    nameCell: string;

}
export const ButtonForTablePacks = ({nameCell}: PropsType) => {
    const packs = useTypedSelector(state => state.packs.data.cardPacks);
    const dispatch = useDispatch();
    const [arrow, setArrow] = useState(true);

    const cardPacksTotalCount = useTypedSelector(state => state.packs.data.cardPacksTotalCount);
    const numberPages = Math.floor(cardPacksTotalCount / 10) + (cardPacksTotalCount % 10);
    let onClick = () => {
        if (arrow) {
            dispatch(getPacksCards({sortPacks: '0' + nameCell, pageCount: numberPages}));
            setArrow(!arrow);
        } else {
            dispatch(getPacksCards({sortPacks: '1' + nameCell, pageCount: numberPages}));
            setArrow(!arrow);
        }

    };
    return (
        <button
            style={{
                width: '27px',
                color: colorBlueMI,
                border: 'none',
                position: 'relative',
                top: '5px',
            }}
            onClick={onClick}
        >{
            arrow ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
        }


        </button>
    )
}