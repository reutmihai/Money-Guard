import React from 'react';
import { Chart } from './Chart.jsx';
import StatisticsDashboard from './components/Statistics/StatisticsDashboard.jsx';
import StatisticsTable from './components/Statistics/StatisticsDashboard.jsx';
import {
  StyledContainer,
  StyledContent,
  StyledTable,
} from './components/Statistics/Statistics.styled.js';

const StatisticsPage = () => {
  return (
    <StyledContainer>
      <h2>Statistics</h2>
      <StyledContent>
        <Chart />
        <StyledTable>
          <StatisticsDashboard />
          <StatisticsTable />
        </StyledTable>
      </StyledContent>
    </StyledContainer>
  );
};

export default StatisticsPage;