import faker from 'faker';
import { factory } from 'factory-girl';

import Product from '../../src/app/schemas/Product';

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  description: faker.commerce.productAdjective(),
  category: faker.commerce.department(),
  price: faker.commerce.price(1, 1000),
  amount: faker.random.number,
});

export default factory;
