import React from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  let classes: Array<any> = [];
  // Незнаю как правильно работать с CSS Exports что бы приходили название из пропсах и использовали их. Поэтому пока поставил ts-ignore. А так всё работает
  if (className) {
    classes = className.split(' ').map((it) => {
      return s[it as keyof typeof s] || it;
    });
  }

  return (
    <button type="button" className={cn(s.root, classes)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
