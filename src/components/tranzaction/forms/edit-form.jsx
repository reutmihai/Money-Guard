import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./forms.module.css";

const EditTransactionForm = ({ initialValues, onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    sum: Yup.number().required("Sum is required").positive("Must be positive"),
    date: Yup.date().required("Date is required"),
    comment: Yup.string().optional(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className={styles.formContainer}>
          <h2 className={styles.formTitle}>Edit Transaction</h2>
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
          <div>
            <Field
              className={styles.detailsComment}
              name="comment"
              type="text"
              placeholder="Comment"
            />
          </div>
          <div className={styles.formBtns}>
            <button className={styles.btnSave} type="submit">
              Save
            </button>
            <button
              className={styles.btnCancel}
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

EditTransactionForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTransactionForm;
