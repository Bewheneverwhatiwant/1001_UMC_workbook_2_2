// services/movieService.js
import axios from "axios";

export const getMovies = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER}popular?language=en-US&page=1`,
			{
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
				},
			}
		);
		return response.data.results;
	} catch (error) {
		console.error('영화 데이터 오류 발생:', error);
		throw error;
	}
};

export const getMovieDetails = async (movieId) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}`,
			{
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('영화 상세 정보 가져오기 오류:', error);
		throw error;
	}
};
