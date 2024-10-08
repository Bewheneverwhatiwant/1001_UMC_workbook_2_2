import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CustomRow from './CommonComponents/CustomRow';
import CustomFont from './CommonComponents/CustomFont';
import CustomButton from './CommonComponents/CustomButton';

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 7vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #131517;
    z-index: 999;
`;

export default function Header() {
    const navigate = useNavigate();

    const GoMain = () => {
        navigate('/');
    }

    return (
        <HeaderContainer>
            <CustomRow width='100%' justifyContent='center'>
                <CustomRow width='85%' justifyContent='flex-end'>

                    <CustomRow width='30%' justifyContent='center'>
                        <CustomButton backgroundColor='transparent' hoverColor='#F93062'>
                            <CustomFont color='white' font='1rem'>
                                로그인
                            </CustomFont>
                        </CustomButton>

                        <CustomButton backgroundColor='#F93062'>
                            <CustomFont color='white' font='1rem'>
                                회원가입
                            </CustomFont>
                        </CustomButton>
                    </CustomRow>
                </CustomRow>
            </CustomRow>
        </HeaderContainer>
    );
}