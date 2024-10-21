import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Xử lý các file ảnh đã tải lên
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    res.status(500).json({ message: "Lỗi khi tạo sản phẩm", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.json({ message: "Đã xóa sản phẩm" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    console.log('Files received:', req.files); // Kiểm tra xem có nhận được file không

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Không có file nào được tải lên" });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    console.log('Image URLs:', imageUrls); // Kiểm tra URL hình ảnh

    product.images.push(...imageUrls);
    await product.save();

    console.log('Updated product:', product); // Kiểm tra sản phẩm sau khi cập nhật

    res.status(200).json(product);
  } catch (error) {
    console.error('Error in uploadImages:', error); // Log lỗi chi tiết
    res.status(500).json({ message: error.message });
  }
};
