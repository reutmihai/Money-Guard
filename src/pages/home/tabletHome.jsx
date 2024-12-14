import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import MainOrganism from "../../components/tranzaction/organism";
import style from "./home.module.css";
import TabletNavBar from "../../components/Sidebar/TabletNavBar";


const TabletHome = () => {
    return (
        <div className={style.TabletHomeContainer}>
          <AppHeader />
          <TabletNavBar/>
          <div className={style.tabletOutlet}>
            <Outlet />
          </div>
          <MainOrganism />
        </div>
        
      );
}
export default TabletHome;