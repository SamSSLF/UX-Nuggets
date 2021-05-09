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
});

describe("insertData()",function() {
  context("normal", function() {
    it("should correctly insert data", async function() {
      const fakeData = {
        Observation: 'New organic deodorant smells like grass',
        ObservationDirectory: 'https://www.youtube.com/watch?v=6ndHgKUuWQI',
        ExperienceVector: 'Neutral',
        Magnitude: 'High',
        Frequency: 'Constant',
        Emotions: '#nostalgic ',
        Insights: 'Smells of Earth improve mental health of pioneers',
        Description: 'Smells from home are good',
        Project: 'LifePod Acoustics Design',
        Date: '2065-01-17',
        SensemakerName: 'Sam Foong'
      }
      await db.insertData(fakeData);
      var data = await db.getAllRows(null);
      chai.expect(data[0]).to.include(fakeData);
      // TODO: don't rely on the inserted ID to clean test data.
      // TODO: if test crashes, row is not deleted.
      db.removeById(data[0]["ID"]);
    });
  })
})
