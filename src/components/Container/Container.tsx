import s from './Container.module.css';
import React from 'react';

type ContainerProps = {
  children?: React.ReactNode;
}

export default function Container({ children  }:ContainerProps) {
  return <div className={s.Container}>{children}</div>;
}

