const {handleApiError} = require("./../http-utils");
const {executeSparqlSelect} = require("./sparql-api");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  return {
    "v2-vdf-dataset": createVdfDataset(configuration),
  };
}

function createVdfDataset(configuration) {
  return async (req, res) => {
    const dataset = req.query.iri;
    try {
      const usedBy = await executeSparqlSelect(
        configuration.url, usingDatasetAsCodelistSparql(dataset));
      const usedCodelists = await executeSparqlSelect(
        configuration.url, codelistsUsedByDatasetSparql(dataset));
      res.json({
        "dataset": dataset,
        "isUsedAsCodelistBy": usedBy.map((entry) => (entry["iri"]["value"])),
        "isUsingCodelists": usedCodelists.map((entry) => (entry["iri"]["value"])),
      });
    } catch (error) {
      handleApiError(res, error);
    }
  };
}

function usingDatasetAsCodelistSparql(dataset) {
  return `
PREFIX pojmy: <https://slovník.gov.cz/legislativní/sbírka/111/2009/pojem/>

SELECT DISTINCT ?iri WHERE {
  [] a pojmy:údaj ;
      pojmy:je-kódovaný-číselníkem/pojmy:iri-číselníku-v-nkod <${dataset}> ;
      pojmy:iri-datové-sady-publikující-veřejný-údaj ?iri .
}
`;
}

function codelistsUsedByDatasetSparql(dataset) {
  return `
PREFIX pojmy: <https://slovník.gov.cz/legislativní/sbírka/111/2009/pojem/>

SELECT DISTINCT ?iri WHERE {
  [] a pojmy:údaj ;
      pojmy:je-kódovaný-číselníkem/pojmy:iri-číselníku-v-nkod ?iri ;
      pojmy:iri-datové-sady-publikující-veřejný-údaj <${dataset}> .
}
`;
}
