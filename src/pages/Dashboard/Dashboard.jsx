import LogOut from "./LogOut";
import styles from "./Dashboard.module.css";
// import Balance from "../../components/tranzaction/balance/balance";
// import Currency from "../../components/Currency/Currency";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div>
        <LogOut />
      </div>
      <div>
        <div>
          {/* <Balance />
          <Currency /> */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
