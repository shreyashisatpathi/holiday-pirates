import { createClient } from 'contentful';
const client = createClient({
  space: 'gyfunrv4a4ak',
  accessToken: 'k9P9FQJcUpHKrHX3tXrgXunRyiS3qPchtY7V61tNruE',
});

export const getAllHotels = async () => {
  const response = await client.getEntries({content_type:'hotel'});
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
      'fields.hotel.sys.id': hotelId
    });
    console.log('review', entries.items[0])
    // Process the fetched reviews
    const reviews = entries.items.map(item => ({
      id: item.sys.id,
      // reviewerName: item.fields.reviewerName,
      // reviewText: item.fields.reviewText,
      // rating: item.fields.rating,
      // Add more fields as needed
    }));

    return reviews;
  } catch (error) {
    console.error('Error fetching hotel reviews:', error);
    return [];
  }
};