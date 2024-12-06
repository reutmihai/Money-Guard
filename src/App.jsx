// import "./assets/styles/App.css";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogIn } from './services/authAPI';
import { selectBalance, selectError, selectLoggedIn } from './redux/selectors';
import { getTransactions } from './services/transactionsAPI';

// import MainOrganism from "./components/tranzaction/organism";

function App() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const logged = useSelector(selectLoggedIn);
  const balance = useSelector(selectBalance);
  const error = useSelector(selectError);

  const data = {
    transactionDate: '2024-12-18T17:34:02.666Z',
    type: 'INCOME',
    categoryId: '719626f1-9d23-4e99-84f5-289024e437a8',
    comment: 'string',
    amount: 200,
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(handleLogIn({ email, password }));
    console.log(balance);
  };

  const handleSend = () => {
    dispatch(getTransactions());
  };
  return (
    <>
      {/* <MainOrganism/> */}
      {logged ? 'true' : 'false'}
      {error}
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
        <button type='submit'>login</button>
      </form>
      <button onClick={handleSend}>send</button>
    </>
  );
}

export default App;
