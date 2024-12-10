import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import MainOrganism from "../../components/tranzaction/organism";
// import styles from "./home.module.css";
function Home() {
  return (
    <div>
    <Header/>
    <Sidebar/>
      {/* <MainOrganism /> */}
      <Outlet/>
    </div>
  );
}
export default Home;
