import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Albums from './components/Albums';
import LoginForm from './components/LoginForm';
import { useSession } from './contexts/session-context';
import AlbumDetail from './components/AlbumDetail';

function App() {
  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();

  return (
    <>
      <Nav />

      <Routes>
        <Route path='/' element={loginUser ? <Albums /> : <LoginForm />} />
        {/* <Route path='/albums'> */}
        <Route path='/albums/:id' element={<AlbumDetail />}></Route>
        {/* </Route> */}
      </Routes>

      <button onClick={() => navigate('/albums/1')}>어디로 갈꺼냐</button>
    </>
  );
}

export default App;
