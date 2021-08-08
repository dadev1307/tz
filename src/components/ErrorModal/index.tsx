import React from 'react';
import cn from 'classnames'
import s from './ErrorModal.module.scss';
import {Error} from "../../interface/Error";
import {ReactComponent as WarningSvg} from "./assets/warning.svg";
import {ReactComponent as ErrorSvg} from "./assets/error.svg";
import { useTheme } from '../../context/themeContext';


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
    const {color, theme} = useTheme();
    const handleBtnClick = (e:React.MouseEvent<HTMLButtonElement>):void => {
        e.stopPropagation();
        handleError();
    }
    
    const getIconByName = (iconName: string) => {
        switch (iconName) {
            case 'warning':
                return <WarningSvg className={cn([s.icon, s[color]])} />;
            case 'error':
                return <ErrorSvg className={s.icon} />
            default:
                return <></>
        }
    }
    
    return (
        <div className={cn(s.root, className)}>
            {icon && getIconByName(icon)}
            {title && <h3 className={s.title}>{title}</h3>}
            {text && <p className={s.text}>{text}</p>}
            <button className={s.btn} onClick={handleBtnClick}>{btnText ? btnText : 'Закрыть'}</button>
        </div>
    );
};

export default ErrorModal;