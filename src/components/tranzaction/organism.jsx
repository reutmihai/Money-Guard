import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import GenericModal from "./modals/generic-modal";
import AddTransactionForm from "./forms/add-form";
import EditTransactionForm from "./forms/edit-form";
import TransactionList from "./lists/tranzaction-list";
import styles from "./modals/modal.module.css";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  removeTransaction,
} from "../../services/transactionsAPI";

const MainOrganism = ({ children }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.transactions?.transactions || []
  );
  const balance = useSelector((state) => state.transactions?.balance || 0);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleAddSubmit = async (values) => {
    await dispatch(addTransaction(values)).unwrap();
    setIsAddOpen(false);
  };

  const handleEditSubmit = async (values) => {
    await dispatch(updateTransaction(values)).unwrap();
    setIsEditOpen(false);
  };

  const handleDelete = async (id) => {
    await dispatch(removeTransaction(id)).unwrap();
  };

  return (
    <>
      <main>{children}</main>
      <header className={styles.header}>
        {/* <h2 className={styles.balanceTitle}>Balance</h2> */}
        <p className={styles.balanceAmount}>${balance.toFixed(2)}</p>
      </header>
      <footer className="main-footer">
        <button
          className={styles.openModalBtn}
          onClick={() => setIsAddOpen(true)}
        >
          +
        </button>
      </footer>

      {/* Modal pentru Adăugare */}
      <GenericModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddTransactionForm
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddOpen(false)}
        />
      </GenericModal>

      {/* Modal pentru Editare */}
      {editData && (
        <GenericModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <EditTransactionForm
            initialValues={editData}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditOpen(false)}
          />
        </GenericModal>
      )}

      {/* Listă de Tranzacții */}
      <TransactionList
        transactions={transactions}
        onEdit={(data) => {
          setEditData(data);
          setIsEditOpen(true);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

MainOrganism.propTypes = {
  children: PropTypes.node, // Eliminat `.isRequired`
};

export default MainOrganism;
