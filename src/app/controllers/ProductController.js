import Product from '../schemas/Product';
import Log from '../schemas/Log';

import { v4 as uuid } from 'uuid';

import ProductStoreValidation from '../validations/ProductStoreValidation';
import IdValidation from '../validations/IdValidation';

import bcrypt from 'bcryptjs';

class ProductController {
  async index(req, res) {
    try {
      const products = await Product.find();

      Log.create({
        _id: uuid(),
        user_id: req._id,
        description: `Product list retrieved`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json(products);
    } catch (err) {
      Log.create({
        _id: uuid(),
        user_id: req._id,
        description: `Product list retrieve failed. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res
        .status(400)
        .json({ error: `Product list retrieve failed. ${err}` });
    }
  }

  async show(req, res) {
    try {
      await IdValidation.validate(req.params, { abortEarly: true });

      const { id: _id } = req.params;

      const product = await Product.findOne({ _id });

      Log.create({
        _id: uuid(),
        user_id: req.id,
        description: `Product ${product._id} retrieved`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json(product);
    } catch (err) {
      Log.create({
        _id: uuid(),
        user_id: req._id,
        description: `Product retrieve failed. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res.status(400).json({ error: `Product retrieve failed. ${err}` });
    }
  }

  async store(req, res) {
    try {
      await ProductStoreValidation.validate(req.body, { abortEarly: true });

      const { name, description, category, price, amount } = req.body;

      const product = await Product.create({
        _id: uuid(),
        name,
        description,
        category,
        price,
        amount,
      });

      Log.create({
        _id: uuid(),
        user_id: req._id,
        description: `Product ${product._id} created`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json(product);
    } catch (err) {
      Log.create({
        _id: uuid(),
        user_id: req.id,
        description: `Product create failed. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res.status(400).json({ error: `Product create failed. ${err}` });
    }
  }

  async update(req, res) {
    try {
      await IdValidation.validate(req.params, { abortEarly: true });

      const { id: _id } = req.params;
      const data = req.body;

      const product = await Product.findOneAndUpdate({ _id }, data, {
        new: true,
      });

      Log.create({
        _id: uuid(),
        user_id: req.id,
        description: `Product ${product._id} update`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json(product);
    } catch (err) {
      Log.create({
        _id: uuid(),
        user_id: req.id,
        description: `Product update failed. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res.status(400).json({ error: 'Product update failed' });
    }
  }

  async delete(req, res) {
    try {
      IdValidation.validate(req.params, { abortEarly: true });

      const { id: _id } = req.params;

      const product = await Product.deleteOne({ _id });

      Log.create({
        _id: uuid(),
        user_id: req._id,
        description: `Product deleted`,
        ip_address: req.connection.remoteAddress,
      });
      return res.json({ message: `Product deleted` });
    } catch (err) {
      Log.create({
        _id: uuid(),
        user_id: req._id,
        description: `Product delete failed. ${err}`,
        ip_address: req.connection.remoteAddress,
        error: true,
      });
      return res.status(400).json({ error: `Product delete failed. ${err}` });
    }
  }
}

export default new ProductController();
