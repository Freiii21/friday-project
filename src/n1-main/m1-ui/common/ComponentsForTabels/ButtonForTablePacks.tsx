import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, {useState} from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {colorBlueMI} from '../../utilities/for css';
import {useTypedSelector} from '../../../m2-bll/redux';


type PropsType = {
    nameCell: string;
    handlerSetSortPacs?: (sortValue: string) => void;
    setNameCellOnClick: (n: string) => void;
    nameCellOnClick: string;
}
export const ButtonForTablePacks: React.FC<PropsType> =
    ({
         nameCell, handlerSetSortPacs,
         setNameCellOnClick, nameCellOnClick,
         children
     }) => {
        const [arrow, setArrow] = useState(true);
        const status = useTypedSelector(state => state.app.status);
        let onClickHandler = () => {
            setNameCellOnClick && setNameCellOnClick(nameCell);

            if (arrow) {
                handlerSetSortPacs && handlerSetSortPacs(`0${nameCell}`);
                setArrow(!arrow);
            } else {
                handlerSetSortPacs && handlerSetSortPacs(`1${nameCell}`);
                setArrow(!arrow);
            }


        };
        console.log('ButtonForTablePacks')
        return (
            <button
                style={{
                    width: '27px',
                    color: colorBlueMI,
                    border: 'none',
                    position: 'relative',
                    top: '5px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'row',
                }}
                disabled={status === 'loading'}
                onClick={onClickHandler}
            >
                <span>{children}</span>
                {
                    !(nameCellOnClick === nameCell) ? '' : arrow ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
                }


            </button>
        )
    }