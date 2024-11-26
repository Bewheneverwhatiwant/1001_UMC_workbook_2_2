import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomButton from '../../components/CommonComponents/CustomButton';
import CustomColumn from '../../components/CommonComponents/CustomColumn';
import { useAppContext } from '../../AppContext';

const StyledInput = styled.input`
    width: 50%;
    display: block;
    padding: 0.5rem;
`;

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { fetchUser } = useAppContext();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);

                await fetchUser(); // 사용자 정보 가져오기
                alert('로그인 성공');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`로그인 실패: ${errorData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
            <CustomFont color='white' font='2rem'>
                로그인
            </CustomFont>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledInput
                    type='text'
                    placeholder='이메일을 입력해주세요!'
                    {...register('email', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '올바른 이메일 형식이 아닙니다.',
                        },
                    })}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

                <StyledInput
                    type='password'
                    placeholder='비밀번호를 입력해주세요!'
                    {...register('password', {
                        required: '비밀번호를 입력해주세요.',
                        minLength: {
                            value: 8,
                            message: '비밀번호는 8자리 이상이어야 합니다.',
                        },
                        maxLength: {
                            value: 16,
                            message: '비밀번호는 16자리 이하이어야 합니다.',
                        },
                    })}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

                <CustomButton
                    width='50%'
                    backgroundColor={!errors.email && !errors.password ? '#F93062' : 'gray'}
                    type='submit'
                    disabled={!!errors.email || !!errors.password}
                >
                    <CustomFont color='white' font='1rem' fontWeight='bold'>
                        로그인
                    </CustomFont>
                </CustomButton>
            </StyledForm>
        </CustomColumn>
    );
};

export default LoginPage;
