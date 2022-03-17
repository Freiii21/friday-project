import axios from "axios";



const instance = axios.create({
    //baseURL: "http://localhost:7542/2.0/",
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export const cardsAPI = {
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
};



export type CardsDataType = {
    cards: CardsType[]
    //id: string
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardsType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}