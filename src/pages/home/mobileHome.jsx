import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import MainOrganism from "../../components/tranzaction/organism";

import style from "./home.module.css";
import MobileNavBar from "../../components/Sidebar/mobileNavBar";
function MobileHome() {
  return (
    <div className={style.mobileHomeContainer}>
      <AppHeader />
      <MobileNavBar/>
      <div>
        <Outlet />
      </div>
      <MainOrganism />
    </div>
    
  );
}
export default MobileHome;
