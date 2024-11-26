import React, { useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
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

const LoadMoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #f93062;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d02b54;
  }
`;

const MovieTapPage = () => {
    const [category, setCategory] = useState('now_playing');

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['movies', category],
        queryFn: ({ pageParam = 1 }) =>
            getMoviesByCategory(category, pageParam),
        getNextPageParam: (lastPage, allPages) => {
            // API가 마지막 페이지를 제공하지 않는 경우 allPages.length로 계산
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
        },
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
                {data.pages.map((page) =>
                    page.results.map((movie) => (
                        <MovieCard key={movie.id}>
                            <MovieImage
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt={movie.title}
                            />
                        </MovieCard>
                    ))
                )}
            </MoviesContainer>
            {hasNextPage && (
                <LoadMoreButton onClick={fetchNextPage} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </LoadMoreButton>
            )}
        </CustomColumn>
    );
};

export default MovieTapPage;
