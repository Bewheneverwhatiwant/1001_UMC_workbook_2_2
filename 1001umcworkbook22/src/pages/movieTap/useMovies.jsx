import { useState, useEffect } from 'react';
import { loadMoviesFromServer, compareAndUpdateMovies } from './utils/movieTapUtils';

// 영화 데이터를 가져오고 업데이트하는 커스텀 훅
const useMovies = (initialCategory = 'now_playing') => {
	const [movies, setMovies] = useState([]);
	const [category, setCategory] = useState(initialCategory);

	useEffect(() => {
		// 초기 로드: 주어진 카테고리의 영화를 불러옴
		loadMoviesFromServer(category, setMovies);

		const interval = setInterval(() => {
			// 주기적으로 서버와 캐시 데이터 비교 후 업데이트
			compareAndUpdateMovies(category, setMovies);
		}, 60000);

		return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
	}, [category]); // 카테고리가 바뀔 때마다 useEffect 실행

	const changeCategory = (newCategory) => {
		setCategory(newCategory);
		loadMoviesFromServer(newCategory, setMovies); // 새 카테고리 데이터 로드
	};

	return { movies, category, changeCategory };
};

export default useMovies;
