(function initialize() {
  module.exports = {
    "createDatasetListSelectQuery": createDatasetListSelectQuery,
    "createDatasetListQuery": createDatasetListQuery,
    "createPublisherFacetQuery": createPublisherFacetQuery,
    "createThemeFacetQuery": createThemeFacetQuery,
    "createFormatFacetQuery": createFormatFacetQuery,
    "createKeywordFacetQuery": createKeywordFacetQuery,
    "createDatasetListTypeaheadQuery": createDatasetListTypeaheadQuery,
    "createDatasetSparql": createDatasetSparql,
    "createLabelSparql": createLabelSparql,
    "createPublisherListSparql": createPublisherListSparql,
    "createKeywordListSparql": createKeywordListSparql,
  };
})();

function createDatasetListSelectQuery(query) {
  const [orderWhereClause, orderPostQuery] = createOrder(query);
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT ?dataset WHERE {
    ${datasetFilterSelector(query)}
${orderWhereClause}
}
${orderPostQuery}
`;
}

function datasetFilterSelector(query) {
  const [temporalWhereClause, temporalFilter] = createTemporal(query);
  const asLiteral = createAsLiteral(query.language);
  return `
    ?dataset a dcat:Dataset
    ${addPredicates(asUrl, "dcterms:publisher", query.publisher)}
    ${addPredicates(asUrl, "dcat:theme", query.theme)}
    ${addPredicates(asLiteral, "dcat:keyword", query.keyword)}
    ${addPredicates(asUrl, "dcat:distribution/dcterms:format", query.format)}
  ${temporalWhereClause}  .
  ${temporalFilter}
  ${createTextFilter(query)}
  ${createIsPartOfFilter(query)}
`
}

function addPredicates(transformer, predicate, values) {
  if (values.length === 0) {
    return "";
  }
  const separator = "\n    ; ";
  const array = values.map((value) => predicate + " " + transformer(value));
  return "; " + array.join(separator);
}

function asUrl(value) {
  return `<${value}>`;
}

function createAsLiteral(language) {
  return (value) => `"${value}"@${language}`;
}

function createTemporal(query) {
  const start = query["temporal-start"];
  const end = query["temporal-end"];
  if (start === undefined && end === undefined) {
    return ["", ""];
  }
  if (start === undefined) {
    return [
      "    ; dcterms:temporal/dcat:endDate ?endDate\n",
      `  FILTER(
    ( str(?endDate) > "${start}" && str(?endDate) < "${end}" )
  )`,
    ];
  }
  if (end === undefined) {
    return [
      "    ; dcterms:temporal/dcat:startDate ?startDate\n",
      `  FILTER(
    ( str(?startDate) > "${start}" && str(?startDate) < "${end}" )
  )`,
    ];
  }
  return [
    "    ; dcterms:temporal/dcat:startDate ?startDate\n" +
    "    ; dcterms:temporal/dcat:endDate ?endDate\n",
    `  FILTER(
    ( str(?startDate) > "${start}" && str(?startDate) < "${end}" ) ||
    ( str(?endDate)   > "${start}" && str(?endDate)   < "${end}" ) ||
    ( str(?startDate) < "${start}" && str(?endDate)   > "${end}" )     
  )`,
  ]
}

function createOrder(query) {
  // We support sort only by 'title'.
  const orderWhereClause = `
  OPTIONAL { ?dataset dcterms:title ?label_primary   . FILTER(LANG(?label_primary) = "cs") }
  OPTIONAL { ?dataset dcterms:title ?label_secondary . FILTER(LANG(?label_secondary) = "en") }
  BIND( COALESCE(?label_primary, ?label_secondary) as ?label )
`;
  let orderPostQuery = "";
  if (query.sortOrder === "asc") {
    orderPostQuery = "ORDER BY ?label";
  } else {
    orderPostQuery = "ORDER BY DESC(?label)";
  }
  return [orderWhereClause, orderPostQuery];
}

function createTextFilter(query) {
  if (query.text === undefined || query.text === "") {
    return "";
  }
  const tokens = query.text.split(/(\s+)/).map(value => value.toLowerCase());
  const filterString = [...new Set(tokens)] // Remove duplicity.
    .map((value) =>
      `( contains( ?titleLower, "${value}" ) || ` +
      `contains( ?descriptionLower, "${value}" ) ) `)
    .join("\n && ");
  return `
  
  ?dataset a dcat:Dataset
    ; dcterms:description ?description
    ; dcterms:title ?title
  
  BIND( lcase(?title) as ?titleLower )
  BIND( lcase(?description) as ?descriptionLower )
  FILTER ( ${filterString} )
`;
}

function createIsPartOfFilter(query) {
  return query.isPartOf
    .map(iri => `?dataset dcterms:isPartOf <${iri}> .`)
    .join("\n");
}

function createDatasetListQuery(datasets) {
  const datasetsString = datasets.map((dataset, index) =>
    `\n       ( <${dataset}> ${index} )`).join("");
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {

  ?dataset a dcat:Dataset
    ; dcterms:accrualPeriodicity ?accrualPeriodicity
    ; dcterms:description ?description
    ; dcterms:title ?title
    ; dcat:keyword ?keyword
    ; dcat:theme ?theme
    ; dcterms:format ?format
    ; dcterms:publisher ?publisher
    ; dcterms:spatial ?spatial
    ; <urn:order> ?order
  .

  ?format skos:prefLabel ?formatLabel .

} WHERE {

  VALUES (?dataset ?order) {${datasetsString} 
  }

  ?dataset a dcat:Dataset
    ; dcterms:description ?description
    ; dcterms:title ?title
    ; dcterms:publisher ?publisher
  .

  OPTIONAL { ?dataset dcat:theme ?theme }
  OPTIONAL { ?dataset dcterms:spatial ?spatial }
  OPTIONAL { ?dataset dcterms:accrualPeriodicity ?accrualPeriodicity }
  OPTIONAL { ?dataset dcat:keyword ?keyword }
  OPTIONAL { 
    ?dataset dcat:distribution/dcterms:format ?format .
    ?format skos:prefLabel ?formatLabel . 
  }
}
`;
}

function createPublisherFacetQuery(query) {
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {
  ?publisher a <urn:Facet>
    ; <urn:facet> <urn:publisher>
    ; <urn:count> ?datasetCount
    ; foaf:name ?name 
  .
} WHERE {
  OPTIONAL { ?publisher foaf:name ?name . }
  {
    SELECT ?publisher (COUNT(?dataset) as ?datasetCount) WHERE {
      ${datasetFilterSelector(query)}
      ?dataset dcterms:publisher ?publisher.
    } GROUP BY ?publisher
  }
}`;
}

function createThemeFacetQuery(query) {
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {
  ?theme a <urn:Facet>
    ; <urn:facet> <urn:theme>
    ; <urn:count> ?datasetCount
    ; skos:prefLabel ?label 
  .
} WHERE {
  OPTIONAL { ?theme skos:prefLabel ?label . }
  {
    SELECT ?theme (COUNT(?dataset) as ?datasetCount) WHERE {
      ${datasetFilterSelector(query)}
      ?dataset dcat:theme ?theme .
    } GROUP BY ?theme
  }
}`;
}

function createFormatFacetQuery(query) {
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {
  ?format a <urn:Facet>
    ; <urn:facet> <urn:format>
    ; <urn:count> ?formatDatasetCount
    ; skos:prefLabel ?label
  .
} WHERE {
  OPTIONAL { ?format skos:prefLabel ?label . }
  {
    SELECT ?format (COUNT(?dataset) as ?formatDatasetCount) WHERE {
      ${datasetFilterSelector(query)}
      ?dataset dcat:distribution/dcterms:format ?format .
    } GROUP BY ?format
  }   
}`;
}

function createKeywordFacetQuery(query) {
  const [temporalWhereClause, temporalFilter] = createTemporal(query);
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {
  [] a <urn:Facet>
    ; <urn:code> ?keywordValue
    ; <urn:facet> <urn:keyword>
    ; <urn:count> ?keywordDatasetCount
  .
} WHERE {
  {
    SELECT ?keywordValue (COUNT(?dataset) as ?keywordDatasetCount) WHERE {
      ?dataset a dcat:Dataset
      ${addPredicates(asUrl, "dcterms:publisher", query.publisher)}
      ${addPredicates(asUrl, "dcat:theme", query.theme)}
      ${addPredicates(
    createAsLiteral(query.language), "dcat:keyword", query.keyword)}
      ${addPredicates(asUrl, "dcat:distribution/dcterms:format", query.format)}
${temporalWhereClause}  .
${temporalFilter}
      ?dataset dcat:keyword ?keywordValue .
      FILTER ( LANG( ?keywordValue ) = "${query.language}" )
    } GROUP BY ?keywordValue
  }
}`;
}

function createDatasetListTypeaheadQuery(datasets) {
  const datasetsString = datasets.map((dataset, index) =>
    `\n       ( <${dataset}> ${index} )`).join("");
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {

  ?dataset a dcat:Dataset
    ; dcterms:title ?title
  .

} WHERE {

  VALUES (?dataset ?order) {${datasetsString} 
  }

  ?dataset a dcat:Dataset
    ; dcterms:title ?title
  .
  
}
`;
}

function createDatasetSparql(datasetPerGraph, iri) {
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX adms: <http://www.w3.org/ns/adms#>
PREFIX spdx: <http://spdx.org/rdf/terms#>
PREFIX org: <http://www.w3.org/ns/org#>
PREFIX pou: <https://data.gov.cz/slovník/podmínky-užití/>

CONSTRUCT {

  ?dataset ?datasetPredicate ?datasetObject .

  ?cp vcard:fn ?cpfn ;
    vcard:hasEmail ?cpemail .
  
  ?publisher a foaf:Agent;
    foaf:name ?name .

  ?temporal schema:startDate ?temporalStart ;      
    schema:endDate ?temporalEnd .

  ?primaryTopic a dcat:CatalogRecord ;
    foaf:primaryTopic ?dataset ;
    dcterms:source ?source .
    
  ?distribution ?distributionPredicate ?distributionObject .
  
  ?license ?licensePredicate ?licenseObject .
  
  ?service ?servicePredicate ?serviceObject .
  
  ?pou ?pouPredicate ?pouObject .
  
} WHERE {
    ` + (datasetPerGraph ? "GRAPH ?g {" : "") + `
  
  ?dataset ?datasetPredicate ?datasetObject .
  
  OPTIONAL {
    ?dataset dcat:contactPoint ?cp .         
    ?cp vcard:fn ?cpfn ;
      vcard:hasEmail ?cpemail .
  }

# We ignore publisher label as it takes long time to evaluate and 
# it is just a label.
#  OPTIONAL {
#    ?dataset dcterms:publisher ?publisher .
#    ?publisher a foaf:Agent ;
#      foaf:name ?name .
#  }
  
  OPTIONAL {
    ?dataset dcterms:temporal ?temporal .
    ?temporal schema:startDate ?temporalStart ;
      schema:endDate ?temporalEnd .
  }
  
  OPTIONAL {
    ?primaryTopic a dcat:CatalogRecord ;
      foaf:primaryTopic ?dataset ;
      dcterms:source ?source .
  }
  
  OPTIONAL {
    ?dataset dcat:distribution ?distribution .
    ?distribution ?distributionPredicate ?distributionObject .
    
    OPTIONAL {
      ?distribution dcterms:license ?license .
      ?license ?licensePredicate ?licenseObject .
    }
    
    OPTIONAL {
      ?distribution dcat:accessService ?service .
      ?service ?servicePredicate ?serviceObject .
    }
    
    OPTIONAL {
     ?distribution pou:specifikace ?pou .
     ?pou ?pouPredicate ?pouObject .
    }
    
  }
  
  ` + (datasetPerGraph ? "}" : "") + `
        
    VALUES (?dataset) { (<${iri}>) }
}`;
}

function createLabelSparql(iri, language) {
  return `
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

CONSTRUCT { <${iri}> ?predicate ?object } WHERE {
  <${iri}> ?predicate ?object .
  
  OPTIONAL { 
    <${iri}> ?predicate ?label_primary . 
    FILTER(LANG(?label_primary) = "${language}") 
  }
  OPTIONAL { 
    <${iri}> ?predicate ?label_secondary . 
    FILTER(LANG(?label_secondary) = "en")
  }
  
  BIND( COALESCE(?label_primary, ?label_secondary) as ?label )
  
  VALUES ( ?predicate ) {
   ( foaf:name )
   ( skos:prefLabel )
   ( dcterms:title )
   ( rdfs:label )
  }
}
`;
}

function createPublisherListSparql() {
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT {
 ?publisher a schema:Organization ;
    <urn:datasetsCount> ?datasetCount ;
    foaf:name ?name .
} WHERE {
  OPTIONAL { ?publisher foaf:name ?name . }
  {
    SELECT ?publisher (COUNT(?dataset) AS ?datasetCount) WHERE {
     ?dataset a dcat:Dataset ;
       dcterms:publisher ?publisher .
    } GROUP BY ?publisher
  }
}
  `;
}

function createKeywordListSparql(language) {
  return `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>

CONSTRUCT {
 [] a <urn:Keyword> ;
    skos:prefLabel ?keyword ;
    <urn:usedByPublishersCount> ?publisherCount .
} WHERE {
  {
    SELECT ?keyword (COUNT(?publisher) AS ?publisherCount) WHERE {
     ?keywordDataset a dcat:Dataset ;
       dcat:keyword ?keyword ;
       dcterms:publisher ?publisher .
    } GROUP BY ?keyword
  }
  FILTER (lang(?keyword ) = "${language}")
}`;
}
