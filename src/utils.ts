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
