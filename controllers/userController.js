const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/authenticate");

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
};

exports.register = async (req, res) => {
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  } else {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const createdUser = await user.save();
    res.send({
      token: generateToken(createdUser),
    });
  }
};

exports.userProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    // if (user.isSeller) {
    //   user.seller.name = req.body.sellerName || user.seller.name;
    //   user.seller.logo = req.body.sellerLogo || user.seller.logo;
    //   user.seller.description = req.body.sellerDescription || user.seller.description;
    // }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      token: generateToken(updatedUser),
    });
  }
};

exports.usersList = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

// exports.updateUser = async (req, res) => {
// const user = await User.findById(req.params.id);
// if (user) {
//   user.name = req.body.name || user.name;
//   user.email = req.body.email || user.email;
//   user.isSeller = Boolean(req.body.isSeller);
//   user.isAdmin = Boolean(req.body.isAdmin);
//   // user.isAdmin = req.body.isAdmin || user.isAdmin;
//   const updatedUser = await user.save();
//   res.send({ message: "User Updated", user: updatedUser });
// } else {
//   res.status(404).send({ message: "User Not Found" });
// }
// };
