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

  
  try {
    let products;

   
      products = await Inventory.find();
   

    res.status(200).json(products); 
  } catch (err) {
    console.error("Error in getting the inventory:", err.message);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};
