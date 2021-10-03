const Yup = require("yup");

exports.productValidationSchema = Yup.object().shape({
    name: Yup.string().required().max(64),
    price: Yup.number().required(),
    quantity: Yup.number().required(),
    sold: Yup.number(),
    overview: Yup.string(),
    thumb: Yup.object().shape({
        name: Yup.string(),
        size: Yup.number().max(3000000),
        MimeType: Yup.mixed().oneOf(["image/jpg", "image/png"]),
    }),
});
