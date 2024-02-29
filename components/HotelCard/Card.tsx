import React, { FC, useState } from 'react';
import type { hotel } from '../../type/hotel';
import classes from './Card.module.css';
import Image from 'next/image';
import { fetchHotelReviews, formatDate } from '@/lib/utils';
import Review from '../Review/Review';
import Rating from '../Rating';
import Button from '../Button/Button';
import { review } from '@/type/review';

type Props = {
  hotel: hotel;
};

type Reviews = review[];
const Card: FC<Props> = ({ hotel }) => {
  const [showReviews, setShowReviews] = useState(true);
  const [reviews, setReviews] = useState<Reviews>([]);

  const onClickHandler = async () => {
    setShowReviews(!showReviews);
    const reviews: Reviews = await fetchHotelReviews(hotel.id);
    setReviews(reviews);
  };

  return (
    <>
      <div
        className={`${classes.card} ${
          !showReviews ? classes.cardWIthoutBorder : ''
        }`}
      >
        <div className={classes.cardImg}>
          <Image
            src={'http:' + hotel.images[0]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            alt="HotelName"
            loading="lazy"
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
              <Rating value={hotel.rating} />
            </div>
          </div>
          <div className={classes.description}>{hotel.description}</div>
          <div className={classes.button}>
            <div>
              <Button
                onClickHandler={onClickHandler}
                name={showReviews ? 'Show Reviews' : 'Hide Reviews'}
              />
            </div>
            <div className={classes.priceContainer}>
              <div className={classes.price}>
                {hotel.price.value} {hotel.price.symbol}
              </div>
              <div className={classes.date}>
                {formatDate(hotel.startDate)}-{formatDate(hotel.endDate)}
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
