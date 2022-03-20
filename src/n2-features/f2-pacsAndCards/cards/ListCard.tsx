import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNewCardTC, deleteCardTC, updateCardTC} from '../../../n1-main/m2-bll/reducers/cardReducer';
import {Cards} from './Cards';
import {Modal} from '../../../n1-main/m1-ui/modal/Modal';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {Button} from '@mui/material';

export const ListCard = () => {
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const cards = useTypedSelector(state => state.cards.data.cards)
    const idPack = useTypedSelector(state => state.cards.data.packUserId)

    const addCard = () => {
        dispatch(addNewCardTC(1, 7, idPack, question))
        setModalActive(false)
        setQuestion('')
    }

    const deleteCard = (idCard: string) => {
        dispatch(deleteCardTC(1, 7, idCard, idPack))
    }

    const updateCard = (idCard: string, question: string) => {
        dispatch(updateCardTC(idCard, idPack, 1, 7, question))

    }

    return (
        <div>

            <table>
                <tbody>
                <tr>
                    <th>question</th>
                    <th>answer</th>
                    <th>updated</th>
                    <th>rating</th>
                    <th><Button onClick={() => {
                        setModalActive(true)
                    }}> ADD </Button></th>
                </tr>
                {cards && cards.map(t => {
                   /* return <Cards key={t._id} id={t._id} updated={t.updated}
                                  answer={t.answer} deleteCard={deleteCard}
                                  created={t.created} updateCard={updateCard}
                                  question={t.question} cardsPack_id={t.cardsPack_id}
                                  rating={t.rating}
                    />*/
                })}
                </tbody>
            </table>

            <Modal active={modalActive} setActive={setModalActive}>
                <div style={{color: 'black'}}>
                    <label> enter question </label>
                    <input type={'text'} onChange={(e) => {
                        setQuestion(e.target.value)
                    }}/>
                </div>
                <Button onClick={addCard}> SAVE</Button>


            </Modal>

        </div>
    )
}