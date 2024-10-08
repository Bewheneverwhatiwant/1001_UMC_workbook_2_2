import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomCenter from '../../components/CommonComponents/CustomCenter';
import CustomBox from '../../components/CommonComponents/CustomBox';
import CustomColumn from '../../components/CommonComponents/CustomColumn';
import CustomRow from '../../components/CommonComponents/CustomRow';
import CustomButton from '../../components/CommonComponents/CustomButton';

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%; 
  box-sizing: border-box;
  overflow-x: hidden;
  margin-top: 5vh;
`;

const MovieCard = styled.div`
  position: relative;
  width: 150px;
  height: 220px;
  cursor: pointer;
  overflow: hidden;

  &:hover .overlay {
    opacity: 0.7;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 100;
  
  opacity: 40;
  transition: opacity 0.5s ease-in-out;
  
  &.loaded {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MovieTitle = styled.h3`
  color: white;
  text-align: center;
  font-size: 1em;
  padding: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const MovieTapPage = () => {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState('카테고리');
    const [initialState, setInitialState] = useState(true);

    const fetchMovies = async (endpoint) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}${endpoint}?language=en-US&page=1`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                }
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('영화 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    const handleCategoryChange = (endpoint, label) => {
        setCategory(label);
        setInitialState(false);
        fetchMovies(endpoint);
    };

    const handleReset = () => {
        setCategory('카테고리');
        setMovies([]);
        setInitialState(true);
    };

    return (
        <CustomColumn width='100%'>
            <CustomFont color='white' font='2rem'>
                {category}
            </CustomFont>
            {!initialState && (
                <CustomButton backgroundColor='white' onClick={handleReset} width='7%' height='5vh'>
                    <CustomFont color='black' font='1rem'>처음으로</CustomFont>
                </CustomButton>
            )}
            <CustomRow width='100%' justifyContent='flex-start' gap='1rem' margin='1rem 0'>
                <CustomButton
                    backgroundColor='yellow'
                    width='25%'
                    height='10vh'
                    justifyContent='flex-start'
                    alignItems='flex-end'
                    onClick={() => handleCategoryChange('now_playing', '현재 상영 중인')}
                >
                    <CustomFont color='black' font='1rem'>현재 상영 중인</CustomFont>
                </CustomButton>

                <CustomButton
                    backgroundColor='green'
                    width='25%'
                    height='10vh'
                    justifyContent='flex-start'
                    alignItems='flex-end'
                    onClick={() => handleCategoryChange('popular', '인기있는')}
                >
                    <CustomFont color='black' font='1rem'>인기있는</CustomFont>
                </CustomButton>

                <CustomButton
                    backgroundColor='skyblue'
                    width='25%'
                    height='10vh'
                    justifyContent='flex-start'
                    alignItems='flex-end'
                    onClick={() => handleCategoryChange('top_rated', '높은 평가를 받은')}
                >
                    <CustomFont color='black' font='1rem'>높은 평가를 받은</CustomFont>
                </CustomButton>

                <CustomButton
                    backgroundColor='pink'
                    width='25%'
                    height='10vh'
                    justifyContent='flex-start'
                    alignItems='flex-end'
                    onClick={() => handleCategoryChange('upcoming', '개봉 예정인')}
                >
                    <CustomFont color='black' font='1rem'>개봉 예정인</CustomFont>
                </CustomButton>
            </CustomRow>

            <MoviesContainer>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                        <Overlay className="overlay">
                            <MovieTitle>{movie.title}</MovieTitle>
                        </Overlay>
                    </MovieCard>
                ))}
            </MoviesContainer>
        </CustomColumn>
    );
};

export default MovieTapPage;
