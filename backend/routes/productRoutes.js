import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';

const router = express.Router();

// @desc    Fetch All Products
// @route   Get /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    // 測試錯誤訊息
    // res.status(401);
    // throw new Error('Test Error Message');
    res.json(products);
  })
);

// @desc    Fetch Single Products
// @route   Get /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // 測試錯誤訊息
    // res.status(401);
    // throw new Error('Test Error Message');
    if (product) {
      res.json(product);
    } else {
      res.status(404); // 可以不設定404，不設定的話返回500
      throw new Error(`Product not found - ${req.params.id}`);
    }
  })
);

export default router;
