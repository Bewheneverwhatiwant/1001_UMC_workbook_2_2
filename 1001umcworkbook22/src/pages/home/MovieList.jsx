import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import CustomBox from '../../components/CommonComponents/CustomBox';
import { getMovies, getMovieDetails } from './movieService';

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%; 
  box-sizing: border-box;
  overflow-x: hidden;
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

const MovieTitle = styled.h3`
  color: white;
  text-align: center;
  font-size: 1rem;
  margin-top: 10px;
`;

const MovieList = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  // useQuery로 데이터 호출
  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ['movies'], // queryKey는 객체 내 배열로 제공
    queryFn: getMovies,   // queryFn은 API 호출 함수
  });

  const handleMovieClick = async (movieId) => {
    try {
      const movieDetails = await getMovieDetails(movieId);
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error('영화 상세 정보 가져오기 오류:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies.</div>;

  return (
    <CustomBox backgroundColor="black" width="100%" minHeight="100vh" borderRadius="0">
      <MoviesContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MovieImage
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </MoviesContainer>
    </CustomBox>
  );
};

export default MovieList;
