import React from 'react';
import classes from './Header.module.css';
import Image from 'next/image';

const Header = () => {
  return (
    <div>
      <div className={classes.header}>HolidayPirates</div>
    </div>
  );
};

export default Header;
