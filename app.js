const express = require("express");
const { DateTime } = require("luxon");
const { default: mongoose } = require("mongoose");
var cron = require('node-cron');
const app = express();

mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin-ash:test123@cluster0.yqtxq2l.mongodb.net/hue");
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const mySchema = new mongoose.Schema({
    name  : String,
});
const My = new mongoose.model("My" , mySchema);

app.get("/" , function(req,res){
    const currentDate= getCurrentDate();
    console.log(currentDate);
});

cron.schedule('*/10 * * * * *', () => {
    const newMy = new My({
        name : "AA"
    });
    newMy.save(function(err){
        if (!err) {
            console.log("Inserted");
        }
    })
});

connectDB().then(() => {
    console.log("eafas CONNECTED SUCCESFULLY");
    app.listen(4000, () => {
        console.log("easf Server STARTED");
    })
});
