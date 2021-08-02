import React from 'react';
import s from './Weathers.module.scss';

interface IWeathers {
    classname?: string,
    showSettings: () => void,
}

const Weathers:React.FC<IWeathers> = ({showSettings}) => {
  return (
    <div className={s.root} onClick={showSettings}>
      Weathers
    </div>
  );
};

export default Weathers;
