import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");


   *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100vh;
    background-color: #41B6E6;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    
  }

  button {
    cursor: pointer;
  }
`;
