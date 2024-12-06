import Chart from "../components/Statistics/Chart";
import { StyledContainer, StyledContent, StyledTable } from "../components/Statistics/Statistics.styled";
import StatisticsDashboard, { StatisticsTable } from "../components/Statistics/StatisticsDashbord.jsx";

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

export default StatisticsPage