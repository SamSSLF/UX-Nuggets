import Data from "./data.js";
import express from "express";

const data = new Data("./nuggets.sqlite3");

const app = express();
const port = 8080;

app.listen(port, function () {
    console.log("listening on port " + port);
});

app.use(express.static("public"));
app.use(express.json());

//insert the new Nugget when a POST request is made by the cient
app.post("/newData", function (request, response) {
    data.insertData(request.body);
    response.json({});
});

//print the database when a GET request is made by the client
app.get("/getData", function (request, response) {
    data.getAllRows(request.query).then((data) => {
      response.json(data)
    }
    );
});