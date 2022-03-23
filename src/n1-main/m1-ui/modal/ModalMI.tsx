import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import {Input, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {deletePackT} from '../../m2-bll/reducers/packsReducer';
import {useTypedSelector} from '../../m2-bll/redux';
import {Navigate, NavLink} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearIndeterminate from '../common/Preloader/unused/LinearMI';
import {PATH} from '../routes/RoutesComponent';

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
export default function ModalMi(
    {title, open, setOpen, titleOfPage, type, id, nameOfCell,}
        : PropsType) {
    const dispatch = useDispatch();
    const question = useTypedSelector(state => state.cards.cardsForLearn[0].question);
    const cardsTotalCount = useTypedSelector(state => state.cards.data.cardsTotalCount);
    const status = useTypedSelector(state => state.app.status);
    // const handleClose = () => setOpen(false);
    const deletePack = () => {
        id && dispatch(deletePackT(id));
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
                    {type === 'learn' &&
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Question: {question}
                    </Typography>
                    }
                    {type === 'input' && title === 'Edit name' &&
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
                                   placeholder={'question'}
                        />
                        <TextField fullWidth={true} variant={'standard'}
                                   sx={{marginBottom: '20px'}} maxRows={4} multiline
                                   placeholder={'answer'}
                        />
                    </>}
                    <Grid container sx={{marginTop: 4}}>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            <Button size={'small'} variant={'contained'} onClick={() => setOpen(false)}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'center'}}>
                            {type === 'delete' &&
                            <Button size={'small'} variant={'contained'} color={'secondary'}
                                    onClick={deletePack}>{type}</Button>}
                            {type === 'input' &&
                            <Button size={'small'} variant={'contained'} color={'primary'}>{'save'}</Button>}
                            {type === 'learn' &&

                            <Button size={'small'} variant={'contained'}
                                    color={'primary'} disabled={!!!cardsTotalCount||status==='loading'}>
                                <NavLink style={{textDecoration: 'none',color:'white'}} to={'/card'}> Show answer </NavLink>
                            </Button>

                            }
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </div>
    );
}
