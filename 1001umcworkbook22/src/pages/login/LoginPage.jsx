import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomButton from '../../components/CommonComponents/CustomButton';
import CustomColumn from '../../components/CommonComponents/CustomColumn';

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

    const onSubmit = (data) => {
        alert('로그인 성공');
        console.log(data); // form 데이터 확인용
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
