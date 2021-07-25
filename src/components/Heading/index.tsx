import React, { useEffect, useState } from 'react';

interface HeadingUI {
  type: string;
  size?: string | number | null;
}
interface TagAndSize {
  tag: string;
  size: number | string;
}

const Heading: React.FC<HeadingUI> = ({ children, type = 'p', size = null }) => {
  const [tag, setTag] = useState('p');
  const [fontSize, setFontSize] = useState(size);
  const TAGS: Array<TagAndSize> = [
    {
      tag: 'h1',
      size: 72,
    },
    {
      tag: 'h2',
      size: 64,
    },
    {
      tag: 'h3',
      size: 36,
    },
    {
      tag: 'h4',
      size: 24,
    },
    {
      tag: 'h5',
      size: 18,
    },
    {
      tag: 'h6',
      size: 12,
    },
    {
      tag: 'p',
      size: 16,
    },
  ]; // Список поддерживаемы тэгов и размеры для них
  useEffect(() => {
    // Ищем нужный нам тэг
    let findType = TAGS.find((item) => item.tag === type.toLowerCase());
    //Если не находим тэг то по умолчанию берём последний ('p')
    if (!findType) {
      findType = TAGS[TAGS.length - 1];
    }
    // Устанавливает тэг
    setTag(findType.tag);

    // Если размер не приходит то берём размер который имеятся у нашего тэга по умолчанию.
    if (!size) {
      setFontSize(findType.size);
    }

    // Если размер приходит, проверяем что это число и если это так то устанавливаем иначе берём размер дефолтный у текущего тэга.
    if (size) {
      const isNumber = !isNaN(+size);
      if (isNumber) {
        setFontSize(size);
      } else {
        setFontSize(findType.size);
      }
    }
  },[]);
  // Пришлось сделать через createElement т.к через JSX ругается.
  return React.createElement(tag, { style: { fontSize: fontSize + 'px' } }, children);
};

export default Heading;
