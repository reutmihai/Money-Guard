import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import styles from "./forms.module.css";
import { updateTransaction } from "../../../services/transactionsAPI";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "./dropdown/custom-dropdown";
import { useNotification } from "../../notification/notificationContext";

const EditTransactionForm = ({ initialValues, onCancel }) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.transactions.transactionCategories
  );
  const { notify } = useNotification();

  const handleSubmit = async (values, { setErrors }) => {
    const errors = {};

    if (!values.amount || values.amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }

    if (!values.transactionDate) {
      errors.transactionDate = "Date is required";
    }

    if (values.type === "EXPENSE" && !values.categoryId) {
      errors.categoryId = "Category is required for expenses";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const dataToSend = {
      transactionDate: new Date(values.transactionDate).toISOString(),
      type: values.type,
      comment: values.comment,
      amount:
        values.type === "INCOME"
          ? Math.abs(values.amount)
          : -Math.abs(values.amount),
      categoryId: values.type === "EXPENSE" ? values.categoryId : undefined,
    };

    try {
      await dispatch(
        updateTransaction({
          id: values.id,
          data: dataToSend,
        })
      ).unwrap();

      notify("Transaction updated successfully!", "success");
    } catch (error) {
      notify(error.response?.data || error.message, "error");
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className={styles.formContainer}>
          <h2 className={styles.formTitle}>Edit Transaction</h2>

          <div className={styles.toggleContainer}>
            <span
              className={`${styles.toggleText} ${
                values.type === "INCOME" ? styles.activeIncomeText : ""
              }`}
              onClick={() => setFieldValue("type", "INCOME")}
            >
              Income
            </span>
            <span className={styles.toggleDivider}>/</span>
            <span
              className={`${styles.toggleText} ${
                values.type === "EXPENSE" ? styles.activeExpenseText : ""
              }`}
              onClick={() => setFieldValue("type", "EXPENSE")}
            >
              Expense
            </span>
          </div>

          {values.type === "EXPENSE" && (
            <CustomDropdown
              categories={categories}
              value={values.categoryId}
              onChange={(id) => setFieldValue("categoryId", id)}
            />
          )}

          <div className={styles.detailsIncome}>
            <Field
              name="amount"
              type="number"
              className={styles.detailsIncomeDate}
              placeholder="0.00"
              min="0"
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
            />

            <Field
              name="transactionDate"
              type="date"
              className={styles.detailsIncomeDate}
            />
          </div>
            <Field
              name="comment"
              type="text"
              className={styles.detailsComment}
              placeholder="Comment"
            />

          <div className={styles.formBtns}>
            <button type="submit" className={styles.btnAdd}>
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={styles.btnCancelTranzaction}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

EditTransactionForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTransactionForm;
