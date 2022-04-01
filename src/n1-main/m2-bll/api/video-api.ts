import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://dry-forest-56016.herokuapp.com",
    withCredentials: true,
});

export const videoAPI = {
    setVideoOnServer: (file: any) => {
        debugger
        const formData = new FormData()
        formData.append('myFile', file)
        console.log(formData)
        return instance.get('/file')
    }
}
