import React, { FC, useState } from 'react';
import type { hotel } from '../types/hotel';
import classes from './Card.module.css';
import Image from 'next/image';
import { fetchHotelReviews } from '@/src/utils';
import Review from './Review';
import Rating from './Rating';

type Props = {
  hotel: hotel;
};

const Card: FC<Props> = ({ hotel }) => {
  const [showReviews, setShowReviews] = useState(true);
  const [reviews, setReviews] = useState([]);

  const onClickHandler = async () => {
    setShowReviews(!showReviews);
    const reviews = await fetchHotelReviews(hotel.id);
    setReviews(reviews);
  };

  return (
    <>
      <div className={classes.card}>
        <div className={classes.cardImg}>
          <Image
            src={'http:' + hotel.images[0]}
            fill
            objectFit='cover'
            alt="HotelName"
          />
        </div>
        <div className={classes.cardBody}>
          <div className={classes.info}>
            <div className={classes.nameLocation}>
              <div className={classes.hotelName}>{hotel.name}</div>
              <div className={classes.location}>
                {' '}
                {hotel.city}-{hotel.country}
              </div>
            </div>
            <div className={classes.rating}>
              <Rating value={hotel.rating}/>
            </div>
          </div>
          <div className={classes.description}>{hotel.description}</div>
          <div className={classes.button}>
            <div>
              <button onClick={onClickHandler}>
                {showReviews ? 'Show Reviews' : 'Hide Reviews'}
              </button>
            </div>
            <div className={classes.priceContainer}>
              <div className={classes.price}>
                {hotel.price.value} {hotel.price.symbol}
              </div>
              <div className={classes.date}>
                {hotel.startDate}-{hotel.endDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!showReviews && <Review reviews={reviews} />}
    </>
  );
};
export default Card;
