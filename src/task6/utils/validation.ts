import joi from 'joi';

export const AddProductsSchema = joi.object({
  productId: joi.string().required(),
  count: joi.number().required(),
});

export const CreateOrderSchema = joi.object({
  payment: {
    type: joi.string().required(),
    address: joi.string(),
    creditCard: joi.string(),
  },
  delivery: {
    type: joi.string().required(),
    address: joi.string().required(),
  },
  comments: joi.string().required(),
});

const userEmailSchema = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const userPasswordSchema = joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]{3,30}$'));

export const RegisterUserSchema = joi.object({
  email: userEmailSchema.required(),
  role: joi.string().required(),
  password: userPasswordSchema.required(),
});

export const LoginUserSchema = joi.object({
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
});
