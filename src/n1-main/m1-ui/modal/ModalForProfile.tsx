import * as React from 'react';
import {ChangeEvent, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {setNewNameAvatarTC} from '../../m2-bll/reducers/authReducer';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';
import {styleForWidthModal} from '../utilities/styleForWidthModal';
import {fontSizeButtonAuth} from '../utilities/for css';

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
    open: boolean;
    setOpen: (b: boolean) => void;
}
export default function ModalForProfile({open, setOpen}: PropsType) {
    //for modify in base 64
    const refInput = useRef<HTMLInputElement>(null);

    const userName = useTypedSelector(state => state.auth.user.name);
    const [photo, setPhoto] = useState<string | ArrayBuffer | null>('');
    const [name, setName] = useState(userName);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    //for breakpoints
    const useStyles = styleForWidthModal;
    const classes = useStyles();

    const setAvatar = () => {
        dispatch(setNewNameAvatarTC({avatar: photo, name}))
        setPhoto('');
        setName('');
    }

    const setNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const setPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.currentTarget.value)
    }

    const onChangeToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            reader.onloadend = () => {
                if (checked) {
                    setPhoto(reader.result)
                }
            }
            reader.readAsDataURL(newFile);
        }
    };
    const onClickCancel = () => setOpen(false);
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className={classes.box}>
                <Grid container direction={'row'} justifyContent={'center'} xs={12}>
                    {/* <Grid item xs={2}>
                                <Checkbox checked={checked} onChange={onChangeCheckBox}
                                          inputProps={{'aria-label': 'controlled'}}
                                          size={'small'}
                                          style={{
                                              position: 'relative',
                                              top: '10px',
                                              left: '6px'
                                          }}/>
                            </Grid>*/}
                    {checked
                        ? <div style={{height: '10px', width: '10px', margin: '10px 0'}}>
                            <input type={'file'} ref={refInput} onChange={onChangeToBase64}/>
                        </div>
                        : <TextFieldCustom value={photo} onChange={setPhotos} placeholder={'http://...'}/>
                    }

                </Grid>
                <TypographyCustom title={'change avatar'}/>
                <TextFieldCustom value={name} onChange={setNickName} placeholder={''}/>
                <TypographyCustom title={'change name'}/>
                <Grid container direction={'row'} justifyContent={'space-around'} sx={{marginTop: '5%'}}>
                    <Button style={fontSizeButtonAuth} onClick={onClickCancel} size={'small'} variant={'contained'}
                            color={'inherit'}> Cancel</Button>
                    <Button style={fontSizeButtonAuth} size={'small'} variant={'contained'}>Change</Button>
                </Grid>
            </Box>
        </Modal>
    )
        ;
}


const TypographyCustom = ({title}: { title: string }) => {
    return (
        <Typography style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>{title}</Typography>
    )
}
type PropsTypeTextF = {
    value: string | ArrayBuffer | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}
const TextFieldCustom = ({value, onChange, placeholder}: PropsTypeTextF) => {
    return (
        <TextField size={'small'}
                   placeholder={placeholder}
                   variant={'filled'}
                   fullWidth
                   type={'text'}
                   onChange={onChange}
                   value={value}

        />
    );
}