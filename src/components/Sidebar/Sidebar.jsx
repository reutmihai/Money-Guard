import Balance from '../tranzaction/balance/balance';
import Currency from '../Currency/Currency';
import style from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
   
      <div className={style.container}>
      <div className={style.navLinksContainer}>
        <NavLink to={'/Money-Guard/home'}>Home</NavLink>
        <NavLink to={'/Money-Guard/statistics'}>Statistics</NavLink>
    </div>
        <Balance />
        <Currency />
      </div>
    </>
  );
};
export default Sidebar;
