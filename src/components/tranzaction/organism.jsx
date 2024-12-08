import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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
import Balance from "./balance/balance";
import styles from "./modals/modal.module.css";

const MainOrganism = ({ children }) => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.transactions);
  const transactionCategories = useSelector(
    (state) => state.transactions.transactionCategories
  );

  const [activeModal, setActiveModal] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const totalBalance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Category ID is required for expense transactions.",
      });
      return;
    }

    try {
      await dispatch(addTransaction(dataToSend));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transaction added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      dispatch(getTransactions());
      setActiveModal(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data || error.message,
      });
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await dispatch(removeTransaction(transactionId));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Transaction deleted successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      dispatch(getTransactions());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setActiveModal("edit");
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      await dispatch(updateTransaction(updatedTransaction));
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Transaction updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      dispatch(getTransactions());
      setActiveModal(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <div className={activeModal ? styles.blurBackground : ""}>
        <main>{children}</main>

        <Balance totalBalance={totalBalance} />

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
