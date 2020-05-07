import React, { useState } from 'react';

const Filter = (props) => {
  const { filter, setFilter } = props;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />{' '}
    </div>
  );
};

export default Filter;
