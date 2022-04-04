import * as React from 'react';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';
import {addNewCardTC} from '../../m2-bll/reducers/cardReducer';
import {styleForWidthModal} from '../utilities/styleForWidthModal';
import Input from '@mui/material/Input';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type PropsType = {
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    answ?: string;
    ques?: string;
}


export default function ModalAddOrUpdateCard({title, open, setOpen, answ, ques}: PropsType) {
    const dispatch = useDispatch();
    const status = useTypedSelector(state => state.app.status);


    const [question, setQuestion] = useState<string | undefined>('');
    const [answer, setAnswer] = useState<string | undefined>('');
    useEffect(() => {
        setQuestion(ques);
        setAnswer(answ)
    }, [answ, ques])

    type Base64Type = string | ArrayBuffer | null;
    const [fileBase64Answer, setBase64Answer] = useState<Base64Type>(null);
    const [fileBase64Qeu, setBase64Que] = useState<Base64Type>(null);

    const cardsPack_id = useTypedSelector(state => state.cards.getData.cardsPack_id)
    const inRef = useRef<HTMLInputElement>(null);
    // for breakpoints
    const useStyles = styleForWidthModal;
    const classes = useStyles();
    const addOnClickHandler = () => {

        dispatch(addNewCardTC({
            'card': {
                cardsPack_id,
                answerImg: fileBase64Answer,
                questionImg: fileBase64Qeu,
                question,
                answer
            }
        }))
        setOpen(false);
        setBase64Answer(null);
        setQuestion('');
        setAnswer('');
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
    const createBase64Url = (e: ChangeEvent<HTMLInputElement>, setBase64: (v: Base64Type) => void) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            reader.onloadend = () => {
                const res = reader.result
                setBase64(res);
            }
            reader.readAsDataURL(newFile);
        }
    }
    const onChangeAddFileAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        createBase64Url(e, setBase64Answer)
    }
    const onChangeAddFileQues = (e: ChangeEvent<HTMLInputElement>) => {
        createBase64Url(e, setBase64Que)
    }
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.box} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom: '20px'}}>
                        {title}
                    </Typography>
                    <Grid container direction={'row'}>
                        <Grid item xs={12}>
                            <Input fullWidth={true}
                                   sx={{marginBottom: '5px'}} maxRows={2} multiline
                                   onChange={onChangeHandlerQuestion}
                                   value={question}
                            />
                            <input
                                onChange={onChangeAddFileQues}
                                type={'file'}
                                ref={inRef}
                            />
                            <TextField fullWidth={true} variant={'standard'}
                                       maxRows={4} multiline
                                       onChange={onChangeHandlerAnswer}
                                       value={answer}
                            />
                            <input
                                onChange={onChangeAddFileAnswer}
                                type={'file'}
                                ref={inRef}
                            />
                        </Grid>
                    </Grid>

                    <Grid container sx={{marginTop: 4}} xs={12}>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <Button size={'small'} variant={'contained'}
                                    onClick={onClickCancelHandler}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>

                            <Button size={'small'} variant={'contained'} color={'primary'}
                                    onClick={addOnClickHandler}>{'save'}</Button>

                        </Grid>

                    </Grid>

                </Box>

            </Modal>
        </div>
    );
}

