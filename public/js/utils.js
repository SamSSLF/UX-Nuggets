const getByID = (id) => document.getElementById(id);

const cloneTemplate = (id) => document.importNode(getByID(id).content, true);

const getFieldInTemplate = function (field, template) {
    return template.querySelector(`[data-field="${field}"]`);
};

const getFilterElement = function (field) {
    return getByID("filters").querySelector(`[name="${field}"]`);
};

export {getByID, getFieldInTemplate, getFilterElement, cloneTemplate}