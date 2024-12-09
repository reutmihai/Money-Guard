import PropTypes from "prop-types";
import styles from "./statistics-list.module.css";

const StatisticsList = ({ categories, colors }) => {
  return (
    <ul className={styles.listContainer}>
      {categories.map((category) => (
        <li key={category.name} className={styles.listItem}>
          <span
            className={styles.colorIndicator}
            style={{ backgroundColor: colors[category.name] || "#CCCCCC" }}
          ></span>
          <span className={styles.categoryName}>{category.name}</span>
          <span className={styles.categoryTotal}>
            {category.total.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

StatisticsList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  colors: PropTypes.object.isRequired,
};

export default StatisticsList;
