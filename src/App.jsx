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
}

export default App;
