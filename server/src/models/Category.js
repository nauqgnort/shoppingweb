import express from "express";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    parentId: {
        type: String,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
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

// Thêm middleware để tự động cập nhật updatedAt
schema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Category = mongoose.model("Category", schema);
export default Category;
