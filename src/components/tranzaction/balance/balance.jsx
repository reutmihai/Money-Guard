import { useSelector } from "react-redux";
import styles from "./balance.module.css";

const Balance = () => {
  const balance = useSelector((state) => state.transactions.balance);

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.balanceTitle}>Current Balance</h2>
      <p className={styles.balanceAmount}>${balance.toFixed(2)}</p>
    </div>
  );
};

export default Balance;
