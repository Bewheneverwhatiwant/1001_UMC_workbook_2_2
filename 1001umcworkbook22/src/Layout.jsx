import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from './AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ResetCss from './ResetCss';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  background-color: transparent;
`;

const Main = styled.main`
    display: flex;
    flex-direcion: column; 
    flex: 1;
    margin-left: 15rem;
    background-color: black;
    padding-top: 8vh;
`;

const Layout = () => {
    // QueryClient 생성
    const queryClient = new QueryClient();

    return (
        <>
            <ResetCss />
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <Container>
                        <SideBar />
                        <Main>
                            <NavBar />
                            <Outlet />
                        </Main>

                    </Container>
                </AppProvider>
            </QueryClientProvider>
        </>
    );
};

export default Layout;