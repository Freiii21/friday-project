import React, {ChangeEvent, useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import {useDispatch} from 'react-redux';
import {Navigate, useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {PATH} from '../../../../n1-main/m1-ui/routes/RoutesComponent';
import {colorBlueMI, styleForBoxCard, wrapper} from '../../../../n1-main/m1-ui/utilities/for css';
import Typography from '@mui/material/Typography';
import s from './card.module.css';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';
import {getCard} from '../../../../n1-main/m1-ui/utilities/getCard';
import {getCardsForLearn, setCurrentCard, updateCardGradeTC} from '../../../../n1-main/m2-bll/reducers/cardReducer';
import ModalMi from '../../../../n1-main/m1-ui/modal/ModalMI';
import {QuestionForCard} from './componentsForCard/QuestionForCard';
import {AnswerForCard} from './componentsForCard/AnswerForCard';
import {RadioGroupForCard} from './componentsForCard/RadioGroupForCard';
import {setErrorN} from '../../../../n1-main/m2-bll/reducers/appReducer';
import {ButtonsForCard} from './componentsForCard/ButtonsForCard';

export const Card = () => {
    //for model
    const [open, setOpen] = React.useState(false);
    const [typeModel, setTypeModel] = useState('');

    const dispatch = useDispatch();
    //for group radio
    const [value, setValue] = useState('');
    const namePack = useTypedSelector(state => state.cards.packName);
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    //for question and answer
    const question = useTypedSelector(state => state.cards.currentCard.question);
    const answer = useTypedSelector(state => state.cards.currentCard.answer);
    const answerImg = useTypedSelector(state => state.cards.currentCard.answerImg);
    const questionImg = useTypedSelector(state => state.cards.currentCard.questionImg);

    const cardsForLearn = useTypedSelector(state => state.cards.cardsForLearn)
    const card_id = useTypedSelector(state => state.cards.currentCard._id);
    //for reloading page
    const {packIdURL, packNameURL, cardIdURL} = useParams();
    const idPack = useTypedSelector(state => state.cards.cardsForLearn[0].cardsPack_id)
    const [yes, setYes] = useState(false);

    useEffect(() => {
        if (idPack === 'noneInInitialCard') {
            packIdURL && packNameURL && dispatch(getCardsForLearn(packIdURL, packNameURL));
            setYes(true);
        }
    }, []);

    useEffect(() => {
        if (yes) {
            const card = cardsForLearn.find(x => x._id === cardIdURL)
            card && dispatch(setCurrentCard(card));
            setYes(false);
        }


    }, [cardsForLearn])
    const getNewCard = () => {
        if (value) {
            const card = getCard(cardsForLearn);
            dispatch(setCurrentCard(card));
            setTypeModel('learn');
            setOpen(true);
            dispatch(updateCardGradeTC({grade: Number(value), card_id}));
            setValue('');
        } else {
            dispatch(setErrorN('rate please'));
        }

    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    if (!isAuth) return <Navigate to={PATH.LOGIN}/>

    return (
        <div style={wrapper}>
            <Box
                component={'div'}
                className={s.box}
                sx={styleForBoxCard}
            >
                <Grid container justifyContent={'center'} alignItems={'center'}
                      style={{display: 'flex', flexDirection: 'column', margin: 'auto'}}>
                    <Grid className={s.grid1} item style={{alignSelf: 'flex-start', marginBottom: '10%'}}>
                        <Typography variant={'h6'}>
                            Learn: <span style={{color: colorBlueMI}}>{namePack}</span>
                        </Typography>
                    </Grid>
                    <QuestionForCard question={question} questionImg={questionImg}/>
                    <AnswerForCard answer={answer} answerImg={answerImg && answerImg}/>
                    <RadioGroupForCard onChange={onChange} value={value}/>
                    <ButtonsForCard getNewCard={getNewCard} idPack={idPack} namePack={namePack} card_id={card_id}/>
                </Grid>
            </Box>
            <ModalMi
                title={namePack} open={open}
                setOpen={setOpen}
                type={typeModel} nameOfCell={'hardCord'}
            />
        </div>
    )
}
