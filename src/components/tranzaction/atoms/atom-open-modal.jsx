import PropTypes from "prop-types";
import styles from "../modals/modal.module.css";

const OpenModalButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.openModalBtn}>
      +
    </button>
  );
};

OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default OpenModalButton;
