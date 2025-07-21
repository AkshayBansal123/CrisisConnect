import mongoose from 'mongoose';
import Inventory from '../models/inventory.js';

export const createNewProduct = async (req, res) => {
  try {
    const newProduct = new Inventory(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error in creating product:", err.message);
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const getInventory = async (req, res) => {
  const { role, id } = req.user;
  try {
    let products;

    if (role === 'ngoadmin') {
      products = await Inventory.find({ provider: id }); // ✅ FIXED: use Inventory.find()
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    res.status(200).json(products); // ✅ FIXED: changed 'reports' to 'products'
  } catch (err) {
    console.error("Error in getting the inventory:", err.message);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};
