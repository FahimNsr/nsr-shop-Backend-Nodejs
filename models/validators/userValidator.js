const Yup = require("yup");

exports.userValidationSchema = Yup.object().shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(64),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null])
});
