import express from "express";
import Category from "../models/Category.js";



// Tạo danh mục mới
export const createCategory = async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Lấy tất cả danh mục
  export const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({ isDeleted: false });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Lấy một danh mục theo ID
  export const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category || category.isDeleted) {
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Cập nhật danh mục
  export const updateCategory = async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Xóa mềm danh mục
  export const deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
      res.json({ message: "Đã xóa danh mục" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


