import React, { useState } from 'react';
import styled from 'styled-components';
import CustomFont from '../../components/CommonComponents/CustomFont';
import CustomCenter from '../../components/CommonComponents/CustomCenter';

const SearchContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 20px;
`;

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

const SkeletonCard = styled.div`
  width: 150px;
  height: 220px;
  background-color: #D9D9D9;
  border-radius: 5px;
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% {
      background-color: #E0E0E0;
    }
    50% {
      background-color: #D9D9D9;
    }
    100% {
      background-color: #E0E0E0;
    }
  }
`;

const SearchTapPage = () => {
    const [query, setQuery] = useState(''); // 검색어 상태
    const [movies, setMovies] = useState([]); // 영화 데이터 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(''); // 에러 메시지 상태

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!query) {
            setMovies([]);
            setLoading(false);
            return;
        }

        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.results.length > 0) {
                setMovies(data.results);
            } else {
                setMovies([]);
                setError(`${query} 검색어에 해당하는 데이터가 없습니다.`);
            }
        } catch (err) {
            console.error('API 호출 오류:', err);
            setError('데이터를 불러오는 중 문제가 발생했습니다.');
        } finally {
            setLoading(false); // 로딩 상태 비활성화
        }
    };

    return (
        <CustomCenter>
            <SearchContainer>
                <CustomFont color="white" font="2rem">
                    영화 검색
                </CustomFont>
                <form onSubmit={handleSearch}>
                    <SearchInput
                        type="text"
                        placeholder="검색어를 입력하세요..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" style={{ display: 'none' }}>검색</button>
                </form>

                {loading && (
                    <MoviesContainer>
                        {[...Array(10)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </MoviesContainer>
                )}

                {!loading && error && (
                    <CustomFont color="white" font="1.5rem">{error}</CustomFont>
                )}

                {!loading && movies.length > 0 && (
                    <MoviesContainer>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id}>
                                <MovieImage
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <MovieTitle>{movie.title}</MovieTitle>
                            </MovieCard>
                        ))}
                    </MoviesContainer>
                )}
            </SearchContainer>
        </CustomCenter>
    );
};

export default SearchTapPage;
