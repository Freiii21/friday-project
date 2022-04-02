import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch} from 'react-redux';
import {getCardsForLearn, setIsGet} from '../../../m2-bll/reducers/cardReducer';
import ModalMi from '../../modal/ModalMI';
import {useTypedSelector} from '../../../m2-bll/redux';


type PropsType = {
    userId: boolean;
    name_1?: string;
    name_2: string;
    name_3: string;
    color?: boolean;
    titleOfPage: string;
    nameOfCell: string;
    id: string;
    nameOfPack?: string;
    questionText?: string;
    answerText?: string;
    setTitleForUpdate?: (t: string) => void;
    setOpenForModal?: (b: boolean) => void;
    setQuestion?: (s: string) => void;
    setAnswer?: (s: string) => void;
}

const fontSize = {fontSize: '0.6rem'}
export default function BasicButtonGroup(
    {
        userId, name_1, name_2, name_3,
        color, titleOfPage, nameOfCell, id,
        questionText, answerText, setOpenForModal, setTitleForUpdate,
        setAnswer, setQuestion,
    }: PropsType) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [typeModel, setTypeModel] = useState('');
    const dispatch = useDispatch();
    const status = useTypedSelector(state => state.app.status);
    const idPack = id;

    let onClickButDel = () => {
        setOpen(true);
        setTitle(`Delete ${titleOfPage}`);
        setTypeModel('delete');
    };
    const onClickButLearn = async () => {

        dispatch(setIsGet(true));
        await dispatch(getCardsForLearn(idPack, nameOfCell));
        setTitle(`Learn`);
        setTypeModel('learn');
        setOpen(true);

    };
    const onClickButEdit = () => {
        setOpen(true);
        setTitle('Edit name');
        setTypeModel('input');
    };
    const onClickButUpdate = () => {

        setOpenForModal && setOpenForModal(true);
        setTitleForUpdate && setTitleForUpdate('Update card');
        answerText && setAnswer && setAnswer(answerText);
        questionText && setQuestion && setQuestion(questionText);
    }

    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group"
                         size={'small'} disabled={status === 'loading'}>
                {userId && <Button style={fontSize}
                                   color={'secondary'}
                                   onClick={onClickButDel}

                >
                    {name_1}
                </Button>}
                <Button style={fontSize} color={color ? 'secondary' : 'primary'}
                        onClick={color ? onClickButDel : onClickButEdit}>
                    {name_2}
                </Button>
                <Button style={fontSize}
                        onClick={name_3 === 'Learn' ? onClickButLearn : onClickButUpdate}>{name_3}</Button>

            </ButtonGroup>
            <ModalMi
                title={title} open={open}
                setOpen={setOpen} titleOfPage={titleOfPage}
                type={typeModel} id={id}
                nameOfCell={nameOfCell}
                questionText={questionText}
                answerText={answerText}
            />


        </>
    );
}