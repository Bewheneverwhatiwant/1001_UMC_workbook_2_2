import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { MOVIES } from '../mocks/movies';
import CustomBox from './CommonComponents/CustomBox';

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

const MovieList = () => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await axios.get(`${import.meta.env.VITE_SERVER}popular?language=en-US&page=1`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          }
        })
        setMovies(movies);

        console.log(movies.data);
      }
      catch (error) {
        console.error('영화데이터 오류 발생:', error);
      }
    }
    getMovies()
  }, []);

  return (
    <CustomBox backgroundColor='black' width='100%' minHeight='100vh' borderRadius='0'>
      <MoviesContainer>
        {movies.data?.results.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
            <Overlay className="overlay">
              <MovieTitle>{movie.title}</MovieTitle>
            </Overlay>
          </MovieCard>
        ))}
      </MoviesContainer>
    </CustomBox>
  );
};

export default MovieList;
