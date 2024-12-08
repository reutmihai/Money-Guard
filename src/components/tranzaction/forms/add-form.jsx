import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./forms.module.css";
import CustomDropdown from "../forms/dropdown/custom-dropdown";

const AddTransactionForm = ({ onSubmit, onCancel, categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleValidation = (values) => {
    const errors = {};

    if (!values.type) {
      errors.type = "Transaction type is required.";
    } else if (values.type === "income" && values.categoryId) {
      errors.categoryId = "Category should not be specified for income.";
    }

    if (!values.sum) {
      errors.sum = "Amount is required.";
    } else if (values.sum <= 0) {
      errors.sum = "Amount must be greater than 0.";
    }

    if (values.type === "expense" && !values.categoryId) {
      errors.categoryId = "Category is required for expenses.";
    }

    if (!values.date) {
      errors.date = "Date is required.";
    }

    return errors;
  };

  const initialValues = {
    type: "expense",
    sum: "",
    date: new Date().toISOString().split("T")[0],
    categoryId: "",
    comment: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={(values) => {
        values.type = values.type.toUpperCase();
        onSubmit(values);
        toast.success("Transaction added successfully!");
      }}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className={styles.formContainer}>
          <h2 className={styles.formTitle}>Add Transaction</h2>

          <div className={styles.toggleContainer}>
            <span
              className={`${styles.toggleText} ${
                values.type === "income" ? styles.activeIncomeText : ""
              }`}
              onClick={() => setFieldValue("type", "income")}
            >
              Income
            </span>
            <div
              className={styles.toggleSlot}
              onClick={() =>
                setFieldValue(
                  "type",
                  values.type === "income" ? "expense" : "income"
                )
              }
            >
              <div
                className={`${styles.toggleButton} ${
                  values.type === "income"
                    ? styles.alignLeft
                    : styles.alignRight
                }`}
              >
                {values.type === "income" ? "+" : "-"}
              </div>
            </div>
            <span
              className={`${styles.toggleText} ${
                values.type === "expense" ? styles.activeExpenseText : ""
              }`}
              onClick={() => setFieldValue("type", "expense")}
            >
              Expense
            </span>
          </div>

          {values.type === "expense" && (
            <div className={styles.dropdownWrapper}>
              <CustomDropdown
                categories={categories}
                value={values.categoryId}
                onChange={(id) => {
                  setFieldValue("categoryId", id);
                  setIsDropdownOpen(false);
                }}
                onOpen={() => setIsDropdownOpen(true)}
                onClose={() => setIsDropdownOpen(false)}
              />

              {touched.categoryId && errors.categoryId && (
                <div className={styles.error}>{errors.categoryId}</div>
              )}
            </div>
          )}

          <div
            className={`${styles.detailsIncome} ${
              isDropdownOpen ? styles.blur : ""
            }`}
          >
            <Field
              name="sum"
              type="number"
              className={styles.detailsIncomeDate}
              placeholder="0.00"
            />
            {touched.sum && errors.sum && (
              <div className={styles.error}>{errors.sum}</div>
            )}

            <Field
              name="date"
              type="date"
              className={styles.detailsIncomeDate}
            />
            {touched.date && errors.date && (
              <div className={styles.error}>{errors.date}</div>
            )}
          </div>
          <div
            className={`${styles.detailsCommentContainer} ${
              isDropdownOpen ? styles.blur : ""
            }`}
          >
            <Field
              name="comment"
              type="text"
              className={styles.detailsComment}
              placeholder="Comment"
            />
            {touched.comment && errors.comment && (
              <div className={styles.error}>{errors.comment}</div>
            )}
          </div>

          <div className={styles.formBtns}>
            <button type="submit" className={styles.btnAdd}>
              Add
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

AddTransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AddTransactionForm;
