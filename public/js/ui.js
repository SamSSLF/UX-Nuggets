/* Gets and sends data via an API and displays it to the user*/

import {getByID, getFieldInTemplate, getFilterElement, cloneTemplate, createFieldTemplate} from "./utils.js"

const UI = Object.create(null);


const setFieldInTemplate = function (field, content, template) {
    const fieldEl = getFieldInTemplate(field, template);
    if (field === "ObservationDirectory"){
        createFieldTemplate("observation-link", fieldEl, "a", "link", content);

    } else if (field === "Description")  {
        createFieldTemplate("overflow-cell", fieldEl, "div", "overflow", content);

    } else if(field === "ExperienceVector")  {
        createFieldTemplate("experience-vector", fieldEl, "span", "select", content);

    } else{
        fieldEl.textContent = content;
    }
};
const addRowToTable = function(row, tableBody) {
    // clone a template for this row
    const rowTemplate = cloneTemplate("nugget-row");
    // for each field, set the content of the corresponding table cell
    rowTemplate.querySelector("tr").dataset.id = row.ID;
    const fields = Object.keys(row);
    fields.forEach(function(field) {
        setFieldInTemplate(field, row[field], rowTemplate);
    });
    // append the row to the table body
    tableBody.appendChild(rowTemplate);
};

// main data load function
const reloadData = function() {
    // clear all data rows
    var allRows = Array.prototype.slice.call(getByID("table-body").children);
    var dataRows = allRows.filter((row) => row.id !== "user-input");
    dataRows.forEach((row) => getByID("table-body").removeChild(row));

    const filter = {
        experienceVector: getFilterElement("ExperienceVector").value
    };

    window.fetch(`/getData?experienceVector=${filter.experienceVector}`,
    {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => data.forEach(function (data){
        addRowToTable(data,getByID("table-body"));
    }));
};

const getCellValue = function(field, cell){
    switch(field){
        case "ExperienceVector":
        case "Magnitude":
        case "Frequency":
        case "Project":
            return cell.querySelector("select").value;
        case "SensemakerName":
            // these nodes contain the first name and last name user input
            return cell.childNodes[3].value + " " + cell.childNodes[5].value; 
        case "Date":
            return cell.querySelector("input").value;
        default:
            return cell.querySelector("textarea").value;
    }
};

const onButtonClick = function(){
    const inputRow = getByID("user-input");
    var data = {};
    const emptyFields = [];
    //write the new nugget to data
    inputRow.childNodes.forEach(function(cell) {
        if(cell.dataset && cell.dataset.new && cell.childNodes.length > 0){
            const field = cell.dataset.new;
            const value = getCellValue(field, cell);
            if (!value) {
                emptyFields.push(field);
            }
            data[field] = value;
        }
    });

    //if field has not been filled, alert the user
    if(emptyFields.length > 0){
        alert(`Please fill in the following fields: ${emptyFields.join(", ")}`);
        return;
    }

    // do not allow nonsense Observations to be submitted
    const newObservation = data.Observation;
    const newObsArray = newObservation.split(" ");
    var noNonsense = true;
    newObsArray.forEach(function(word) {
        if(word.length>21){
            noNonsense = false;
        } else {
            noNonsense = true;
        }
    });
    if(data.Observation.length < 5 || noNonsense === false)
    {
        return alert("Do not spam the database! Please write an observation");
    }

    //send data to back-end
    window.fetch("/newData", {
        "method": "POST",
        "body": JSON.stringify(data),
        "headers": {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
    .then(reloadData);

    //Clear the text and input areas after new Nugget is submitted
    const inputTextArea = document.querySelectorAll("textarea");
    inputTextArea.forEach((area) => area.value = "");

    const inputInput = document.querySelectorAll("input");
    inputInput.forEach((area) => area.value = "");

    closePopup();
};

let closePopup = () => {
    const popup = getByID("hover_bkgr_fricc");
    popup.style.display = "none";
}

let openPopup = () => {
    const popup = getByID("hover_bkgr_fricc");
    popup.style.display = "flex";
}

UI.init = function() {
    // load the initial data
    reloadData();

    // set up listeners
    const filter = getFilterElement("ExperienceVector");
    filter.onchange = reloadData;

    const button = getByID("submit");
    button.onclick = onButtonClick;

    const submitNew = getByID("submit-new");

    const closeButton = getByID("popupCloseButton");

    submitNew.onclick = openPopup;

    closeButton.onclick = closePopup;

};

export default Object.freeze(UI);