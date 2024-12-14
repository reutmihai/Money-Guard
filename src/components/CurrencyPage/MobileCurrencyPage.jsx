import Currency from "../Currency/Currency";
import style from './MobileCurrencyPage.module.css'

const MobileCurrencyPage = () => {
    return(
        <div className={style.currencyPage}>
            <Currency/>
        </div>
    )
}
export default MobileCurrencyPage;