const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		full_name : String,
        phone_number: String,
        profile_photo: String,
        email: String,
        password: String,
        cart : Array,
        role: {
            type: String,
            enum : ["user", "admin"]
        },
		is_blocked: {
            type: Boolean,
            default: false
        },
        due_payment: Number	
	},
  	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);