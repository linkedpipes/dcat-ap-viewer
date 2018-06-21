import {getLanguage} from "app/navigation";

// TODO Move language preferences to reducer.

export const selectLabel = (labelState, resource) => {
    const labels = selectLabels(labelState, resource);
    if (labels.length > 1) {
        console.warn("Using only first label for:", resource, "->", labels);
    }
    if (labels.length === 0) {
        return undefined;
    }
    return labels[0];
};

export const selectLabelNoIri = (labelState, resource) => {
    const label = selectLabel(labelState, resource);
    if (typeof(resource) === "object") {
        resource = resource["@id"];
    }
    if (label === resource) {
        return undefined;
    }
    return label;
};

export const selectLabels = (labelState, resource) => {
    const languages = getLanguagePreferences();
    const labels = selectLabelFromState(labelState, languages, resource);
    return labels;
};

function selectLabelFromState(labelState, languages, resource) {
    if (resource === undefined) {
        console.trace("Label for (resource === undefined) requested.");
        return [];
    }
    if (typeof(resource) === "object") {
        resource = resource["@id"];
    }
    const strings = labelState[resource];
    if (strings === undefined) {
        return [resource];
    }
    return selectString(languages, strings);
}

export function selectString(languages, value) {
    for (let index in languages) {
        if (!languages.hasOwnProperty(index)) {
            continue;
        }
        const lang = languages[index];
        const labels = value[lang];
        if (labels === undefined) {
            continue;
        }
        return labels;
    }
    const anyLanguageLabel = selectAnyLanguageLabel(value);
    if (anyLanguageLabel) {
        return anyLanguageLabel;
    }
    if(value["@id"] === undefined) {
        return []
    }
    return [value["@id"]];
}

function selectAnyLanguageLabel(value) {
    const keys = Object.keys(value);
    for (let index in keys) {
        const key = keys[index];
        if (key !== "@id") {
            return value[key];
        }
    }
}


function getLanguagePreferences() {
    return [
        getLanguage(), "en", ""
    ]
}