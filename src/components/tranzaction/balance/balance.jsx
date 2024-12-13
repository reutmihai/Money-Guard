import { useSelector } from "react-redux";
import styles from "./balance.module.css";

const Balance = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const totalBalance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const balanceStyle =
    totalBalance >= 0 ? styles.positiveBalance : styles.negativeBalance;

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.balanceTitle}>YOUR BALANCE</h2>
      <p className={`${styles.balanceAmount} ${balanceStyle}`}>
        ${totalBalance.toFixed(2)}
      </p>
    </div>
  );
};

export default Balance;
