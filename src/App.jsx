import { Provider } from 'react-redux';
import store from './redux/store.js';
import './assets/styles/App.css';
import StatisticsPage from './pages/StatisticsPage.jsx';

function App() {
  return (
    <Provider store={store}>
      <StatisticsPage />
    </Provider>
  );
}

export default App;
