const mongoose = require('mongoose');
const Product = require('./Product');
const { Schema } = mongoose;

const kitOrderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  purchaseTime: {
    type: String,
    default: Date.now
  },
  tableNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending!'
  },
  userName: {
    type: String,
    required: true
  }, 
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const KitOrder = mongoose.model('KitOrder', kitOrderSchema);

module.exports = KitOrder;