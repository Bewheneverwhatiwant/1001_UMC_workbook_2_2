import React from 'react';
import useMovies from './useMovies';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomColumn from '../../components/CommonComponents/CustomColumn';
import CustomRow from '../../components/CommonComponents/CustomRow';
import CustomButton from '../../components/CommonComponents/CustomButton';
import styled from 'styled-components';

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
  opacity: 0;
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
    const { movies, category, changeCategory } = useMovies('now_playing'); // 커스텀 훅

    return (
        <CustomColumn width='100%'>
            <CustomFont color='white' font='2rem'>
                {category} 영화
            </CustomFont>
            <CustomRow width='100%' justifyContent='flex-start' gap='1rem' margin='1rem 0'>
                <CustomButton
                    backgroundColor='yellow'
                    width='25%'
                    height='10vh'
                    onClick={() => changeCategory('now_playing')}
                    style={{ opacity: category === '현재 상영 중인' ? 1 : 0.5 }}
                >
                    <CustomFont color='black' font='1rem'>현재 상영 중인</CustomFont>
                </CustomButton>

                <CustomButton
                    backgroundColor='green'
                    width='25%'
                    height='10vh'
                    onClick={() => changeCategory('popular')}
                    style={{ opacity: category === '인기있는' ? 1 : 0.5 }}
                >
                    <CustomFont color='black' font='1rem'>인기있는</CustomFont>
                </CustomButton>

                <CustomButton
                    backgroundColor='skyblue'
                    width='25%'
                    height='10vh'
                    onClick={() => changeCategory('top_rated')}
                    style={{ opacity: category === '높은 평가를 받은' ? 1 : 0.5 }}
                >
                    <CustomFont color='black' font='1rem'>높은 평가를 받은</CustomFont>
                </CustomButton>

                <CustomButton
                    backgroundColor='pink'
                    width='25%'
                    height='10vh'
                    onClick={() => changeCategory('upcoming')}
                    style={{ opacity: category === '개봉 예정인' ? 1 : 0.5 }}
                >
                    <CustomFont color='black' font='1rem'>개봉 예정인</CustomFont>
                </CustomButton>
            </CustomRow>

            <MoviesContainer>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <MovieImage
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title}
                            onLoad={(e) => e.target.classList.add('loaded')}
                        />
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
