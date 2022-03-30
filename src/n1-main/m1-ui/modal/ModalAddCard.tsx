import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {Input, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';
import {NavLink} from 'react-router-dom';
import {colorBlueMI} from '../utilities/for css';
import {addNewPackTC, changeNamePackTC, deletePackT} from '../../m2-bll/reducers/packsReducer';
import {addNewCardTC, deleteCardTC, setCurrentCard, setIsGet, updateCardTC} from '../../m2-bll/reducers/cardReducer';
import {getCard} from '../utilities/getCard';
import LinearIndeterminate from '../common/Preloader/unused/LinearMI';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
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


export default function ModalAddCard({
                                         title,
                                         open,
                                         setOpen,
                                         titleOfPage,
                                         type,
                                         id,
                                         nameOfCell,
                                         questionText,
                                         answerText,
                                     }: PropsType) {
    const dispatch = useDispatch();
    const questionForLearn = useTypedSelector(state => state.cards.currentCard.question);
    const cardsTotalCount = useTypedSelector(state => state.cards.data.cardsTotalCount);
    const status = useTypedSelector(state => state.app.status);
    // const handleClose = () => setOpen(false);


    const [question, setQuestion] = useState<string | undefined>(questionText)
    const [answer, setAnswer] = useState<string | undefined>(answerText)
    const [nameNewPack, setNameNewPack] = useState<string | undefined>(nameOfCell)

    const cardsPack_id = useTypedSelector(state => state.cards.getData.cardsPack_id)
    const _id = id;


    const addOnClickHandler = () => {

        dispatch(addNewCardTC({'card': {cardsPack_id, question, answer}}))

    }
    const onClickCancelHandler = () => {
        setQuestion('')
        setAnswer('')
        setOpen(false)
    }

    const onChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion(e.currentTarget.value)
    }

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: '20px'}}>
                        {title}
                    </Typography>
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
                    </>
                    <Grid container sx={{marginTop: 4}}>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <Button size={'small'} variant={'contained'}
                                    onClick={onClickCancelHandler}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>

                            {type === 'input' &&

                            <Button size={'small'} variant={'contained'} color={'primary'}
                                    onClick={addOnClickHandler}>{'save'}</Button>}

                        </Grid>

                    </Grid>

                </Box>

            </Modal>
        </div>
    );
}

