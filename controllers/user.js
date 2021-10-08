const User = require('../models/user');


exports.userList = async (req, res) => {
    const usersPromise = User.find({role: "user"}).select(["full_name","email","is_blocked","phone_number"])
    const countPromise = User.countDocuments({role: "user"});
    const [users, count] = await Promise.all([usersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: users,
        count,
    });
};

exports.payment = async (req, res) => {
    res.status(200).send()
    const query = {_id: req.body.user_id}
    const user = await User.findOne(query).exec();
    if(user){
        let due_payment = user.due_payment - req.body.payment_amount
        const updatedUser = await User.findOneAndUpdate(query, {due_payment: due_payment}, {
            new: true,
            runValidators: true
        });
    }
    
};

exports.blockUser = async (req, res) => {
    const query = { _id: req.params.id };
    const updatedUser = await User.findOneAndUpdate(query, {is_blocked: true}, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({ success: true, data: updatedUser });
    
};

exports.updateProfile = async (req, res) => {
    
    const body = req.body;
    const query = { _id: req.user.id };
    const updatedUser = await User.findOneAndUpdate(query, body, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({ success: true, data: updatedUser });
    
};

exports.addToCart = async (req, res) => {
    const query = {_id: req.user.id}
    const user = await User.findOne(query).exec();
    let updatedCart = [...user.cart, ...req.body.cart]
    const updatedUser = await User.findOneAndUpdate(query, {cart: updatedCart}, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({ success: true, data: updatedUser });
};
