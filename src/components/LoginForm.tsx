import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Input from './ui/Input';
import { useSession } from '../contexts/session-context';

export default function LoginForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<number>(0);
  const { login } = useSession();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setId(+e.currentTarget.value);
  };

  const loginFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login(id);
    (async function () {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const { id: userId, username } = await res.json();
      login(userId, username);
    })();
  };

  return (
    <>
      <form
        onSubmit={loginFunction}
        className='border border-sky-500 flex items-center justify-center gap-5'
      >
        <label htmlFor=''>Login ID</label>
        <Input
          type='number'
          className='border border-pink-300 rounded-lg'
          placeholder='please write your ID'
          ref={inputRef}
          onChange={change}
        />
        {/* <div> */}
        <button type='submit' className='bg-blue-500 rounded-lg p-2'>
          Sign-In
        </button>
        {/* </div> */}
      </form>

      {id < 1 || 10 < id ? (
        <div className='text-red-400'>ID를 1~10 사이로 입력해주세요.</div>
      ) : (
        <></>
      )}
    </>
  );
}
