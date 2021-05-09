const getByID = (id) => document.getElementById(id);

const cloneTemplate = (id) => document.importNode(getByID(id).content, true);

const getFieldInTemplate = function (field, template) {
    return template.querySelector(`[data-field="${field}"]`);
};

const getFilterElement = function (field) {
    return getByID("filters").querySelector(`[name="${field}"]`);
};

let createFieldTemplate = function(templateName,fieldEl,elementTag,type,content) {
    var template = cloneTemplate(templateName);
    var element = template.querySelector(elementTag);
    fieldEl.textContent = "";
    if(type === "link") {
        element.href = content;
    }
    else if(type === "select") {
        element.dataset.value = content;
    }
    element.textContent = content;
    fieldEl.appendChild(template);
}

export {getByID, getFieldInTemplate, getFilterElement, cloneTemplate, createFieldTemplate}