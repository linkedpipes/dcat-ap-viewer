
const STRINGS = {
    "cs" : {
        "title.datasets" : "Datové sady",
        "title.dataset": "Datová sada",
        "title.organisations" : "Poskytovatelé"
    }
};

function getLanguage() {
    return "cs";
}

const getString = (name) => {
    // TODO Add check in DEVELOP for missing strings.
    return STRINGS[getLanguage()][name];
};

export default getString;