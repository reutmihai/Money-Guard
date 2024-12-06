import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { fetchTransSumThunk } from './fetchTransSumThunk.jsx';
import { useMediaQuery } from 'react-responsive';
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import {
  StyledCategory,
  StyledExpenses,
  StyledIncome,
  StyledItem,
  StyledList,
  StyledListContainer,
  StyledNoTransactions,
} from './Statistics.styled.js';
import { selectCategoriesSummary } from '../../redux/selectors';
import { coloredCategoriesMap } from './Chart';

const StatisticsDashboard = () => {
  const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const currentMonth = new Date().getMonth() + 1;
  const startingYear = 2020;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= startingYear; year--) {
    years.push({ value: year, label: `${year}` });
  }

  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(years[0].value);

  const handleMonthChange = selectData => {
    setSelectedMonth(selectData.value);
    dispatch(fetchTransSumThunk({ month: selectData.value, year: selectedYear }));
  };

  const handleYearChange = selectData => {
    setSelectedYear(selectData.value);
    dispatch(fetchTransSumThunk({ month: selectedMonth, year: selectData.value }));
  };

  useEffect(() => {
    dispatch(fetchTransSumThunk({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const selectStyle = {
    container: styles => ({
      ...styles,
      fontFamily: "'Poppins-Regular', sans-serif",
      width: isTabletOrDesktop ? '50%' : '100%',
    }),
    control: styles => ({
      ...styles,
      backgroundColor: 'rgba(74, 86, 226, 0.1)',
      marginBottom: '-6px',
      outline: 'none',
      borderRadius: '8px',
      height: '50px',
      paddingRight: '13px',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
        border: '1px solid rgba(255, 255, 255, 0.6)',
      },
    }),
    singleValue: styles => ({
      ...styles,
      color: '#FBFBFB',
      fontSize: '16px',
    }),
    placeholder: styles => ({
      ...styles,
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '16px',
    }),
    menu: styles => ({
      ...styles,
      borderRadius: '8px',
      backgroundColor: 'white',
      fontFamily: "'Poppins-Regular', sans-serif",
      fontSize: '16px',
      fontWeight: '400',
    }),
    option: (styles, { isFocused, isSelected }) => {
      if (isFocused) {
        return {
          ...styles,
          background: '#FFFFFF1A',
          color: '#FF868D',
        };
      } else if (isSelected) {
        return {
          ...styles,
          background: 'transparent',
        };
      } else {
        return {
          ...styles,
        };
      }
    },
    menuList: base => ({
      ...base,
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#BFB4DD',
        borderRadius: '12px',
      },
    }),
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <SlArrowUp size={18} label="Arrow up" color={'var(--white)'} />
        ) : (
          <SlArrowDown size={18} label="Arrow down" color={'var(--white)'} />
        )}
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="App">
      <Select
        required
        options={months}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        placeholder="Select month"
        styles={selectStyle}
        isSearchable={false}
        onChange={handleMonthChange}
        defaultValue={months[selectedMonth - 1]}
      />
      <Select
        required
        options={years}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        placeholder="Select year"
        styles={selectStyle}
        isSearchable={false}
        onChange={handleYearChange}
        defaultValue={years.find(year => year.value === selectedYear)}
      />
    </div>
  );
};

const formatNumber = number => {
  return Math.abs(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ');
};

const StatisticsTable = () => {
  const summary = useSelector(selectCategoriesSummary);

  const dispatch = useDispatch();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(fetchTransSumThunk({ month: currentMonth, year: currentYear }));
  }, [dispatch, currentMonth, currentYear]);

  const periodSummary = summary.categoriesSummary
    ? summary.categoriesSummary
        .filter(category => category.type === 'EXPENSE')
        .map(category => ({
          ...category,
          color: coloredCategoriesMap.get(category.name),
        }))
        .sort((a, b) => a.total - b.total)
    : [];

  return (
    <>
      <StyledCategory>
        <p>Category</p>
        <p>Sum</p>
      </StyledCategory>
      <StyledListContainer>
        <StyledList>
          {periodSummary.length ? (
            periodSummary.map((category, index) => (
              <StyledItem key={index}>
                <div>
                  <span style={{ backgroundColor: category.color }} />
                  <p>{category.name}</p>
                </div>
                <p>{formatNumber(category.total)}</p>
              </StyledItem>
            ))
          ) : (
            <StyledNoTransactions>
              You don't have any transactions in this period
            </StyledNoTransactions>
          )}
        </StyledList>
      </StyledListContainer>
      <StyledExpenses>
        <h3>Expenses:</h3>
        <p>{formatNumber(summary.expenseSummary)}</p>
      </StyledExpenses>
      <StyledIncome>
        <h3>Income:</h3>
        <p>{formatNumber(summary.incomeSummary)}</p>
      </StyledIncome>
    </>
  );
};

export default StatisticsDashboard;
export { StatisticsTable };
