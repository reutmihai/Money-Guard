import Balance from '../tranzaction/balance/balance';
import Currency from '../Currency/Currency';
import style from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { getSvg } from '../NavSVG/NavSVG';
import { useState } from 'react';

const TabletNavBar = () => {
  const [homeLogo, setHomeLogo] = useState('homeLogo');
  const [statsLogo, setStatsLogo] = useState('statsLogo');
  return (
    <>
      <div className={style.tabletContainer}>
        <div className={style.tabletMainContainer}>
        <div className={style.tabletNavLinksContainer}>
          <NavLink
            onClick={isActive =>
              isActive &&
              (setHomeLogo('homeLogoColor'), setStatsLogo('statsLogo'))
            }
            className={({ isActive }) =>
              isActive
                ? `${style.navigation} ${style.active}`
                : style.navigation
            }
            to=''
            end>
            <img src={getSvg(homeLogo)} className={style.icon} />
            Home
          </NavLink>

          <NavLink
            onClick={isActive =>
              isActive &&
              (setHomeLogo('homeLogo'), setStatsLogo('statsLogoColor'))
            }
            className={({ isActive }) =>
              isActive
                ? `${style.navigation} ${style.active}`
                : style.navigation
            }
            to='statistics'>
            <img src={getSvg(statsLogo)} className={style.icon} />
            Statistics
          </NavLink>
        </div>
        <Balance />
        </div>
        <Currency />
      </div>
    </>
  );
};
export default TabletNavBar;
