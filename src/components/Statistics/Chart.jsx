import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectCategoriesSummary, selectExpenseSummary } from '../../redux/selectors';

ChartJS.register(...registerables);

export const coloredCategoriesMap = new Map([
  ['Entertainment', '#ff85d2'],
  ['Car', 'rgb(255, 104, 109)'],
  ['Products', 'rgb(255, 157, 137)'],
  ['Main expenses', 'rgb(254, 208, 87)'],
  ['Leisure', 'rgb(91, 255, 167)'],
  ['Other expenses', 'rgb(0, 173, 95)'],
  ['Education', 'rgb(115, 222, 255)'],
  ['Self care', 'rgb(170, 154, 255)'],
  ['Child care', 'rgb(87, 101, 255)'],
  ['Household products', 'rgb(114, 61, 239)'],
]);

const formatNumber = number => {
  return Math.abs(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ');
};

export default function Chart() {
  const isDekstop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ minWidth: 320 });

  let doughnutSize = 288;
  if (isDekstop) {
    doughnutSize = 288;
  } else if (isTablet) {
    doughnutSize = 336;
  } else if (isMobile) {
    doughnutSize = 280;
  }

  const categoriesSummary = useSelector(selectCategoriesSummary);
  const expenseSummary = useSelector(selectExpenseSummary);

  const periodSummary = categoriesSummary
    ? categoriesSummary
        .filter(category => category.type === 'EXPENSE')
        .map(category => ({
          ...category,
          color: coloredCategoriesMap.get(category.name),
        }))
        .sort((a, b) => a.total - b.total)
    : [];

  const data = {
    datasets: [
      {
        data: periodSummary.map(expense => expense.total),
        backgroundColor: periodSummary.map(expense => expense.color),
        boxShadow: '0px 0px 8px 0px #000 inset',
      },
    ],
  };

  const noData = {
    datasets: [
      {
        data: [0.0000000001],
        backgroundColor: ['rgba(111, 111, 111, 0.7)'],
      },
    ],
  };

  const options = {
    cutout: '70%',
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    width: { doughnutSize },
    height: { doughnutSize },
  };

  return (
    <div
      style={{
        width: `${doughnutSize}px`,
        height: `${doughnutSize}px`,
        position: 'relative',
      }}
    >
      {periodSummary.length ? (
        <Doughnut data={data} options={options} />
      ) : (
        <Doughnut data={noData} options={options} />
      )}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '18px',
            fontFamily: "'Poppins-SemiBold', sans-serif",
            color: 'var(--white)',
          }}
        >
          RON {formatNumber(expenseSummary)}
        </span>
      </div>
    </div>
  );
}
