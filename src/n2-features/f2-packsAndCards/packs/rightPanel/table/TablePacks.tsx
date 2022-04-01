import Grid from '@mui/material/Grid';
import {TableM} from './TableM';

export const TablePacks = () => {

    return (
        <Grid container xs={12}   sx={{backgroundColor: 'silver', height:'85%', margin: 0}}>
            <TableM/>
        </Grid>
    );
}