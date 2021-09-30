exports.home = async (req, res, next) => {
    try {
        console.log("hallo")
        res.status(200).json({ hi: "Welcome" });
    } catch (err) {
        next(err);
    }
};
