import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrencyData,
  selectCurrencyLoading,
  selectCurrencyError,
} from '../../redux/selectors';
import { getCurrency } from '../../redux/operations';
import s from './Currency.module.css';
import imageTab from '../../assets/images/currency.png';

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
        <table className={s.table}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td>{rateBuyDollar}</td>
              <td>{rateSellDollar}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>{rateBuyEuro}</td>
              <td>{rateSellEuro}</td>
            </tr>
          </tbody>
        </table>
      )}
      <img src={imageTab} alt='Currency' />
    </div>
  );
};

export default Currency;
