import * as React from 'react';
import {ChangeEvent, RefObject, useEffect, useRef, useState} from 'react';
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
import {colorBlueMI, fontSizeButtonAuth} from '../utilities/for css';
import SwitchCustom from '../common/SwitchCustom';
import {checkUrl} from '../utilities/checkUrl';
import {setErrorN} from '../../m2-bll/reducers/appReducer';


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
    let userName1 = userName;

    const [photo, setPhoto] = useState('');
    const [fileBase64, setFileBase64] = useState<string | ArrayBuffer | null>(null)
    const [name, setName] = useState(userName1);
    //const [error, setError] = useState(false)
    const [disableChange, setDisableChange] = useState(true);
    //for switch
    const [checked, setChecked] = useState(true);
    const status = useTypedSelector(state => state.app.status);
    const dispatch = useDispatch();
    useEffect(() => {
        setName(userName)
    }, [open]);
    //for breakpoints
    const useStyles = styleForWidthModal;
    const classes = useStyles();


    const setAvatar = () => {
        if (!name) {
            dispatch(setErrorN('you need enter name'));
            setDisableChange(true);
            return;
        }
        if (fileBase64) {
            dispatch(setNewNameAvatarTC({avatar: fileBase64, name}));
            setName('');
            setOpen(false);
            setFileBase64(null);
            setDisableChange(true);
            return
        }
        if (photo && typeof photo === 'string' || photo === '') {
            if (photo === '') {
                dispatch(setNewNameAvatarTC({avatar: photo, name}));
                setPhoto('');
                setName('');
                setOpen(false);
                setDisableChange(true);
            } else if (checkUrl(photo)) {
                dispatch(setNewNameAvatarTC({avatar: photo, name}));
                setPhoto('');
                setName('');
                setOpen(false);
                setDisableChange(true);
            } else {
                dispatch(setErrorN('invalid url'));
                setDisableChange(true);
            }
        }

    }

    const setNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        setDisableChange(false);
    }
    const setPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.currentTarget.value);
        setDisableChange(false);
    }

    const onChangeToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            reader.onloadend = () => {
                if (checked) {
                    setFileBase64(reader.result)
                }
            }
            reader.readAsDataURL(newFile);
        }
        setDisableChange(false);
    };
    const onClickCancel = () => {
        setOpen(false);
        setPhoto('');
    };
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className={classes.box}>
                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
                    <Grid item xs={2}><SwitchCustom checked={checked} setChecked={setChecked}/></Grid>
                    <Grid item xs={10}>
                        <TypographyCustom color={colorBlueMI}
                                          title={!checked ? 'add avatar via url' : 'add avatar from local disc'}/>
                    </Grid>
                    {checked
                        ? <TextFieldCustom onChange={onChangeToBase64} type="file" ref={refInput}/>

                        : <TextFieldCustom
                            type="url" value={photo} onChange={setPhotos}
                            placeholder={'https://example.com'}
                        />
                    }

                </Grid>
                <TypographyCustom title={'change avatar'}/>
                <TextFieldCustom value={name} onChange={setNickName} placeholder={''}/>
                <TypographyCustom title={'change name'}/>
                <Grid container direction={'row'} justifyContent={'space-around'} sx={{marginTop: '5%'}}>
                    <Button style={fontSizeButtonAuth} onClick={onClickCancel}
                            size={'small'} variant={'contained'}
                            color={'inherit'}>
                        Cancel
                    </Button>
                    <Button disabled={status === 'loading' || disableChange} style={fontSizeButtonAuth} size={'small'}
                            variant={'contained'} onClick={setAvatar}>
                        Change
                    </Button>
                </Grid>
            </Box>
        </Modal>
    )
        ;
}


const TypographyCustom = ({title, color = 'grey'}: { title: string; color?: string }) => {
    return (
        <Typography style={{fontSize: '0.7rem', textAlign: 'center', color: color}}>{title}</Typography>
    )
}
type PropsTypeTextF = {
    value?: string | ArrayBuffer | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    ref?: RefObject<HTMLInputElement>;

}
const TextFieldCustom = ({value, onChange, placeholder, type = 'text',}: PropsTypeTextF) => {
    return (
        <TextField size={'small'}
                   placeholder={placeholder}
                   variant={'filled'}
                   fullWidth
                   type={type}
                   onChange={onChange}
                   value={value}

        />
    );
}