import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const notify = (message, type = "success", id) => {
    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      toastId: id,
    };

    if (type === "success") {
      toast.success(message, {
        ...options,
        icon: "✅",
      });
    }
    if (type === "error") {
      toast.error(message, {
        ...options,
        icon: "❌",
      });
    }
    if (type === "info") {
      toast.info(message, {
        ...options,
        icon: "ℹ️",
      });
    }
    if (type === "warning") {
      toast.warn(message, {
        ...options,
        icon: "⚠️",
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
