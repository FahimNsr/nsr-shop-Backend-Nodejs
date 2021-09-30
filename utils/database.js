const mongoose = require("mongoose");

exports.DataBase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${connect.connection.host + ":" + connect.connection.port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
