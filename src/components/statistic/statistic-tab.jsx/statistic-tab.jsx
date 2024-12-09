import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsSummary } from "../../../services/transactionsAPI";
import StatisticsChart from "../statistic-chart/statistic-chart";
import StatisticsList from "../statistic-list/statistic-lists";
import Dropdown from "../dropdown/dropdown";
import styles from "./statistics-tab.module.css";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const { categoriesSummary, periodTotal } = useSelector(
    (state) => state.transactions
  );

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [categoryColors, setCategoryColors] = useState({});
  const [transactionTrigger, setTransactionTrigger] = useState(0);

  const handleColorsGenerated = (colors) => {
    setCategoryColors(colors);
  };

  useEffect(() => {
    dispatch(getTransactionsSummary({ month, year }));
  }, [dispatch, month, year, transactionTrigger]);

  const handleTransactionChange = () => {
    setTransactionTrigger((prev) => prev + 1);
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  const totalIncome = categoriesSummary
    ? categoriesSummary
        .filter((item) => item.total > 0)
        .reduce((sum, item) => sum + item.total, 0)
    : 0;

  const totalExpense = categoriesSummary
    ? categoriesSummary
        .filter((item) => item.total < 0)
        .reduce((sum, item) => sum + item.total, 0)
    : 0;

  return (
    <div className={styles.statisticsTab}>
      <div>
        <h3 className={styles.title}>Statistics</h3>

        <StatisticsChart
          data={categoriesSummary || []}
          totalBalance={periodTotal || 0}
          onColorsGenerated={handleColorsGenerated}
        />
      </div>
      <div className={styles.chartAndListContainer}>
        <div className={styles.dashboardContainer}>
          <Dropdown
            options={monthOptions}
            selectedValue={month}
            onChange={(value) => setMonth(Number(value))}
            placeholder="Select Month"
          />
          <Dropdown
            options={yearOptions}
            selectedValue={year}
            onChange={(value) => setYear(Number(value))}
            placeholder="Select Year"
          />
        </div>
        <div>
          <StatisticsList
            categories={categoriesSummary || []}
            colors={categoryColors}
            onTransactionChange={handleTransactionChange}
          />
          <div className={styles.balanceContainer}>
            <div className={styles.expense}>
              <span> Expenses:</span>
              <span>{totalExpense.toLocaleString()}</span>
            </div>
            <div className={styles.income}>
              <span> Income:</span>
              <span>{totalIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
