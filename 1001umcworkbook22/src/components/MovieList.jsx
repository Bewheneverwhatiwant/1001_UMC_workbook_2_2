import React from 'react';
import styled from 'styled-components';
import { MOVIES } from '../mocks/movies';

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100vw; 
  box-sizing: border-box;
  overflow-x: hidden;
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

// https://image.tmdb.org/t/p/w500은 TMDB의 이미지 URL 기본 경로
// movies.js에서 제공하는 상대 경로를 ${movie.poster_path}에 넣어 map을 돌림

const MovieList = () => {
  return (
    <MoviesContainer>
      {MOVIES.results.map((movie) => (
        <MovieCard key={movie.id}>
          <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <Overlay className="overlay">
            <MovieTitle>{movie.title}</MovieTitle>
          </Overlay>
        </MovieCard>
      ))}
    </MoviesContainer>
  );
};

export default MovieList;
