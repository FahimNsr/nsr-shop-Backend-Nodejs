const jwt = require("jsonwebtoken");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
    try {
        await User.userValidation(req.body);
        const { firstname, lastname, email, password } = req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        } else {
            const user = await User.create({ firstname, lastname, email: email.toLowerCase(), password, admin: true });
            const token = jwt.sign(
                { user_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, admin: user.admin },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.header("Authorization", "Bearer " + token);

            res.status(201).json(user);
        }
    } catch (err) {
        next(err);
        console.log(err);
    }
};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User could not be found. Please Register");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            const token = jwt.sign(
                { userId: user._id.toString(), firstname: user.firstname, lastname: user.lastname, email: user.email, admin: user.admin },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            
            res.headers
            res.status(200).json({ token, userId: user._id.toString() });
        } else {
            res.status(400).send("E-mail or password is incorrect");
        }
    } catch (err) {
        console.log(err)
        next(err);
    }
};
