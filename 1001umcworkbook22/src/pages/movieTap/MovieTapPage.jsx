import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import CustomFont from '../../components/CommonComponents/CustomFont';
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
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MovieTapPage = () => {
    const [category, setCategory] = useState('now_playing');

    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ['movies', category], // queryKey는 객체 내 배열로 제공
        queryFn: () => getMoviesByCategory(category), // queryFn에 함수 전달
    });

    const changeCategory = (newCategory) => {
        setCategory(newCategory);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading movies.</div>;

    return (
        <CustomColumn width="100%">
            <CustomFont color="white" font="2rem">
                {category} 영화
            </CustomFont>
            <CustomRow width="100%" justifyContent="flex-start" gap="1rem" margin="1rem 0">
                <CustomButton
                    backgroundColor="yellow"
                    width="25%"
                    height="10vh"
                    onClick={() => changeCategory('now_playing')}
                >
                    <CustomFont color="black" font="1rem">
                        현재 상영 중인
                    </CustomFont>
                </CustomButton>
                <CustomButton
                    backgroundColor="green"
                    width="25%"
                    height="10vh"
                    onClick={() => changeCategory('popular')}
                >
                    <CustomFont color="black" font="1rem">
                        인기있는
                    </CustomFont>
                </CustomButton>
            </CustomRow>
            <MoviesContainer>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <MovieImage
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title}
                        />
                    </MovieCard>
                ))}
            </MoviesContainer>
        </CustomColumn>
    );
};

export default MovieTapPage;
