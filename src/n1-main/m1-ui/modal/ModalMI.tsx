import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {Input} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';
import {NavLink} from 'react-router-dom';
import {colorBlueMI} from '../utilities/for css';
import {addNewPackTC, changeNamePackTC, deletePackT} from '../../m2-bll/reducers/packsReducer';
import {addNewCardTC, deleteCardTC, setCurrentCard, setIsGet, updateCardTC} from '../../m2-bll/reducers/cardReducer';
import {getCard} from '../utilities/getCard';
import {styleForWidthModal} from '../utilities/styleForWidthModal';
import {CircleProgressForModal} from './componentsForModals/CircleProgressForModal';


const useStyles = styleForWidthModal;
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type PropsType = {
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    type: string;
    id?: string;
    titleOfPage?: string;
    nameOfCell?: string;
    questionText?: string;
    answerText?: string;
}


export default function ModalMi({
                                    title, open, setOpen, titleOfPage, type,
                                    id, nameOfCell, questionText, answerText,

                                }: PropsType) {
    const dispatch = useDispatch();
    //data from current learning card
    const questionForLearn = useTypedSelector(state => state.cards.currentCard.question);
    const questionImg = useTypedSelector(state => state.cards.currentCard.questionImg);
    const cardsTotalCount = useTypedSelector(state => state.cards.data.cardsTotalCount);
    const status = useTypedSelector(state => state.app.status);
    // const handleClose = () => setOpen(false);

    const cards = useTypedSelector(state => state.cards.cardsForLearn);
    const isGet = useTypedSelector(state => state.cards.isGet);
    const idCurrenCard = useTypedSelector(state => state.cards.currentCard._id);

    useEffect(() => {
        if (isGet) {
            const card = getCard(cards);
            dispatch(setCurrentCard(card));
        }

    }, [cards])

    const [question, setQuestion] = useState<string | undefined>(questionText)
    const [answer, setAnswer] = useState<string | undefined>(answerText)
    const [nameNewPack, setNameNewPack] = useState<string | undefined>(nameOfCell)

    const cardsPack_id = useTypedSelector(state => state.cards.getData.cardsPack_id)
    const _id = id;

    const deletePackHandler = () => {
        if (titleOfPage === 'Pack') {
            id && dispatch(deletePackT(id))
        }
        if (titleOfPage === 'Card') {
            id && dispatch(deleteCardTC(id))
        }
        setQuestion('')
        setAnswer('')
        setOpen(false)
    }
    const addOnClickHandler = () => {
        if (title === 'Add card') {
            dispatch(addNewCardTC({'card': {cardsPack_id, question, answer}}))
        }
        if (title === 'Add Pack') {
            nameNewPack && dispatch(addNewPackTC({cardsPack: {name: nameNewPack}}))
        }
        if (title === 'Edit name') {
            dispatch(changeNamePackTC({
                cardsPack: {
                    _id: _id || '',
                    name: nameNewPack
                }
            }))
        }
        if (title === 'Update card') {
            _id && dispatch(updateCardTC({card: {_id, question, answer}}))
        }
        setQuestion('')
        setAnswer('')
        setOpen(false)
    }
    const onClickCancelHandler = () => {
        setQuestion('')
        setAnswer('')
        setOpen(false)
    }

    /* const onChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         setAnswer(e.currentTarget.value)
     }
     const onChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         setQuestion(e.currentTarget.value)
     }*/
    const onClickShowAnswer = () => dispatch(setIsGet(false));
    const classes = useStyles();
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={classes.box}>

                    {status === 'loading' && < CircleProgressForModal/>}

                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: '20px'}}>
                        {title === 'Learn'
                            ? <><span>{title}:</span> <span style={{color: colorBlueMI}}>{nameOfCell}</span></>
                            : title}
                    </Typography>
                    {type === 'delete' &&
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {titleOfPage === 'Pack' && <>Do you really want to remove {nameOfCell}? All cards will
                            be excluded from this course.</>}
                        {titleOfPage === 'Card' && <>Do you really want to remove {nameOfCell}?</>}
                    </Typography>}
                    {type === 'learn' &&
                    <Grid container xs={12}>
                        {questionImg &&
                        <Grid item xs={4} justifyContent={'center'} alignItems={'center'}>
                            <span><img src={questionImg} style={{width: '90%'}} alt={'img for question'}/></span>
                        </Grid>
                        }
                        <Grid item xs={questionImg ? 8 : 12}>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Question: <span style={{color: colorBlueMI}}>
                                {status === 'loading' ? '' : questionForLearn}
                            </span>
                            </Typography>
                        </Grid>
                    </Grid>

                    }
                    {((type === 'input' && title === 'Edit name') || (type === 'input' && title === 'Add Pack')) &&
                    <Input fullWidth={true}
                           size={'small'}
                           value={nameNewPack}
                           type={'text'}
                           onChange={(e) => {
                               setNameNewPack(e.currentTarget.value)
                           }}
                           style={{marginTop: '10px', minHeight: '10px'}}
                    />}
                    {/* {type === 'input' && titleOfPage === 'Card' &&
                    <>
                        <TextField fullWidth={true} variant={'standard'}
                                   sx={{marginBottom: '5px'}} maxRows={2} multiline
                                   placeholder={'question'} onChange={onChangeHandlerQuestion}
                                   value={question}
                        />
                        <TextField fullWidth={true} variant={'standard'}
                                   sx={{marginBottom: '20px'}} maxRows={4} multiline
                                   placeholder={'answer'} onChange={onChangeHandlerAnswer}
                                   value={answer}
                        />
                    </>}*/}
                    <Grid container sx={{marginTop: 4}}>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <Button size={'small'} variant={'contained'}
                                    onClick={onClickCancelHandler}
                                    disabled={status === 'loading'}
                            >Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            {type === 'delete' &&
                            <Button size={'small'} variant={'contained'} color={'secondary'}
                                    onClick={deletePackHandler}>{type}</Button>}
                            {type === 'input' &&

                            <Button size={'small'} variant={'contained'} color={'primary'}
                                    onClick={addOnClickHandler}>{'save'}</Button>}
                            {type === 'learn' &&
                            nameOfCell === 'hardCord' ?
                                <Button size={'small'} variant={'contained'}
                                        color={'primary'} disabled={!cardsTotalCount || status === 'loading'}
                                        onClick={() => setOpen(false)}
                                >
                                    answer
                                </Button>
                                : type === 'learn' && <Button size={'small'} variant={'contained'}
                                                              color={'primary'}
                                                              disabled={!cardsTotalCount || status === 'loading'}
                            >
                                <NavLink to={`/card/${id}/${nameOfCell}/${idCurrenCard}`}
                                         style={{
                                             textDecoration: 'none',
                                             color: cardsTotalCount ? 'white' : 'black'
                                         }}
                                         onClick={onClickShowAnswer}
                                >Answer </NavLink>
                            </Button>

                            }
                        </Grid>

                    </Grid>

                </Box>

            </Modal>
        </div>
    );
}

