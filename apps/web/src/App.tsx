import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import { trpc } from './utils/trpc';

function App() {
  const { mutateAsync: createUser } = trpc.user.create.useMutation();
  const { refetch: getUsers, data: userData } = trpc.user.getMany.useQuery();

  const [value, setValue] = useState('');

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold">Vite + React</h1>
      <div className="card">
        <input
          className="p-2 mr-2 bg-slate-200"
          value={value}
          placeholder="Enter a name"
          onChange={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setValue(ev.target.value);
          }}
        ></input>
        <button
          onClick={async () => {
            await createUser({ name: value });
            await getUsers();
            setValue('');
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {userData?.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
