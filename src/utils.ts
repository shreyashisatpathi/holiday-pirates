import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { createClient } from 'contentful';
const client = createClient({
  space: 'gyfunrv4a4ak',
  accessToken: 'k9P9FQJcUpHKrHX3tXrgXunRyiS3qPchtY7V61tNruE',
});

export const getAllHotels = async () => {
  const response = await client.getEntries({ content_type: 'hotel' });
  return response.items;
};

export const getAllContentModel = async () => {
  return client
    .getContentTypes()
    .then((response) => response.items)
    .catch(console.error);
};

export const fetchHotelReviews = async (hotelId: string) => {
  try {
    const entries = await client.getEntries({
      content_type: 'review',
      'fields.hotel.sys.id': hotelId,
    });

    const reviews = entries.items.map((item) => ({
      // id: item.sys.id,
      reviewerName: item.fields?.customer?.fields.firstName + ' ' + item.fields.customer?.fields.lastName,
      reviewText: documentToPlainTextString(item.fields.comment),
      feedback: item.fields.feedback
    }));

    return reviews;
  } catch (error) {
    console.error('Error fetching hotel reviews:', error);
    return [];
  }
};
