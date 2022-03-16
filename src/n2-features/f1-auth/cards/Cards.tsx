import React, {useState} from 'react';
import {Modal} from '../../../n1-main/m1-ui/Modal/Modal';
import {Button} from '@mui/material';


type CardsPropsType = {
    answer: string
    created?: string
    question: string
    rating: number
    updated: string
    id: string
    cardsPack_id?: string
    deleteCard: (idCard: string) => void
    updateCard: (idCard: string, question: string) => void

}


export const Cards = ({
                          id, answer, updated, deleteCard,
                          question, rating, updateCard,
                      }: CardsPropsType) => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [newQuestion, setNewQuestion] = useState<string>('')
    return (
        <>
            <tr key={id}>
                <td>{question}</td>
                <td>{answer}</td>
                <td>{updated}</td>
                <td>{rating}</td>
                {/*<td>{cardsPack_id}</td>*/}
                <td>{id}</td>

                <td>
                    <Button onClick={() => deleteCard(id)}> DEL</Button>
                    <Button onClick={() => {
                        setModalActive(true)
                    }}> UPDATE</Button>

                </td>
            </tr>

            <Modal active={modalActive} setActive={setModalActive}>
                <div style={{color: 'black'}}>
                    <label> enter question </label>
                    <input type={'text'} onChange={(e) => {
                        setNewQuestion(e.target.value)
                    }}/>
                </div>
                <Button onClick={() => {
                    updateCard(id, newQuestion)
                    setModalActive(false)
                    setNewQuestion('')
                }}> UPDATE </Button>


            </Modal>

        </>
    )
}