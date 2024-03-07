import Main from 'pages/Main';
import GlobalStyle from 'GlobalStyle';
import List from 'pages/List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from 'pages/Post';
import NotFound from 'pages/NotFound';
import { SubjectProvider } from 'context/subjectContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <SubjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/list" element={<List />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/post/:postId/answer" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SubjectProvider>
    </>
  );
}

export default App;
