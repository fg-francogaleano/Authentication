const Product  = require('../models/Product')

const createProduct = async (req, res) => {
    console.log(req.body);
    const { name, category, prince, imgURL } = req.body;
    const newProduct = new Product({ name, category, prince, imgURL})

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
};

const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
};

const getProductById = async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
     const product = await Product.findById(productId);
     res.status(200).json(product)
};

const updateProductById = async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(204).json('Producto eliminado correctamente')
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
