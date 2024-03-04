import Main from 'pages/Main';
import GlobalStyle from 'GlobalStyle';
import List from 'pages/List';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Post from 'pages/Post';

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/post/:postId" element={<Post/>}/>
          <Route path="/post/:postId/answer" element={<Post/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
