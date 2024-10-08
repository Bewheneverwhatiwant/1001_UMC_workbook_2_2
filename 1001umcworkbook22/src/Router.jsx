import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import MovieTapPage from './pages/movieTap/MovieTapPage';
import SearchTapPage from './pages/searchTap/SearchTapPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/loginpage" element={<LoginPage />} />
                    <Route path="/signuppage" element={<SignupPage />} />
                    <Route path="/movietappage" element={<MovieTapPage />} />
                    <Route path="/searchtappage" element={<SearchTapPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;