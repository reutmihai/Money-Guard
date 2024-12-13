import Balance from '../tranzaction/balance/balance';
import style from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { getSvg } from '../NavSVG/NavSVG';
import { useState } from 'react';


const MobileNavBar = () => {
  const [homeLogo, setHomeLogo] = useState('homeLogo');
  const [statsLogo, setStatsLogo] = useState('statsLogo');
  const [currencyLogo, setCurrencyLogo] = useState('currencyLogo');
  return (
    <>
      <div className={style.mobileNavLinksContainer}>
        <NavLink
          onClick={isActive =>
            isActive &&
            (setHomeLogo('homeLogoColor'), setStatsLogo('statsLogo'), setCurrencyLogo('currencyLogo'))
          }
          className={({ isActive }) =>
            isActive ? `${style.navigation} ${style.active}` : style.navigation
          }
          to=''
          end>
          <img src={getSvg(homeLogo)} className={style.icon} />
        </NavLink>

        <NavLink
          onClick={isActive =>
            isActive &&
            (setHomeLogo('homeLogo'), setStatsLogo('statsLogoColor'),setCurrencyLogo('currencyLogo'))
          }
          className={({ isActive }) =>
            isActive ? `${style.navigation} ${style.active}` : style.navigation
          }
          to='statistics'>
          <img src={getSvg(statsLogo)} className={style.icon} />
        </NavLink>
        <NavLink
          onClick={isActive =>
            isActive &&
            (setHomeLogo('homeLogo'), setStatsLogo('statsLogo'),setCurrencyLogo('currencyLogoColor'))
          }
          className={({ isActive }) =>
            isActive ? `${style.navigation} ${style.active}` : style.navigation
          }
          to='currency'>
          <img src={getSvg(currencyLogo)} className={style.icon} />
        </NavLink>
      </div>
      <Balance/>
    </>
  );
};
export default MobileNavBar;
