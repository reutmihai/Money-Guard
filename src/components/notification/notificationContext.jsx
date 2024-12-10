import { createContext, useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const notify = (message, type = "success") => {
    if (type === "success") toast.success(message);
    if (type === "error") toast.error(message);
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
