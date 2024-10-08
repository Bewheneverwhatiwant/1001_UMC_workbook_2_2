// src/ResetCss.jsx
import { createGlobalStyle } from 'styled-components';

const ResetCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

export default ResetCss;