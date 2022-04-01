import React, {ChangeEvent, useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {PATH} from '../../../../n1-main/m1-ui/routes/RoutesComponent';
import {colorBlueMI, styleForBoxCard, styleForCardButtons, wrapper} from '../../../../n1-main/m1-ui/utilities/for css';
import Typography from '@mui/material/Typography';
import s from './card.module.css';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';
import {getCard} from '../../../../n1-main/m1-ui/utilities/getCard';
import {getCardsForLearn, setCurrentCard, updateCardGradeTC} from '../../../../n1-main/m2-bll/reducers/cardReducer';
import ModalMi from '../../../../n1-main/m1-ui/modal/ModalMI';
import {QuestionForCard} from './componentsForCard/QuestionForCard';
import {AnswerForCard} from './componentsForCard/AnswerForCard';
import {RadioGroupForCard} from './componentsForCard/RadioGroupForCard';

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
        const card = getCard(cardsForLearn);
        dispatch(setCurrentCard(card));
        setTypeModel('learn');
        setOpen(true);
        dispatch(updateCardGradeTC({grade: Number(value === '' ? 1 : value), card_id}));
        setValue('');
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
                    <Grid  container xs={12} justifyContent={'space-around'}
                          direction={'row'}
                          sx={{marginTop: 5}}>
                        <Button
                            sx={styleForCardButtons}
                            size={'small'}
                            type={'button'} variant={'contained'} color={'primary'}
                        >
                            <NavLink to={PATH.PACKS_CARDS}
                                     style={{color: 'inherit', textDecoration: 'none'}}>
                                Cancel
                            </NavLink>
                        </Button>
                        <Button

                            type={'submit'}
                            sx={styleForCardButtons}
                            size={'small'}
                            variant={'contained'} color={'primary'}
                            onClick={getNewCard}

                        >
                            <NavLink style={{textDecoration: 'none', color: 'white'}}
                                     to={`/card/${idPack}/${namePack}/${card_id}`}>Next</NavLink>
                        </Button>
                    </Grid>


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
