<<<<<<< HEAD


function App() {

  return<></>
=======
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './assets/styles/App.css';
import Currency from './components/Currency/Currency.jsx'
import StatisticsPage from './pages/StatisticsPage.jsx';

function App() {
  return (
    <Provider store={store}>
      <StatisticsPage />
      <Currency />
    </Provider>
  );
>>>>>>> 984260d1233fd2b7eeb109680426296583e745cd
}

export default App;
