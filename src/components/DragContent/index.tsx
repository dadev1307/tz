import React, {ReactElement, useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import s from './DragContent.module.scss';

interface IDragContent extends React.HTMLAttributes<HTMLDivElement> {

}

const DragContent: React.FC<IDragContent> = ({className, children}) => {

    const dragEnter = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
        console.log('DragEnter:', idx);
    }
    
    const mouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.target as HTMLElement;
        el.setAttribute("draggable", "false");
    }
    
    const mouseEnter = (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const el = e.target as HTMLElement;
        console.log(e);
        const handler = el.querySelector('.handler');
        if(!handler) {
            el.setAttribute("draggable", "true");
            return;
        }
    }

    const dragStart = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
        const el = e.target as HTMLElement;
        const handler = el.querySelector('.handle');
        if(handler) {
            el.setAttribute('draggable', "false");
            return;
        }
    }

    const drag = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
        
    }


    return (
        <div className={cn(s.root, className)}>
            {React.Children.toArray(children).map((item, index) => React.cloneElement(item as ReactElement, {onMouseEnter: mouseEnter(index)}))}
            {React.Children.toArray(children).map((item, index) => <div draggable={false} onDrag={drag(index)}
                                                                        onDragStart={dragStart(index)}
                                                                        onDragEnter={dragEnter(index)}
                                                                        onMouseEnter={mouseEnter(index)}
                                                                        onMouseLeave={mouseLeave}
                                                                        key={index}>{React.cloneElement(item as ReactElement, {})}</div>)}
        </div>
    );
};

export default DragContent;
