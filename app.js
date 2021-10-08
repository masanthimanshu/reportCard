const express = require("express");
const bodyParser = require("body-parser");
const expbs = require("express-handlebars");
const func = require("./public/javascript/jsFunctions.js");

// Database Code Starts From Here //

const mongoose = require("mongoose");
const { total } = require("./public/javascript/jsFunctions.js");

const databaseName = "school";
const collectionName = "marks";

mongoose.connect("mongodb://localhost:27017/" + databaseName);

const databaseSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: [true, "No Name Specified"]
    },

    rollNo: {
        type: Number,
        required: [true, "Roll Number Not Specified"]
    },

    accounts : {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "Accounts Marks Not Specified"]
    },

    bSt : {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "Business Studies Marks Not Specified"]
    },

    economics : {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "Economics Marks Not Specified"]
    },

    english : {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "English Marks Not Specified"]
    },

    compSci : {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "IP Marks Not Specified"]
    },

    percentage : {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "Percentage Not Specified"]
    },
})

const Collection = mongoose.model(collectionName, databaseSchema);

// Database Code Ends Here //

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended : true
}))

app.engine("handlebars", expbs({
    layoutsDir: __dirname + "/views/layouts"
}))

app.set("view engine", "handlebars");

app.get("/", function(req,res){
    res.render(__dirname + "/views/index", {
        title: "Home Page"
    })
})

app.post("/", function(req,res){
    var fullName = req.body.fname;
    var rollNum = req.body.rno;
    var accts = req.body.accounts;
    var bst = req.body.bst;
    var eco = req.body.eco;
    var engl = req.body.english;
    var cs = req.body.cs;

    var percent = total(accts, bst, eco, engl, cs);

    const dataSet = new Collection ({
        name: fullName,
        rollNo: rollNum,
        accounts: accts,
        bSt: bst,
        economics: eco,
        english: engl,
        compSci: cs,
        percentage: percent
    });
    
    dataSet.save();

    if(res.statusCode == 200){
        res.render(__dirname + "/views/card", {
            title: "Report Card",
            studName: fullName,
            accounts: accts,
            business: bst,
            economics: eco,
            english: engl,
            compScience: cs,
            totalPer: percent
        })
    }

})

app.get("/card", function(req,res){
    res.render(__dirname + "/views/card", {
        title: "Report Card"
    })
})

var port = 3000;

app.listen(port, function(){
    console.log("Server Started At Port " + port);
    console.log(func.date());
})