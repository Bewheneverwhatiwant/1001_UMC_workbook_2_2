import React, { useState } from 'react';
import styled from 'styled-components';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomButton from '../../components/CommonComponents/CustomButton';
import CustomColumn from '../../components/CommonComponents/CustomColumn';

const StyledInput = styled.input`
    width: 50%;
    display: block;
    padding: 0.5rem;
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const isFormValid = email && password && !emailError && !passwordError;

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length < 8 || value.length > 16) {
            setPasswordError('비밀번호는 8자리 이상 16자리 이하이어야 합니다.');
        } else {
            setPasswordError('');
        }
    };

    return (

        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
            <CustomFont color='white' font='2rem'>
                로그인
            </CustomFont>

            <StyledInput
                type='text'
                placeholder='이메일을 입력해주세요!'
                value={email}
                onChange={handleEmailChange}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}


            <StyledInput
                type='password'
                placeholder='비밀번호를 입력해주세요!'
                value={password}
                onChange={handlePasswordChange}
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

            <CustomButton
                width='50%'
                backgroundColor='#F93062'
                onClick={() => alert('로그인')}
                disabled={!isFormValid}
            >
                <CustomFont color='white' font='1rem' fontWeight='bold'>
                    로그인
                </CustomFont>
            </CustomButton>
        </CustomColumn>

    );
};

export default LoginPage;
