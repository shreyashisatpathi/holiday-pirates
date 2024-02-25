import Link from 'next/link';
import React, { FC } from 'react';
import { getAllHotels, getAllContentModel } from '../src/utils';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
type Price = {
  value: string;
  currency: string;
  symbol: string;
};
type hotel = {
  name: string;
  rating: number;
  price: Price;
  images: string[];
  description: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
};
type Props = {
  hotels: hotel[];
};

const Hotels: FC<Props> = ({ hotels }) => {
  return (
    <div>
      <h2>hotels</h2>
      {hotels.map((hotel) => {
        return (
          <>
            {/* <div>{hotel.price.value}</div>
            <h3>{hotel.name}</h3>
            <p>{hotel.rating}</p>
            <p>{hotel.description}</p>
            <p>{hotel.country}</p>
            <p>{hotel.city}</p>
            <p>{hotel.startDate}</p>
            <img src={hotel.images[0]} alt="" /> */}
            <Card hotel={hotel} />
          </>
        );
      })}
      <Link href="/hotel">show Hotel</Link>
    </div>
  );
};
export const getServerSideProps = async () => {
  const models = await getAllContentModel();
  const modelIds = models?.map((model) => model.sys.id);
  console.log('modelid', modelIds);

  const responses = await getAllHotels();
  //   console.log('posts serveer', responses);
  const hotels = responses.map((response: any) => {
    console.log(response.fields.images[0].fields.file.url);
    const images = response.fields.images.map((image: any) => {
      return image.fields.file.url;
    });

    return {
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
  console.log('list of hotel field', hotels);

  return {
    props: { hotels },
  };
};
export default Hotels;
