import { fetchHotelReviews } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import classes from './Review.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { review } from '@/type/review';

type Props = {
  reviews: review[];
};

const handleHover = () => {
  console.log('mouse in');
};

const Review = ({ reviews }: Props) => {
  return (
    <div className={classes.reviewContainer}>
      {reviews.map((review, index) => {
        return (
          <div key={index} className={classes.review}>
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
              <div className={classes.reviewerName}>{review.reviewerName}</div>
              <div className={classes.reviewText}>{review.reviewText}</div>
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
