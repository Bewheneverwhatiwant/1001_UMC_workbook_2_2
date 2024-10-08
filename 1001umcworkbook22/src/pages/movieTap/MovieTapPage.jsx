import React from 'react';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomCenter from '../../components/CommonComponents/CustomCenter';
import CustomBox from '../../components/CommonComponents/CustomBox';
import CustomColumn from '../../components/CommonComponents/CustomColumn';
import CustomRow from '../../components/CommonComponents/CustomRow';

const MovieTapPage = () => {
    return (
        <CustomColumn width='100%'>
            <CustomFont color='white' font='2rem'>
                카테고리
            </CustomFont>

            <CustomRow width='100%' justifyContent='flex-start' gap='1rem'>
                <CustomBox backgroundColor='yello' width='25%' height='10vh' justifyContent='flex-start' alignItems='flex-end'>
                    <CustomBox>
// 여기에 각 네모 만들기
                    </CustomBox>
                </CustomBox>
            </CustomRow>
        </CustomColumn>
    );
};

export default MovieTapPage;
