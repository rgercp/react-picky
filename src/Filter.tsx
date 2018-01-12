import * as React from 'react';
import { FilterProps } from './types';

const Filter: React.SFC<FilterProps> = (props: FilterProps) => (
  <div className="picky__filter">
    <input
      type="text"
      className="picky__filter__input"
      placeholder="Filter..."
      tabIndex={props.tabIndex}
      aria-label="filter options"
      onChange={event => props.onFilterChange(event.target.value)}
    />
  </div>
);
export default Filter;
