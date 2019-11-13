import React from 'react';

export const Link = ({ actived, children, onClick }) =>
  actived ? (
    <span>{children}</span>
  ) : (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  );
