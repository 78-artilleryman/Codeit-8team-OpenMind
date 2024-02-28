import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --gray10: #ffffff;
    --gray20: #f9f9f9;
    --gray30: #cfcfcf;
    --gray40: #818181;
    --gray50: #515151;
    --gray60: #000000;

    --brown10: #f5f1ee;
    --brown20: #e4d5c9;
    --brown30: #c7bbb5;
    --brown40: #542f1a;
    --brown50: #341909;

    --blue: #1877f2;
    --yellow: #fee500;
    --red: #b93333;

    --shadow-1pt: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
    --shadow-2pt: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    --shadow-3pt: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);
  }
`;
