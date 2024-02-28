import { review } from '@/type/review';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Entry, EntrySkeletonType, createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

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

    const reviews: review[] = entries.items.map((item) => {
      const comment = documentToPlainTextString(
        item.fields.comment as Document
      );
      const customerEntry: Entry<EntrySkeletonType> = item.fields
        .customer as Entry<EntrySkeletonType>;
      const name =
        customerEntry.fields.firstName + ' ' + customerEntry.fields.lastName;

      return {
        reviewerName: name,
        reviewText: comment,
        feedback: item.fields.feedback as string,
      };
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching hotel reviews:', error);
    return [];
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en', options)
    .format(date)
    .split('/')
    .join('.');
};
