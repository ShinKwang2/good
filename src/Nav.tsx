import { useSession } from './contexts/session-context';

export default function Nav() {
  const {
    session: { loginUser },
    logout,
  } = useSession();

  return (
    <div className='flex justify-between border border-red-500'>
      <span>Hanaro Album</span>
      <span>{loginUser ? `${loginUser.id} + ${loginUser.username}` : ''}</span>
      <span>
        {loginUser ? (
          <button onClick={() => logout()}>log-out</button>
        ) : (
          <button>sign-in</button>
        )}
      </span>
      {/* {loginUser ? (
        <div>
          #{loginUser.id}: {loginUser.username}{' '}
          <button onClick={() => logout} className='border bg-red-500'>
            Logout
          </button>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}
