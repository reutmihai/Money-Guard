import PropTypes from "prop-types";
import styles from "./balance.module.css";

const Balance = ({ totalBalance }) => {
  const balanceStyle =
    totalBalance >= 0 ? styles.positiveBalance : styles.negativeBalance;

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.balanceTitle}>YOUR BALANCE</h2>
      <p className={`${styles.balanceAmount} ${balanceStyle}`}>
        ${totalBalance ? totalBalance.toFixed(2) : "0.00"}
      </p>
    </div>
  );
};

Balance.propTypes = {
  totalBalance: PropTypes.number.isRequired,
};

export default Balance;
