import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import {Checkbox, Input} from '@mui/material';
import {setNewNameAvatarTC} from '../../m2-bll/reducers/authReducer';
import {ChangeEvent, useRef, useState} from 'react';
import {colorBlueMI} from '../utilities/for css';
import {Navigate} from 'react-router-dom';
import {PATH} from '../routes/RoutesComponent';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../m2-bll/redux';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
    const styleSpan = {color: colorBlueMI, fontSize: '0.9rem'};

    const onChangeCheckBox = () => setChecked(!checked);
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
    return (
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <Grid container direction={'row'}>
                            <Grid item xs={2}>
                                <Checkbox checked={checked} onChange={onChangeCheckBox}
                                          inputProps={{'aria-label': 'controlled'}}
                                          size={'small'}
                                          style={{
                                              position: 'relative',
                                              top: '10px',
                                              left: '6px'
                                          }}/>
                            </Grid>
                            {checked ?
                                <div style={{height: '10px', width: '10px', margin: '10px 0'}}>
                                    <input type={'file'} ref={refInput} onChange={onChangeToBase64}/>
                                </div>
                                : <Grid item xs={9.5}><Input size={'small'}
                                                             placeholder={'http://...'}
                                                             type={'text'}
                                                             onChange={setPhotos}
                                                             value={photo}
                                                             style={{
                                                                 marginTop: '10px',
                                                                 minHeight: '10px',
                                                                 paddingLeft: '10px'
                                                             }}

                                /></Grid>
                            }
                        </Grid>

                        <div style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>change avatar</div>
                        <Input size={'small'}
                               placeholder={'New name'}
                               type={'text'}
                               onChange={setNickName}
                               value={name}
                               style={{marginLeft: '22px'}}
                        />
                        <div style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>change name</div>
                    <Button onClick={()=>setOpen(false)}  size={'small'} variant={'contained'}>Cancel</Button>
                </Box>
            </Modal>
    );
}
