import React, { ReactElement, useEffect, useState } from 'react';
import cn from 'classnames';
import s from './DragContent.module.scss';

interface IDragContent extends React.HTMLAttributes<HTMLDivElement> {

}

const DragContent: React.FC<IDragContent> = ({ className, children }) => {
  const [newChildren, setNewChildren] = useState<any>([]);
  useEffect(() => {
    let newC = React.Children.toArray(children);
    newC = newC.map((item) => {
      return React.cloneElement(item as ReactElement, {draggable: true});
    })
    setNewChildren(newC);
  }, [children]);


  return (
    <div className={cn(s.root, className)}>
      {newChildren}
    </div>
  );
};

export default DragContent;
