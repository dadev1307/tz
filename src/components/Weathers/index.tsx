import React from 'react';
import s from './Weathers.module.scss';
import Weather from "../Weather";

interface IWeathers {
    classname?: string,
    showSettings: () => void,
}

const Weathers:React.FC<IWeathers> = ({showSettings}) => {
  return (
    <div className={s.root}>
      <Weather />
    </div>
  );
};

export default Weathers;
