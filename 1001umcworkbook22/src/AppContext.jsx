import React, { createContext, useState, useContext, useEffect } from 'react';

// Context 생성
const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null); // 사용자 정보 상태

	// 사용자 정보 가져오기 함수
	const fetchUser = async () => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			try {
				const response = await fetch('http://localhost:3000/user/me', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const userData = await response.json();
					setUser(userData); // 사용자 정보 저장
				} else {
					console.error('사용자 정보를 가져오는데 실패했습니다.');
				}
			} catch (error) {
				console.error('API 호출 오류:', error);
			}
		}
	};

	// 앱 로드 시 사용자 정보 가져오기
	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AppContext.Provider value={{ user, setUser, fetchUser }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
