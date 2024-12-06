
import StatisticsDashboard from './components/Statistics/StatisticsDashboard.jsx';
import StatisticsTable from './components/Statistics/StatisticsDashboard.jsx';
import {
  StyledContainer,
  StyledContent,
  StyledTable,
} from './components/Statistics/Statistics.styled.js';
import Chart from '../components/Statistics/Chart.jsx';

const StatisticsPage = () => {
  return (
    <StyledContainer>
      <h2>Statistics</h2>
      <StyledContent>
        <Chart/>
        <StyledTable>
          <StatisticsDashboard />
          <StatisticsTable />
        </StyledTable>
      </StyledContent>
    </StyledContainer>
  );
};

export default StatisticsPage;