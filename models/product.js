const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		title: String,
        quantity: String,
        price: Number,
	},
  	{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);