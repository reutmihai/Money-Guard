import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GenericModal from "../modals/generic-modal";
import {
  getTransactions,
  getTransactionCategories,
  updateTransaction,
  removeTransaction,
} from "../../../services/transactionsAPI";
import { useNotification } from "../../notification/notificationContext";
import EditTransactionForm from "../forms/edit-form";
import styles from "./transactionList.module.css";
import sprite from "../../../assets/sprite.svg";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { notify } = useNotification();

  const transactions = useSelector((state) => state.transactions.transactions);
  const categories = useSelector(
    (state) => state.transactions.transactionCategories
  );

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getTransactionCategories());
  }, [dispatch]);

  const getCategoryName = (categoryId) => {
    if (!categories || categories.length === 0) {
      return "No category";
    }
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "No category";
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditing(true);
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      await dispatch(updateTransaction(updatedTransaction));
      notify("Transaction updated successfully!", "success");
      dispatch(getTransactions());
      setSelectedTransaction(null);
      setIsEditing(false);
    } catch (error) {
      notify("Failed to update transaction.", "error");
    }
  };

  const handleCancelEdit = () => {
    setSelectedTransaction(null);
    setIsEditing(false);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await dispatch(removeTransaction(transactionId));
      notify("Transaction deleted successfully!", "success");
      dispatch(getTransactions());
    } catch (error) {
      notify("Failed to delete transaction.", "error");
    }
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
              <span
                className={`${styles.amount} ${
                  transaction.type.toLowerCase() === "income"
                    ? styles.typeIncome
                    : styles.typeExpense
                }`}
              >
                {transaction.type.toLowerCase() === "expense" ? "-" : ""}
                {Math.abs(transaction.amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => handleEditTransaction(transaction)}
                  className={styles.editButton}
                >
                  <svg className={styles["icon-edit"]}>
                    <use xlinkHref={`${sprite}#icon-edit`}></use>
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteTransaction(transaction.id)}
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

      {/* Carduri pentru mobil */}
      {transactions.length > 0 &&
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`${styles.transactionCard} ${
              transaction.type.toLowerCase() === "income"
                ? styles.income
                : styles.expense
            }`}
          >
            <span className={styles.spansMobile}>
              <strong>Date:</strong>{" "}
              {new Date(transaction.transactionDate).toLocaleDateString()}
            </span>
            <span className={styles.spansMobile}>
              <strong>Type:</strong>{" "}
              <span
                className={
                  transaction.type.toLowerCase() === "income"
                    ? styles.typeIncome
                    : styles.typeExpense
                }
              >
                {transaction.type.toLowerCase() === "income" ? "+" : "-"}
              </span>
            </span>
            <span className={styles.spansMobile}>
              <strong>Category:</strong>
              {getCategoryName(transaction.categoryId)}
            </span>
            <span className={styles.spansMobile}>
              <strong>Comment:</strong> {transaction.comment || "No comment"}
            </span>
            <span className={styles.spansMobile}>
              <strong>Sum:</strong>
              <span
                className={`${styles.amount} ${
                  transaction.type.toLowerCase() === "income"
                    ? styles.typeIncome
                    : styles.typeExpense
                }`}
              >
                {transaction.type.toLowerCase() === "expense" ? "-" : ""}
                {Math.abs(transaction.amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </span>
            <div className={styles.transactionCardActions}>
              <button
                onClick={() => handleDeleteTransaction(transaction.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
              <button
                onClick={() => handleEditTransaction(transaction)}
                className={styles.editButton}
              >
                <svg className={styles["icon-edit"]}>
                  <use xlinkHref={`${sprite}#icon-edit`}></use>
                </svg>
                Edit
              </button>
            </div>
          </div>
        ))}

      {isEditing && selectedTransaction && (
        <GenericModal isOpen={isEditing} onClose={handleCancelEdit}>
          <EditTransactionForm
            initialValues={selectedTransaction}
            onSubmit={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </GenericModal>
      )}
    </div>
  );
};

TransactionList.propTypes = {};

export default TransactionList;
