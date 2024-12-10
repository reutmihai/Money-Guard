import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogOut } from '../../services/authAPI';
import exit from '../../assets/exit.svg';
import style from './LogOut.module.css';
import { selectUsername } from '../../redux/selectors';

// import StatisticsPage from "./StatisticsPage";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUsername);

  const handleLogout = () => {
    dispatch(handleLogOut())
      .unwrap()
      .then(() => {
        navigate('/Money-Guard/login', { replace: true });
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className={style.userContainer}>
      <div>
        <p className={style.userName}>{user}</p>
      </div>
      <div onClick={handleLogout} className={style.logoutContainer}>
        <img src={exit} alt='exit icon' className={style.icon} />
        <p className={style.logoutText}>
          Exit
        </p>
      </div>
    </div>
  );
}
export default LogOut;
