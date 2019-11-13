import React from 'react';
import { VISO } from '../constants/types';
import { FilterLink } from '../container/filter-link';


export const Footer = () => (
  <p>
    Show: <FilterLink filter={VISO.SHOW_ALL}>ALL</FilterLink>{' '}
    <FilterLink filter={VISO.SHOW_DONE}>DONE</FilterLink>{' '}
    <FilterLink filter={VISO.SHOW_UNFINISHED}>UNFINISHED</FilterLink>
  </p>
);
