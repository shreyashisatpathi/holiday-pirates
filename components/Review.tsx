import { fetchHotelReviews } from '@/src/utils';
import React, { useEffect, useState } from 'react';
import classes from './Review.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

type Props = {
  reviews: review[];
};

type review = {
  reviewerName: string;
  reviewText: string;
  feedback: string;
};

const handleHover = () => {
  console.log('mouse in');
};

const Review = ({ reviews }: Props) => {
  console.log('fetch reviews', reviews);

  return (
    <div>
      {reviews.map((review) => {
        return (
          <div className={classes.review}>
            <div className={classes.feedback}>
              {review.feedback === 'positive' && (
                <FontAwesomeIcon
                  className="feedback-tooltip"
                  icon={faCirclePlus}
                  color="white"
                  size="lg"
                />
              )}
              {review.feedback === 'negative' && (
                <FontAwesomeIcon
                  icon={faCircleMinus}
                  className="feedback-tooltip"
                  color="white"
                  size="lg"
                />
              )}
            </div>
            <Tooltip
              anchorSelect=".feedback-tooltip"
              place="top"
              style={{ backgroundColor: '#418CDC', color: 'white' }}
            >
              Positive or negative review
            </Tooltip>
            <div className={classes.content}>
              <p>{review.reviewerName}</p>
              <p>{review.reviewText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
