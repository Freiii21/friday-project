import * as React from 'react';
import {ChangeEvent, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {Input, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';
import {addNewCardTC} from '../../m2-bll/reducers/cardReducer';

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

    const [file, setFile] = useState<File>();
    const [fileURL, setFileURL] = useState<any>('');
    const [fileData, setFileData] = useState<FormData>();

    const cardsPack_id = useTypedSelector(state => state.cards.getData.cardsPack_id)
    const _id = id;
    const inRef = useRef<HTMLInputElement>(null);

    const addOnClickHandler = () => {

        dispatch(addNewCardTC({'card': {cardsPack_id, answerImg: fileURL, question, answer}}))

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
    const onChangeAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        let reader = new FileReader();

            reader.onloadend=() => {
                const res = reader.result
                setFileURL(res);
                debugger
            }

        e.target.files&&reader.readAsDataURL(e.target.files[0])
       /* e.target.files && reader.readAsDataURL(e.target.files[0])
        reader.result*/
        debugger
       /* const formData = new FormData();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);
        }*/
    }

    debugger
    console.log(file)
    console.log(fileURL)
    console.log(fileData)
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
                    <Grid container direction={'row'}>
                        <Grid item xs={8}>
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
                        </Grid>
                        <Grid item xs={4} sx={{border: '1px solid black'}}>
                            <TextField
                                onChange={onChangeAddFile}
                                type={'file'}
                                ref={inRef}

                            />
                        </Grid>
                    </Grid>

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

