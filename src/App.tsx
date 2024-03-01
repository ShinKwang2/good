import './App.css';
import Nav from './Nav';
import Albums from './components/Albums';
import LoginForm from './components/LoginForm';
import { useSession } from './contexts/session-context';

function App() {
  const {
    session: { loginUser },
  } = useSession();

  return (
    <>
      <Nav />
      {loginUser ? <Albums /> : <LoginForm />}
    </>
  );
}

export default App;
