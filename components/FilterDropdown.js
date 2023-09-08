import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DropdownFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('');

  const handleChangeFilter = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);
  };

  return (
    <div>
      <select
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      >
        <option value="">-- Please Select --</option>
        <option value="alpha">A-Z</option>
        <option value="date">Release Date</option>
        <option value="artist">Artist</option>
      </select>
    </div>
  );
};

DropdownFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default DropdownFilter;
