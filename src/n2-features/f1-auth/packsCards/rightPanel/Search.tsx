import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

export const Search = () => {
    return (
        <Grid container
              xs={12}
              sx={{backgroundColor: 'ghostwhite', minHeight: '10vh', padding: '5px',margin:0}}
              justifyContent={'space-around'}
              alignItems={'center'}
        >
            <Grid item xs={8}>
                <Typography variant={'h6'}>
                    Packs List
                </Typography>
                <TextField
                    fullWidth={true} size={'small'}
                    variant={'standard'} placeholder={'search packs'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <Button variant={'contained'} color={'primary'} size={'small'}>Add new pack</Button>
            </Grid>
        </Grid>
    )
}