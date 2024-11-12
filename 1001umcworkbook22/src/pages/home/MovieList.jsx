// components/MovieList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomBox from '../../components/CommonComponents/CustomBox';
import CustomColumn from '../../components/CommonComponents/CustomColumn';
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  min-width: 60%;
  min-height: 50%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

const MovieDetailText = styled.h3`
  color: #D9D9D9;
  margin: 10px 0;
`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('영화 데이터 가져오기 오류:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = async (movieId) => {
    try {
      const movieDetails = await getMovieDetails(movieId);
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error('영화 상세 정보 가져오기 오류:', error);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <CustomBox backgroundColor='black' width='100%' minHeight='100vh' borderRadius='0'>
      <MoviesContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MovieImage
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
            <Overlay className="overlay">
              <MovieTitle>{movie.title}</MovieTitle>
            </Overlay>
          </MovieCard>
        ))}
      </MoviesContainer>

      {selectedMovie && (
        <ModalOverlay onClick={closeModal}>
          <Modal
            backgroundImage={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            <CustomColumn alignItems='flex-start' justifyContent='center'>
              <MovieDetailText>{selectedMovie.title}</MovieDetailText>
              <MovieDetailText>평점: {selectedMovie.vote_average}</MovieDetailText>
              <MovieDetailText>러닝타임: {selectedMovie.runtime}분</MovieDetailText>
            </CustomColumn>
          </Modal>
        </ModalOverlay>
      )}
    </CustomBox>
  );
};

export default MovieList;
