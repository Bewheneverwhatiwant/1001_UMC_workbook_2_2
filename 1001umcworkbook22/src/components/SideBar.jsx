import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CustomColumn from './CommonComponents/CustomColumn';
import CustomRow from './CommonComponents/CustomRow';
import CustomButton from './CommonComponents/CustomButton';
import CustomBox from './CommonComponents/CustomBox';
import CustomFont from './CommonComponents/CustomFont';

import { FaMagnifyingGlass } from "react-icons/fa6";

const SideBarContainer = styled.div`
    width: 15rem;
    position: fixed;
    background-color: #131517;
    padding: 0.5rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    justity-content: flex-start;
`;

const SideBar = () => {
    const navigate = useNavigate();

    const GoMain = () => {
        navigate('/');
    }

    return (
        <SideBarContainer>

            <CustomColumn width='100%' height='100vh' alignItems='center' justifyContent='flex-start' gap='1rem' >
                <CustomButton onClick={GoMain} backgroundColor='transparent'>
                    <CustomFont color='#F93062' fontWeight='bold' font='1.5rem'>
                        NAYEONGCHA
                    </CustomFont>
                </CustomButton>

                <CustomRow width='80%' alignItems='center' justifyContent='flex-start' gap='0.5rem'>

                    <CustomButton width='100%' backgroundColor='transparent' hoverColor='#282D31'>
                        <CustomFont color='white' font='1rem'>찾기</CustomFont>
                    </CustomButton>
                </CustomRow>

                <CustomRow width='80%' alignItems='center' justifyContent='flex-start' gap='0.5rem'>

                    <CustomButton width='100%' backgroundColor='transparent' hoverColor='#282D31'>
                        <CustomFont color='white' font='1rem'>영화</CustomFont>
                    </CustomButton>
                </CustomRow>
            </CustomColumn>

        </SideBarContainer>
    );
};

export default SideBar;