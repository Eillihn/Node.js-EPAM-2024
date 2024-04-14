import { ProductEntity, ProductEntityDocument, ProductModel } from './product.entity';

export const findAllProducts = (): Promise<ProductEntityDocument[] | null> => ProductModel.find();

export const findProduct = (productId: string): Promise<ProductEntityDocument | null> => ProductModel.findById(productId);

export const addProductEntity = async (productEntity: ProductEntity): Promise<void> => {
  const product: ProductEntityDocument = new ProductModel(productEntity);
  await product.save();
};
