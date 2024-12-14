import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainOrganism from "../../components/tranzaction/organism";
import style from "./home.module.css";


const TabletHome = () => {
    return (
        <div className={style.homeContainer}>
          <AppHeader />
          <Sidebar />
          <div>
            <Outlet />
          </div>
          <MainOrganism />
        </div>
        
      );
}
export default TabletHome;