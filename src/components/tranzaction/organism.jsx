import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTransaction,
  addTransaction,
  getTransactions,
  removeTransaction,
  getTransactionCategories,
} from "../../services/transactionsAPI";
import OpenModalButton from "./atoms/atom-open-modal";
import TransactionList from "./lists/tranzaction-list";
import AddTransactionForm from "./forms/add-form";
import EditTransactionForm from "./forms/edit-form";
import GenericModal from "./modals/generic-modal";
import { useNotification } from "../../components/notification/notificationContext";
import Balance from "./balance/balance";
import styles from "./modals/modal.module.css";

const MainOrganism = ({ children }) => {
  const dispatch = useDispatch();
  const { notify } = useNotification();

  const transactions = useSelector((state) => state.transactions.transactions);
  const transactionCategories = useSelector(
    (state) => state.transactions.transactionCategories
  );

  const [activeModal, setActiveModal] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getTransactionCategories());
  }, [dispatch]);

  const handleAddTransaction = async (transactionData) => {
    const isIncome = transactionData.type.toUpperCase() === "INCOME";

    const dataToSend = {
      transactionDate: new Date(transactionData.date).toISOString(),
      type: transactionData.type.toUpperCase(),
      amount: isIncome
        ? Math.abs(transactionData.sum)
        : -Math.abs(transactionData.sum),
      comment: transactionData.comment,
      categoryId: isIncome
        ? "063f1132-ba5d-42b4-951d-44011ca46262"
        : transactionData.categoryId,
    };

    if (!isIncome && !transactionData.categoryId) {
      notify("Category ID is required for expense transactions.", "error");
      return;
    }

    try {
      await dispatch(addTransaction(dataToSend));
      notify("Transaction added successfully!", "success");
      dispatch(getTransactions());
      setActiveModal(null);
    } catch (error) {
      notify(error.response?.data || error.message, "error");
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await dispatch(removeTransaction(transactionId));
      notify("Transaction deleted successfully!", "success");
      dispatch(getTransactions());
    } catch (error) {
      notify(error.message, "error");
    }
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setActiveModal("edit");
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      await dispatch(updateTransaction(updatedTransaction));
      notify("Transaction updated successfully!", "success");
      dispatch(getTransactions());
      setActiveModal(null);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div className={styles.organismContainer}>
      <div className={activeModal ? styles.blurBackground : ""}>
        <main>{children}</main>

        <div className={styles.list}>
          <TransactionList
            transactions={transactions}
            categories={transactionCategories}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </div>
        <OpenModalButton onClick={() => setActiveModal("add")} />
      </div>
      <GenericModal
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
      >
        <AddTransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setActiveModal(null)}
          categories={transactionCategories}
        />
      </GenericModal>

      <GenericModal
        isOpen={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
      >
        {selectedTransaction ? (
          <EditTransactionForm
            initialValues={selectedTransaction}
            onCancel={() => setActiveModal(null)}
            onSubmit={handleSaveEdit}
          />
        ) : (
          <p>Select a transaction to edit.</p>
        )}
      </GenericModal>
    </div>
  );
};

MainOrganism.propTypes = {
  children: PropTypes.node,
};

export default MainOrganism;
