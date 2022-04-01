import Grid from "@mui/material/Grid";
import {videoAPI} from "../../n1-main/m2-bll/api/video-api";
import file from "../../assets/eye.png"

export const Introduce = () => {
    return (
        <Grid container justifyContent={'center'}>
            <button onClick={()=>videoAPI.setVideoOnServer(file)}> video </button>
        </Grid>
    )
}