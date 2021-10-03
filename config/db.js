const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
        });

        console.log(`MongoDB Connected ${connect.connection.host}`);
    } catch (err) {
        console.error("MongoDB Connection FAIL");
        process.exit(1);
    }
};
