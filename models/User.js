const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { userValidationSchema } = require("./validators/userValidator");

const UserSchema = new mongoose.Schema(
    {
        admin: { type: Boolean, default: false },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, minlength: 8, maxlength: 64 },
        token: { type: String },

        // cart: { type: Array, ref: "Cart" },
    },
    { timestamps: true }
);

UserSchema.statics.userValidation = function (body) {
    return userValidationSchema.validate(body, { abortEarly: false });
};

UserSchema.pre("save", function (next) {
    let user = this;

    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);
