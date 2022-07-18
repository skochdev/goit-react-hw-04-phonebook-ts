import s from './FilterContacts.module.css';
import React from 'react';

type FilterContactsProps = {
  filter: string;
  onFilter: (e: string) => void;
};

export default function FilterContacts({
  filter,
  onFilter,
}: FilterContactsProps) {
  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.value);
  };
  return (
    <input
      className={s.filterInput}
      type="text"
      name="filter"
      value={filter}
      placeholder="Filter contacts by name or number"
      onChange={onFilterChange}
    />
  );
}
