import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogOut } from "../../services/authAPI";
import styles from "./Dashboard.module.css";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(handleLogOut())
      .unwrap()
      .then(() => {
        localStorage.removeItem("token");
        navigate("/Money-Guard/login", { replace: true });
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className={styles.logOutContainer}>
      <div>
        <h2>Money Guard</h2>
      </div>
      <button onClick={handleLogout}>Log Out</button>
      {/* <StatisticsPage /> */}
    </div>
  );
}
export default LogOut;
