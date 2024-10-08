import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ResetCss from './ResetCss';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: transparent;
`;

const Main = styled.main`
    display: flex;
    flex-direcion: column; 
    flex: 1;
    margin-left: 15rem;
    background-color: black;
`;

const Layout = () => {

    return (
        <>
            <ResetCss />
            <Container>
                <SideBar />
                <Main>
                    <NavBar />
                    <Outlet />
                </Main>

            </Container>
        </>
    );
};

export default Layout;