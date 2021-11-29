const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: { type: String },
    price: { type: Number },
    url_img: { type: String },
    user_id: { type: String }
}, {
    collection: 'products'
});

module.exports = model('Product', productSchema);