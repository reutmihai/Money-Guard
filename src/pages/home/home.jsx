import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import MainOrganism from "../../components/tranzaction/organism";
import style from "./home.module.css";
function Home() {
  return (
    <div className={style.homeContainer}>
    <Header/>
    <Sidebar/>
      {/* <MainOrganism /> */}
      <div className={style.outletContainer}>
        <Outlet/>
      </div>
    </div>
  );
}
export default Home;
