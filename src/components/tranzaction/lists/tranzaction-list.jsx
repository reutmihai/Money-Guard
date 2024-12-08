import PropTypes from "prop-types";
import styles from "./transactionList.module.css";

const TransactionList = ({
  transactions,
  categories = [],
  onDelete,
  onEdit,
}) => {
  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    if (!categories || categories.length === 0) {
      return "No category";
    }
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No category";
  };

  return (
    <div className={styles.transactionListContainer}>
      <div className={styles.transactionTable}>
        <div className={styles.tableHeader}>
          <span>Date</span>
          <span>Type</span>
          <span>Category</span>
          <span>Comment</span>
          <span>Sum</span>
          <span>Actions</span>
        </div>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className={styles.tableRow}>
              <span>
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </span>
              <span
                className={
                  transaction.type.toLowerCase() === "income"
                    ? styles.typeIncome
                    : styles.typeExpense
                }
              >
                {transaction.type.toLowerCase() === "income" ? "+" : "-"}
              </span>
              <span>{getCategoryName(transaction.categoryId)}</span>
              <span>{transaction.comment || "No comment"}</span>
              <span className={styles.amount}>
                {Math.abs(transaction.amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => onEdit(transaction)}
                  className={styles.editButton}
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noTransactions}>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      transactionDate: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      categoryId: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TransactionList;
