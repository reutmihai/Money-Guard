import LogOut from "../LogOut/LogOut";
import Logo from "../Logo/Logo";
import style from './Header.module.css'

const Header = () => {
    return(
        <div className={style.header}>
        <Logo/>
        <LogOut/>  
        </div>
    )
}
export default Header;