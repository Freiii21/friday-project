import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../n1-main/m2-bll/store';
import {ResponsePingType} from '../../n1-main/m2-bll/api/api';
import {getPingT} from '../../n1-main/m2-bll/reducers/testReducer';
import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox';
import {TestSearchBlock} from "../../n1-main/m1-ui/common/с4-Sarch_Sort/testserchblock/TestSerachBlock";

export const TestPageMI = () => {
    const dispatch = useDispatch();
    const dataPing = useSelector<AppRootStateType, ResponsePingType>(state => state.test.data)
    const handleBut = () => {
        dispatch(getPingT());
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
        }}><Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                padding: 5,
                border: '2px solid lightgrey',
                borderRadius: 3,
                width: 350,
                height: '80%',
                backgroundColor: 'whitesmoke',
                '&:hover': {
                    backgroundColor: 'white',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <h1 style={{marginBottom: '20px', textAlign: 'center'}}>
                        Test Page
                    </h1>
                </Grid>
                <Grid item
                      sx={{
                          marginTop: '70px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          fontSize: '0.8rem',
                          padding: '0 20px',
                          lineHeight: '1.3rem',
                      }}
                >
                    <SuperInputText placeholder={'Super input'}
                                    style={{
                                        backgroundColor: 'white',
                                        height: '30px',
                                        marginRight: '10px'
                                    }}/>
                    <SuperButton
                        onClick={handleBut}
                        style={{
                            width: '120px',
                            backgroundColor: 'green', marginRight: '10px'
                        }}>Super button</SuperButton>
                    <SuperCheckbox/>
                    {dataPing && <div>
                        <p>ping: {dataPing.ping}</p>
                        <p>backTime: {dataPing.backTime}</p>
                        <p>info: {dataPing.info}</p>
                    </div>}
                </Grid>
            </Grid>
        </Box>

            <TestSearchBlock/>
        </div>
    )
}