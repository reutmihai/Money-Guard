

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBalance, selectError, selectLoggedIn, selectUserEmail, selectUsername } from './redux/selectors';
import { handleRegister } from './services/authAPI';





function App() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username,setUsername]= useState();

  const logged = useSelector(selectLoggedIn);
  const balance = useSelector(selectBalance);
  const error = useSelector(selectError);
  const user =useSelector(selectUsername)

  const data = {
    transactionDate: '2024-12-18T17:34:02.666Z',
    type: 'INCOME',
    categoryId: '719626f1-9d23-4e99-84f5-289024e437a8',
    comment: 'string',
    amount: 200,
  };
  const handleSubmit = e => {
    const user = {
      email,
      username,
      password
    }
    e.preventDefault();
    dispatch(handleRegister(user))
  };

  const handleSend = () => {
    console.log(balance)
  };
  return (
    <>
      {/* <MainOrganism/> */}
      {logged ? 'true' : 'false'}
      {error}
      {user}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='user'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='pass'
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type='text'
          placeholder='username'
          onChange={e => setUsername(e.target.value)}
        />
        <button type='submit'>login</button>
      </form>
      <button onClick={handleSend}>test</button>
    </>
  );
}

export default App;
