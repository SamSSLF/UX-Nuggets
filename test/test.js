import {getAllRows} from "../data.js";
import sqlite3 from "sqlite3";
import chai from "chai";

const db = new sqlite3.Database("./nuggets-test.sqlite3");

describe("#getAllRows()", function() {

  context("normal", function() {
    it("should be an array", async function() {
        var data = await getAllRows(null, db);
        chai.expect(data).to.be.a("array");
    });
    it("should have 5 rows", async function() {
        var data = await getAllRows(null, db);
        chai.expect(data).to.have.a.lengthOf(5);
    });
  })

})

