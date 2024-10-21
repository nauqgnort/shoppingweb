import express from "express";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: false,
    index: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  images: [{
    type: String
  }],
  condition: {
    type: String,
    enum: ['new', 'used'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

schema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", schema);

export default Product;
