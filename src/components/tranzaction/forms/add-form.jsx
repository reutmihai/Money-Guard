import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./forms.module.css";

const AddTransactionForm = ({ onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Transaction type is required"),
    sum: Yup.number()
      .required("Sum is required")
      .positive("Sum must be greater than 0"),
    date: Yup.date().required("Date is required"),
    category: Yup.string().when("type", {
      is: "expense",
      then: Yup.string().required("Category is required for expenses"),
    }),
    comment: Yup.string().optional(),
  });

  const initialValues = {
    type: "expense",
    sum: "",
    date: new Date(),
    category: "",
    comment: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.formContainer}>
          <h2 className={styles.formTitle}>Add transaction</h2>
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
            <div>
              <Field
                className={styles.detailsCategory}
                name="category"
                type="text"
                placeholder="Select a category"
              />
            </div>
          )}
          <div className={styles.detailsIncome}>
            <div>
              <Field
                className={styles.detailsIncomeDate}
                name="sum"
                type="number"
                placeholder="0.00"
              />
            </div>
            <div>
              <Field
                className={styles.detailsIncomeDate}
                name="date"
                type="date"
              />
            </div>
          </div>

          <div>
            <Field
              className={styles.detailsComment}
              name="comment"
              type="text"
              placeholder="Comment"
            />
          </div>

          <div className={styles.formBtns}>
            <button className={styles.btnAdd} type="submit">
              Add
            </button>
            <button
              className={styles.btnCancelTranzaction}
              type="button"
              onClick={onCancel}
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
};

export default AddTransactionForm;
