import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogOut } from '../../services/authAPI';
import exit from '../../assets/exit.svg';
import style from './LogOut.module.css';
import { selectUsername } from '../../redux/selectors';
import { useState } from 'react';

// import StatisticsPage from "./StatisticsPage";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUsername);
  const [open, setIsOpen] = useState(false);

  const logoutUser = () => {
    dispatch(handleLogOut())
      .unwrap()
      .then(() => {
        setIsOpen(false);
        navigate('/Money-Guard/login', { replace: true });
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <>
      <div className={style.userContainer}>
        <div>
          <p className={style.userName}>{user}</p>
        </div>
        <div onClick={() => setIsOpen(true)} className={style.logoutContainer}>
          <img src={exit} alt='exit icon' className={style.icon} />
        </div>
      </div>
      {open && (
        <div className={style.confirmModal}>
          <img src={logo} className={style.logo} />
          <p className={style.appName}>Money Guard</p>
          <p className={style.confirmText}>Are you sure you want to log out?</p>
          <button onClick={logoutUser} className={style.confirmBtn}>
            LOGOUT
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={style.cancelBtn}>
            CANCEL
          </button>
        </div>
      )}
    </>
  );
}
export default LogOut;
