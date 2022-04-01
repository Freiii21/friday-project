import {Drawer, MenuItem} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/RoutesComponent';
import s from '../header/Header.module.css';
import Grid from '@mui/material/Grid';

type PropsType = {
    toggle: boolean;
    switchDrawer: (t: boolean) => void
}
export const AppDrawer = ({toggle, switchDrawer}: PropsType) => {

    return (
        <Drawer open={toggle} onClose={() => switchDrawer(false)}>
            <Grid container direction={'column'} justifyContent={'space-around'} sx={{marginTop:'40%'}}>
                <MenuItem><NavLink to={PATH.PROFILE}
                                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                                   : s.links)}>Profile</NavLink></MenuItem>

                <MenuItem><NavLink to={PATH.PACKS_CARDS}
                                   className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                       : s.links)}>Packs of Cards</NavLink></MenuItem>
                <MenuItem><NavLink to={PATH.INTRODUCE}
                                   className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                       : s.links)}>Introduce</NavLink></MenuItem>
            </Grid>
        </Drawer>
    );
}