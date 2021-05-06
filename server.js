import {getAllRows, insertData} from "./data.js";
import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const port = 8080;

const db = new sqlite3.Database("./nuggets.sqlite3");

app.listen(port, function () {
    console.log("listening on port " + port);
});

app.use(express.static("public"));
app.use(express.json());

//insert the new Nugget when a POST request is made by the cient
app.post("/newData", function (request, response) {
    insertData(request.body, db);
    response.json({});
});

//print the database when a GET request is made by the client
app.get("/getData", function (request, response) {
    getAllRows(request.query, db).then(function (data) {
        response.json(data);
    });
});