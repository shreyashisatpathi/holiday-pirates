import React, { FC } from 'react';
import type { hotel } from '../types/hotel';
import classes from './Card.module.css';
import Image from 'next/image';
import { fetchHotelReviews } from '@/src/utils';

type Props = {
  hotel: hotel;
};

const Card: FC<Props> = ({ hotel }) => {
  const onClickHandler = () => {
    const reviews = fetchHotelReviews(hotel.id);
    console.log('fetch reviews', reviews);
  };
  return (
    <div className={classes.card}>
      <div className={classes.cardImg}>
        <Image
          src={'http:' + hotel.images[0]}
          height={200}
          width={200}
          alt="HotelName"
        />
      </div>
      <div className={classes.cardBody}>
        <button onClick={onClickHandler}> Fetch Review </button>
        <div className={classes.hotelName}>{hotel.name}</div>
        <div className={classes.hotelDescription}>{hotel.description}</div>
      </div>
    </div>
  );
};
export default Card;
