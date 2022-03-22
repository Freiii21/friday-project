import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {Input, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {deletePackT} from '../../m2-bll/reducers/packsReducer';
import {ChangeEvent, useState} from "react";
import {addNewCardTC, deleteCardTC, updateCardTC} from "../../m2-bll/reducers/cardReducer";
import {useTypedSelector} from "../../m2-bll/redux";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,

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


}
export default function ModalMi({
                                    title,
                                    open,
                                    setOpen,
                                    titleOfPage,
                                    type,
                                    id,
                                    nameOfCell,
                                }: PropsType) {
    const dispatch = useDispatch();

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const cardsPack_id = useTypedSelector(state => state.cards.data.cards[0].cardsPack_id)

    const _id = id
    const comments = answer

    const deletePackHandler = () => {
        if (titleOfPage === "Pack") {
            id && dispatch(deletePackT(id))
        }
        if (titleOfPage === "Card") {
            id && dispatch(deleteCardTC(id))
        }
        setQuestion("")
        setAnswer("")
        setOpen(false)
    }
    const addOnClickHandler = () => {
        if (title === 'Add card') {
            dispatch(addNewCardTC({"card": {cardsPack_id, question, answer}}))
        }
        if (title === 'Update card' ) {
            _id  && dispatch(updateCardTC({"card": {_id, question, comments}}))
            console.log( _id)
        }
        setQuestion("")
        setAnswer("")
        setOpen(false)
    }
    const onClickCancelHandler = () => {
        setQuestion("")
        setAnswer("")
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
                    {type === 'delete' &&
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {titleOfPage === 'Pack' && <>Do you really want to remove {nameOfCell}? All cards will
                            be excluded from this course.</>}
                        {titleOfPage === 'Card' && <>Do you really want to remove {nameOfCell}?</>}
                    </Typography>}

                    {type === 'input' && titleOfPage === 'Pack' &&
                    <Input size={'small'}
                           placeholder={'Name'}
                           type={'text'}
                           onChange={() => {
                           }}
                           style={{marginTop: '10px', minHeight: '10px'}}
                    />}
                    {type == 'input' && titleOfPage === 'Card' &&
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
                    </>}
                    <Grid container sx={{marginTop: 4}}>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <Button size={'small'} variant={'contained'} onClick={onClickCancelHandler}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            {type === 'delete' &&
                            <Button size={'small'} variant={'contained'} color={'secondary'}
                                    onClick={deletePackHandler}>{type}</Button>}
                            {type === 'input' &&
                            <Button
                                size={'small'}
                                variant={'contained'}
                                color={'primary'}
                                onClick={addOnClickHandler}
                            >{'save'}</Button>}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
