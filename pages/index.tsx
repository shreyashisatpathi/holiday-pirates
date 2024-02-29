import Link from 'next/link';
import React, { FC, useState } from 'react';
import { getAllHotels, getAllContentModel } from '../lib/utils';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import type { hotel } from '../type/hotel';
import Card from '@/components/HotelCard/Card';
import Button from '@/components/Button/Button';
import styles from '@/styles/Home.module.css';

type Props = {
  hotels: hotel[];
};

const Home: FC<Props> = ({ hotels }) => {
  const [showHotel, setShowHotel] = useState(false);

  return (
    <div>
      <div className={styles.container}>
        <Button
          name="Load Hotel"
          disabled={showHotel}
          onClickHandler={() => setShowHotel(true)}
        />
      </div>
      {showHotel &&
        hotels.map((hotel) => {
          return <Card key={hotel.id} hotel={hotel} />;
        })}
    </div>
  );
};

export const getStaticProps = async () => {
  const responses = await getAllHotels();
  const hotels = responses.map((response: any) => {
    const images = response.fields.images.map((image: any) => {
      return image.fields.file.url;
    });

    return {
      id: response.sys.id,
      name: response.fields.name,
      rating: response.fields.rating,
      description: documentToPlainTextString(response.fields.description),
      price: response.fields.price,
      country: response.fields.country,
      city: response.fields.city,
      startDate: response.fields.startDate,
      endDate: response.fields.endDate,
      images,
    };
  });

  return {
    props: { hotels },
  };
};
export default Home;
