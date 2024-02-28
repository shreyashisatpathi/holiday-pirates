export type Price = {
  value: string;
  currency: string;
  symbol: string;
};

export type hotel = {
  name: string;
  rating: number;
  price: Price;
  images: string[];
  description: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  id: string;
};
