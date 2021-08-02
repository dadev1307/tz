import React from 'react';
import cn from 'classnames'
import s from './ErrorModal.module.scss';
import {Error} from "../../interface/Error";

interface IErrorModal {
    error: Error,
    className?: string
}

const ErrorModal:React.FC<IErrorModal> = ({error, className}) => {
    const {
        icon,
        title,
        text,
        btnText,
        handleError
    } = error;
    
    const handleBtnClick = (e:React.MouseEvent<HTMLButtonElement>):void => {
        e.stopPropagation();
        handleError();
    }
    
    return (
        <div className={cn(s.root, className)}>
            {icon && <div className={s.icon}></div>}
            {title && <h3 className={s.title}>{title}</h3>}
            {text && <p className={s.text}>{text}</p>}
            <button className={s.btn} onClick={handleBtnClick}>{btnText ? btnText : 'Закрыть'}</button>
        </div>
    );
};

export default ErrorModal;