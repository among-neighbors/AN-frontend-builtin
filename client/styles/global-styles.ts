import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
const GlobalStyle = createGlobalStyle`
  ${normalize}
  html,
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 10px;
    color: white;
    background-color: black;
  }
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;
