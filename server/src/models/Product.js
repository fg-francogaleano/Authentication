const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    prince: Number,
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
});

const Usuario = mongoose.model('Product', productSchema);

module.exports = Usuario;