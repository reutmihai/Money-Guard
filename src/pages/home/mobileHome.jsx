import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import MobileNavBar from '../../components/Sidebar/MobileNavBar'
import MainOrganism from "../../components/tranzaction/organism";
import style from "./home.module.css";


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
