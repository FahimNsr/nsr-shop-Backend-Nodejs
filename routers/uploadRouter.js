const { Router } = require("express");
const multer = require("multer");
const appRoot = require("app-root-path");
const { isAuth } = require("../helpers/authenticate");

const uploadRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${appRoot}/uploads/`);
  },
  filename(req, file, cb) {
    cb(null, req.body.imageName);
  },
});

const upload = multer({ storage });

//@desc   Upload image
//@route  POST /api/uploads
uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  try {
    res.send(`/${req.file.path}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = uploadRouter;
