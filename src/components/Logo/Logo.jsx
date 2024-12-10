import logo from '../../assets/logo.svg'
import style from './Logo.module.css'
const Logo = () => {
    return(
        <div className={style.logoContainer}>
            <img src={logo} className={style.logo}/>
            <p className={style.logoText}>Money Guard</p>
        </div>
    )
}
export default Logo;