import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';


export const styleForWidthModal = makeStyles((theme: Theme) =>
    createStyles(
        {
            box: {

                [theme.breakpoints.down('sm')]: {
                    width: '80%'
                },
                [theme.breakpoints.up('sm')]: {
                    width: '50%',
                },
                [theme.breakpoints.up('md')]: {
                    width: '30%',
                }
            }
        }
    ));