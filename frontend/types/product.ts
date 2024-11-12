export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  taste: string;
  origin: string;
  price: number;
  images: { url: string , id: number}[];
  category: {
    slug: string;
    categoryName: string;
  };
};
