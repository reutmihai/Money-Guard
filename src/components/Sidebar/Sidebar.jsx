import Balance from '../tranzaction/balance/balance';
import Currency from '../Currency/Currency';
import style from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { getSvg } from '../NavSVG/NavSVG';


// Variables that will change depending on which navlink is active
let homeLogo = 'homeLogo'
let statsLogo = 'statsLogo'


const Sidebar = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.navLinksContainer}>
          <NavLink className={style.navigation} to={'home'}><img className={style.navLogo} src={getSvg(homeLogo)} alt='home logo'/>Home</NavLink>
          <NavLink className={style.navigation} to={'statistics'}><img className={style.navLogo} src={getSvg(statsLogo)} alt='home logo'/>Statistics</NavLink>
        </div>
        <Balance />
        <Currency />
      </div>
    </>
  );
};
export default Sidebar;
