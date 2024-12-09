import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./statistics-chart.module.css";
import { useEffect, useRef } from "react";
import { schemeCategory10 } from "d3-scale-chromatic";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = ({ data, totalBalance, onColorsGenerated }) => {
  const colorsRef = useRef({});

  useEffect(() => {
    const generateColors = (categories) => {
      const categoryColors = {};
      categories.forEach((category, index) => {
        categoryColors[category.name] =
          schemeCategory10[index % schemeCategory10.length];
      });
      return categoryColors;
    };

    if (data && data.length > 0) {
      const newColors = generateColors(data);
      if (JSON.stringify(colorsRef.current) !== JSON.stringify(newColors)) {
        colorsRef.current = newColors;
        if (onColorsGenerated) {
          onColorsGenerated(newColors);
        }
      }
    }
  }, [data, onColorsGenerated]);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: data.map(
          (item) => colorsRef.current[item.name] || "#CCCCCC"
        ),
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
    cutout: "70%",
  };

  return (
    <div className={styles.chartContainer}>
      <Doughnut data={chartData} options={options} />
      <div className={styles.centerText}>{totalBalance.toLocaleString()}</div>
    </div>
  );
};

StatisticsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalBalance: PropTypes.number.isRequired,
  onColorsGenerated: PropTypes.func,
};

export default StatisticsChart;
