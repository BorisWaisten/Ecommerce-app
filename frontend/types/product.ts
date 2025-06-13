export type ProductType = {
  _id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  origin?: string; // Propiedad opcional
  productCategory?: string;
};
