import React from 'react';
import { cn } from '@bem-react/classname';

import './Box.scss';

const b = cn('Box')

export default function Box({ className, children }) {
  return (
    <div className={b(null, [className])}>
      { children }
    </div>
  )
}
