import Data from "../data.js";
import chai from "chai";

const db = new Data("./test/nuggets-test.sqlite3");

describe("#getAllRows()", function() {

  context("normal", function() {
    it("should be an array", async function() {
        var data = await db.getAllRows(null);
        chai.expect(data).to.be.a("array");
    });
    it("should have 5 rows", async function() {
        var data = await db.getAllRows(null);
        chai.expect(data).to.have.a.lengthOf(5);
    });
  })

})

