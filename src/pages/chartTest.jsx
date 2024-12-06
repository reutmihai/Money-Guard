import React from 'react';
import Chart from '../components/Statistics/Chart';

const TestChartPage = () => {
  const testData = [
    { label: 'Entertainment', value: 300 },
    { label: 'Car', value: 100 },
  ];

  return (
    <div>
      <h2>Test Chart</h2>
      <Chart data={testData} />
    </div>
  );
};

export default TestChartPage;

