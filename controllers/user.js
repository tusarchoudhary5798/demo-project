const User = require('../models/user');


exports.userList = async (req, res) => {
    const usersPromise = User.find({role: "user"})
    const countPromise = User.countDocuments();
    const [users, count] = await Promise.all([usersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: users,
        count,
    });
};

exports.payment = async (req, res) => {
    const usersPromise = User.find({role: "user"})
    const countPromise = User.countDocuments();
    const [users, count] = await Promise.all([usersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: users,
        count,
    });
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
    const usersPromise = User.find({role: "user"})
    const countPromise = User.countDocuments();
    const [users, count] = await Promise.all([usersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: users,
        count,
    });
};

exports.addToCart = async (req, res) => {
    const usersPromise = User.find({role: "user"})
    const countPromise = User.countDocuments();
    const [users, count] = await Promise.all([usersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: users,
        count,
    });
};
