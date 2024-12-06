import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyData,
  selectCurrencyLoading,
  selectCurrencyError,
} from "../../redux/selectors";
import { getCurrency } from "../../redux/operations";
import s from "./Currency.module.css";
import imageTab from "../../assets/images/currency.png";

const Currency = () => {
  const currency = useSelector(selectCurrencyData);
  const isLoading = useSelector(selectCurrencyLoading);
  const error = useSelector(selectCurrencyError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  const rateBuyDollar = currency?.dollar.rateBuy.toFixed(2);
  const rateSellDollar = currency?.dollar.rateSell.toFixed(2);
  const rateBuyEuro = currency?.euro.rateBuy.toFixed(2);
  const rateSellEuro = currency?.euro.rateSell.toFixed(2);

  return (
    <div className={s.currency_wrapper}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && currency && (
        <div className={s.currency_table}>
          <ul className={s.currency_table_head}>
            <li className={s.currency_item}>Currency</li>
            <li className={s.currency_item}>Purchase</li>
            <li className={s.currency_item}>Sale</li>
          </ul>
          <ul className={s.table_body}>
            <li className={s.currency_tr}>
              <p className={s.currency}>USD</p>
              <p className={s.currency}>{rateBuyDollar}</p>
              <p className={s.currency}>{rateSellDollar}</p>
            </li>
            <li className={s.currency_tr}>
              <p className={s.currency}>EUR</p>
              <p className={s.currency}>{rateBuyEuro}</p>
              <p className={s.currency}>{rateSellEuro}</p>
            </li>
          </ul>
        </div>
      )}
      <img src={imageTab} alt="Currency" />
    </div>
  );
};

export default Currency;
