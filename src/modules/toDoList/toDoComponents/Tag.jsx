import React, { useState } from 'react'
import useFiltersContext from '../../Contexts/FiltersContext.jsx';
import './Tag.css';

export default function Tag({ name, filter, color }) {
  const { filtersState, filtersDispatch } = useFiltersContext();

  const [filters, setFilters] = useState(filter);

  return (
    <span
      className="tag"
      onClick={() => filtersDispatch({filters: filters})}
      style={{ background: color }}
    >{name}</span>
  )
}