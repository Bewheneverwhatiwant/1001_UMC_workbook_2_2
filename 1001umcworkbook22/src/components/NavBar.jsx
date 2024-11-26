import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

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

export default function NavBar() {
    const { user, setUser } = useAppContext(); // Context에서 사용자 정보와 상태 변경 함수 가져오기
    const navigate = useNavigate();

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // 토큰 삭제
        localStorage.removeItem('refreshToken');
        setUser(null); // 사용자 정보 초기화
        alert('로그아웃되었습니다.');
    };

    const GoLogin = () => {
        navigate('/loginpage');
    };

    const GoSignup = () => {
        navigate('/signuppage');
    };

    return (
        <HeaderContainer>
            <CustomRow width="100%" justifyContent="center">
                <CustomRow width="100%" justifyContent="flex-end">
                    <CustomRow width="60%" justifyContent="center">
                        {user && (
                            <CustomFont color="white" font="1rem" style={{ marginRight: '1rem' }}>
                                {user.email}님 환영합니다.
                            </CustomFont>
                        )}
                        {user ? (
                            <CustomButton backgroundColor="transparent" hoverColor="#F93062" onClick={handleLogout}>
                                <CustomFont color="white" font="1rem">
                                    로그아웃
                                </CustomFont>
                            </CustomButton>
                        ) : (
                            <CustomButton backgroundColor="transparent" hoverColor="#F93062" onClick={GoLogin}>
                                <CustomFont color="white" font="1rem">
                                    로그인
                                </CustomFont>
                            </CustomButton>
                        )}

                        {!user && (
                            <CustomButton backgroundColor="#F93062" onClick={GoSignup}>
                                <CustomFont color="white" font="1rem">
                                    회원가입
                                </CustomFont>
                            </CustomButton>
                        )}
                    </CustomRow>
                </CustomRow>
            </CustomRow>
        </HeaderContainer>
    );
}
