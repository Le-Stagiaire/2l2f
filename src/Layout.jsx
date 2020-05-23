import React from "react";
import { cn } from '@bem-react/classname';

import './Layout.scss';

const b = cn('Layout')

export default function Layout({ className, children }) {
  return (
    <main className={b(null, [className])}>
      { children }
    </main>
  )
}
