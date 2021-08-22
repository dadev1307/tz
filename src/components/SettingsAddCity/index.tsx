import React, { useState } from 'react';
import cn from 'classnames';
import s from './SettingsAddCity.module.scss';
import Icon from '../Weather/Weather.Icon';
import SearchCity from '../SearchCity';

interface ISettingsAddCity extends React.HTMLAttributes<HTMLDivElement> {
  addCity: (nameCity: string) => void,
}

const SettingsAddCity: React.FC<ISettingsAddCity> = ({ className , addCity}) => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const handleSearchCity = (cityName: string) => {
    setIsSearch(!isSearch);
    addCity(cityName);
  }


  return (
    <div className={cn(s.root, className)}>
      <button onClick={() => setIsSearch(!isSearch)} className={cn(s.btnAdd, {[s.active]: !isSearch})}>
        <Icon name={'add'} /> Добавить
      </button>
      <SearchCity getCityWeather={handleSearchCity} className={cn(s.search, {[s.active]: isSearch})} />
    </div>
  );
};

export default SettingsAddCity;