import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './assets/styles/App.css';
import { Chart } from './components/Statistics/Chart.jsx';
import StatisticsDashboard from './components/Statistics/StatisticsDashbord.jsx';
import StatisticsTable from './components/Statistics/StatisticsDashbord.jsx';
import {
  StyledContainer,
  StyledContent,
  StyledTable,
} from './components/Statistics/Statistics.styled.js';
import {StatisticsPage} from './pages/statistics.jsx'

function App() {
  return (
    <Provider store={store}>
     <StatisticsPage />
    </Provider>
  );
}

export default App;
