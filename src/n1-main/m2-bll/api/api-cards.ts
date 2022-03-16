import axios from "axios";



const instance = axios.create({
    //baseURL: "http://localhost:7542/2.0/",
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export const apiCards = {
    getCards(page: number, pageCount: number, id:string) {
        return instance.get(`/cards/card/?page=${page}&pageCount=${pageCount}&cardsPack_id=${id}`)
    },
    addNewCard(id:string, question:string) {
        return instance.post('/cards/card', {card: {cardsPack_id:id,question , grade: 4}})
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(id: string, question:string) {
        return instance.put(`/cards/card`, {card: {_id: id, question}})
    },
}


