import styled, { createGlobalStyle } from 'styled-components';
import './fonts.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    height: 100%;
  }

  body{
    font-family: 'Poppins', 'sans-serif';
    background: #E0E7E9;
  }
`;

export const Container = styled.div`
  max-width: 1000px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
