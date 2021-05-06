/*jslint node: true */
const path = "./nuggets.sqlite3"

class Data {
    constructor(){
        this.db = new sqlite3.Database(path);
    }

    insertData (data, db){
        const insertSQL =
        `INSERT INTO Nuggets(
            Observation,
            ObservationDirectory,
            ExperienceVector,
            Magnitude,
            Frequency,
            Emotions,
            Insights,
            Description,
            Project,
            Date,
            SensemakerName
         ) VALUES(
            $Observation,
            $ObservationDirectory,
            $ExperienceVector,
            $Magnitude,
            $Frequency,
            $Emotions,
            $Insights,
            $Description,
            $Project,
            $Date,
            $SensemakerName
             )`;
    
        return new Promise(function (resolve, reject) {
            db.all(insertSQL, {
                "$Observation": data.Observation,
                "$ObservationDirectory": data.ObservationDirectory,
                "$ExperienceVector": data.ExperienceVector,
                "$Magnitude": data.Magnitude,
                "$Frequency": data.Frequency,
                "$Emotions": data.Emotions,
                "$Insights": data.Insights,
                "$Description": data.Description,
                "$Project": data.Project,
                "$Date": data.Date,
                "$SensemakerName": data.SensemakerName
            },
            function (error, rows) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        });
    
    
    }
    getAllRows (filter, db) {
        let allNuggets = "SELECT * FROM Nuggets";
        const params = {};
        if(filter && filter.experienceVector && filter.experienceVector !== "All"){
            allNuggets += " WHERE experienceVector=$experienceVector";
            params["$experienceVector"] = filter.experienceVector;
        }
        allNuggets += " ORDER BY ID desc";
    
        return new Promise(function (resolve, reject) {
            db.all(allNuggets, params, function (error, rows) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        });
    }
}

export default Data