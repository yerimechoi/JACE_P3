const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchasedProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    purchasedQuantity: {
        type: Number,
        min: 0,
        default: 0
    },

    
});

const PurchasedProduct = mongoose.model('PurchasedProduct', purchasedProductSchema);

module.exports = PurchasedProduct;