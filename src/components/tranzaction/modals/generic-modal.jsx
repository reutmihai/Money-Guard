import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "./modal.module.css";

const GenericModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (isOpen) {
      rootElement.classList.add("blur");
    } else {
      rootElement.classList.remove("blur");
    }

    return () => {
      rootElement.classList.remove("blur");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modalWrapper}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

GenericModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default GenericModal;
