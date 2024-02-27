import GlobalStyle from 'GlobalStyle';
import List from 'pages/List';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
