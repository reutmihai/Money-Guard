import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./dropdown.module.css";

const CustomDropdown = ({ categories, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.dropdownContainer}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.customDropdown}>
        {value
          ? categories.find((category) => category.id === value)?.name
          : "Select a category"}
      </div>
      {isOpen && (
        <div className={styles.dropdownOptions}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.dropdownOption}
              onClick={() => handleSelect(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CustomDropdown;
