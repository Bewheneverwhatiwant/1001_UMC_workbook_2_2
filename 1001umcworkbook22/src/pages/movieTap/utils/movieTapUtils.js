import axios from 'axios';

// 개발 도중 코드 수정 시 응답값이 다 날아가는 것이 불편하여 별도로 설정


// 서버로부터 데이터를 가져와서 상태와 캐시에 저장
export const loadMoviesFromServer = async (endpoint, setMovies) => {
    const newMovies = await fetchMovies(endpoint);
    setMovies(newMovies);

    localStorage.setItem(endpoint, JSON.stringify(newMovies)); // 엔드포인트를 키로, 응답값을 value로 캐싱
    localStorage.setItem(`${endpoint}_timestamp`, Date.now()); // 어느 API인지를 키로, 언제 저장됐는지를 값으로 캐싱
};

// 서버 데이터와 캐시된 데이터가 다르면 업데이트
export const compareAndUpdateMovies = async (endpoint, setMovies) => {
    const cachedData = localStorage.getItem(endpoint) ? JSON.parse(localStorage.getItem(endpoint)) : [];
    const serverData = await fetchMovies(endpoint);

    if (JSON.stringify(serverData) !== JSON.stringify(cachedData)) {
        setMovies(serverData);

        localStorage.setItem(endpoint, JSON.stringify(serverData));
        localStorage.setItem(`${endpoint}_timestamp`, Date.now());
    }
};

// 서버로부터 영화 데이터를 가져오는 함수
export const fetchMovies = async (endpoint) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}${endpoint}?language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류 발생:', error);
        return [];
    }
};
