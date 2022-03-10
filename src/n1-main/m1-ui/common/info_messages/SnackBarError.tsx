import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useTypedSelector} from '../../../m2-bll/redux';
import {useDispatch} from 'react-redux';
import {setErrorN} from '../../../m2-bll/reducers/appReducer';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBarError() {
    const error = useTypedSelector(state => state.app.error);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        dispatch(setErrorN(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}
