import React from 'react';
import s from './SearchCity.module.scss';

const SearchCity = () => {
  return (
    <div className={s.root}>
      <input type='text' placeholder='Введите свой город'/>
    </div>
  );
};

export default SearchCity;
