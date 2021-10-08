const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');

exports.register = async (req, res) => {
   // Check if user exists
   let errors = {}
   const user = await User.findOne({'email': req.body.email});
   if (user) {
       errors.message = 'Email already exists';
       return res.status(400).json({ success: false, errors });
   } else {
       const newUser = new User({
           email: req.body.email,
           password: req.body.password,
           full_name: req.body.full_name,
           role: req.body.role,
           otp: null,
           is_verified: false
       });
       newUser.password = await bcrypt.hash(newUser.password, 10);
       await newUser.save();

       const token = jwt.sign({
           id: newUser._id,
           email: newUser.email,
           role: newUser.role,
           full_name: newUser.full_name,
       },
           process.env.APP_SECRET
       ); 
       return res.status(200).json({ success: true, token: `Bearer ${token}` });
   }
};

exports.login = async (req, res) => {
    let errors = {};
	const { email, password } = req.body;
	// Check if user exists
	
	const user = await User.findOne({'email': {'$regex': `^${email}$`, $options:'i'}});
	if (!user) {
		errors.message = 'User not found';
		return res.status(400).json({ success: false, errors });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		errors.message = 'Password incorrect';
		return res.status(400).json({ success: false, errors });
	}
	const token = jwt.sign({
		id: user.id,
		email: user.email,
		full_name: user.full_name,
		role: user.role
	},
		process.env.APP_SECRET,
		{ expiresIn: '7d' }
	);

	return res.status(200).json({ 
		success: true, 
		token: `Bearer ${token}` 
	});
};

exports.checkRoleAdmin = async(req, res, next) =>{
	if(req.user.role != "admin"){
		const errors = {"message": "only admin can do this task"}
		return res.status(400).json({ success: false, errors });
	}
	return next()
}

exports.authorization = async(req, res, next) =>{
	console.log("here>>>>",req.headers.authorization)
	if(req.headers.authorization){
		let token = req.headers.authorization.split(" ")[1]
		let user = jwt_decode(token);
		req["user"] = user
		console.log(user)
		return next()
	}
	else{
		const errors = {"message": "unauthorized"}
		return res.status(400).json({ success: false, errors });
	}

}


