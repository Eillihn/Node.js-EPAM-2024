export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

export const product: ProductEntity = {
  id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
  title: 'Book',
  description: 'A very interesting book',
  price: 100,
};

const products: ProductEntity[] = [
  product,
  {
    id: '2e4eb55c-9e61-4f9a-bf5f-70a7f6a302f5',
    title: 'Headphones',
    description: 'High-quality noise-canceling headphones',
    price: 200,
  },
  {
    id: '3e20f575-4e6a-4c6c-89ec-26d894fc29c1',
    title: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 800,
  },
  {
    id: '6e01b8af-ef5b-4fe5-8f12-8c1a1a8b81d4',
    title: 'Laptop',
    description: 'Powerful laptop for all your computing needs',
    price: 1200,
  },
  {
    id: 'fa4d0dbb-f1b3-4d9f-8c9a-72f47f8b43c3',
    title: 'Coffee Maker',
    description: 'Automatic coffee maker for your daily brews',
    price: 150,
  },
  {
    id: '3d22b290-7e2b-40cc-b3e7-f75092e2b862',
    title: 'Fitness Tracker',
    description: 'Track your fitness activities with this smart device',
    price: 80,
  },
];

export const getProducts = (): ProductEntity[] => products;
export const findProduct = (productId: string): ProductEntity | undefined =>
  products.find((product: ProductEntity): boolean => product.id === productId);
