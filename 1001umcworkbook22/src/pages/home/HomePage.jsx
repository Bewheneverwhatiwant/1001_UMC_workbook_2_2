import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomRow from '../../components/CommonComponents/CustomRow';
import CustomColumn from '../../components/CommonComponents/CustomColumn';
import sentences from './sentence';

const HomePage = () => {

  const [randomSentence, setRandomSentence] = useState('');

  useEffect(() => {
    // 문장을 랜덤하게 선택하여 상태에 저장
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setRandomSentence(sentences[randomIndex]);
  }, []);

  return (
    <CustomColumn width='100%'>
      <CustomRow width='100%' justifyContent='center'>

        <CustomFont color='white' font='1.5rem' fontWeight='bold'>
          {randomSentence}
        </CustomFont>

      </CustomRow>
      <MovieList />
    </CustomColumn>
  );
};

export default HomePage;
