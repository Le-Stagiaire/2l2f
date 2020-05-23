import React from 'react';
import { cn } from '@bem-react/classname';

import LoadingGIF from './static/loading.gif';

import './Loading.scss';

const b = cn('Loading');

export default function Loading() {
  return (
    <img className={b()} src={LoadingGIF} alt='loading' />
  )
}
