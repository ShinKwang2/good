import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { getStorage, setStorage } from '../util/storage';

type SessionContextProps = {
  session: Session;
  login: (id: number, username: string) => void;
  logout: () => void;
};

type Action =
  | { type: 'set'; payload: Session }
  | { type: 'login'; payload: { id: number; username: string } }
  | { type: 'logout'; payload: null };

const KEY = 'session';

const GUEST: Session = { loginUser: null };

const reducer = (session: Session, { type, payload }: Action) => {
  switch (type) {
    case 'set':
      return { ...payload };
    case 'login':
      const newer = { ...session, loginUser: payload };
      setStorage<Session>(KEY, newer);
      return newer;
    // (async function () {
    //   const res = await fetch(
    //     `https://jsonplaceholder.typicode.com/users/${id}`
    //   );
    //   const { id: userId, username } = await res.json();
    //   console.log('🚀  userId:', userId, username);

    //   newer = { ...session, loginUser: { id: userId, username } };
    //   setStorage<Session>(KEY, newer);
    // })();
    case 'logout':
      setStorage<Session>(KEY, { ...session, loginUser: payload });
      return { ...session, loginUser: null };
    default:
      return session;
  }
};

const SessionContext = createContext<SessionContextProps>({
  session: { loginUser: null },
  login: () => {},
  logout: () => {},
});

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(reducer, {
    loginUser: null,
  });

  const login = (id: number, username: string) => {
    dispatch({ type: 'login', payload: { id, username } });
  };
  const logout = () => {
    dispatch({ type: 'logout', payload: null });
  };

  useEffect(() => {
    dispatch({ type: 'set', payload: getStorage<Session>(KEY, GUEST) });
  }, []);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
