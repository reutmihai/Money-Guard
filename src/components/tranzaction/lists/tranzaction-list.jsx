import PropTypes from "prop-types";
import styles from "./transactionList.module.css";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className={styles.transactionList}>
      <h2>Transactions</h2>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transactionItem}>
            <span>{transaction.type}</span>
            <span>{transaction.sum} USD</span>
            <span>{transaction.date}</span>
            <button
              className={styles.editButton}
              onClick={() => onEdit(transaction)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(transaction.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionList;
