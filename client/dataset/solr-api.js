
// TODO Remove limits from keywords, filters etc ..
// TODO Add function for fetching only facets and remove them from normal query.

export function constructTypeaheadUrl(value, query, language) {
  let url = "./api/v1/solr/query?rows=8&fl=title_" + language;
  url += "&q=" + encodeURIComponent(prepareTypeaheadSolrQuery(value));
  url += createFacetsFiltersQuery(query, language);
  url += createTemporalQuery(query);
  return url;
}

function prepareTypeaheadSolrQuery(query) {
  query = escapeSolrQuery(query);

  const tokens = query.trim().split(" ")
    .filter(filterEmpty)
    .filter(isSpecialCharacter);
  if (tokens.length === 0) {
    return "";
  }

  let solrQuery = "( title_query_en:*" + tokens[0] + "*";
  for (let index = 1; index < tokens.length; ++index) {
    solrQuery += " AND title_query_en:*" + tokens[index] + "*";
  }

  solrQuery += ")  OR ( title_query_cs:*" + tokens[0] + "*";
  for (let index = 1; index < tokens.length; ++index) {
    solrQuery += " AND title_query_cs:*" + tokens[index] + "*";
  }
  solrQuery += " )";

  return solrQuery;
}

function escapeSolrQuery(query) {
  query = query.toLocaleLowerCase();

  const charactersToEscape = /([!*+=<>&|{}^~?[\]:"])/g;
  query = query.replace(charactersToEscape, "\\$1");

  // Escape control words (and, or, not).
  query = query.replace("and", "\\and");
  query = query.replace("or", "\\or");
  query = query.replace("not", "\\not");

  return query;
}

function filterEmpty(value) {
  return value.length > 0;
}

function isSpecialCharacter(value) {
  return value[0] !== "\\" || value.length !== 2;
}

function createFacetsFiltersQuery(query, language) {
  let url = "";

  query.keyword.forEach((item) => {
    url += "&fq=keyword_" + language + ":\"" + encodeURIComponent(item) + "\""
  });

  query.publisher.forEach((item) => {
    url += "&fq=publisher:\"" + encodeURIComponent(item) + "\""
  });

  query.format.forEach((item) => {
    url += "&fq=format:\"" + encodeURIComponent(item) + "\""
  });

  query.theme.forEach((item) => {
    url += "&fq=theme:\"" + encodeURIComponent(item) + "\""
  });

  return url;
}

function createTemporalQuery(query) {
  let url = "";

  if (query.temporalStart === "") {
    if (query.temporalEnd === "") {
      // No temporal limits.
    } else {
      // Only temporal end is set.
      url += "&fq=temporal-start:%5B+*+TO+" + query.temporalEnd + "T00%5C:00%5C:00Z+%5D";
    }
  } else {
    if (query.temporalEnd === "") {
      // Only temporal start is set.
      url += "&fq=temporal-end:%5B+" + query.temporalStart + "T00%5C:00%5C:00Z+TO+*+%5D";
    } else {
      // Both temporal values are set.
      url += "&fq=temporal-start:%5B+*+TO+" + query.temporalStart + "T00%5C:00%5C:00Z+%5D";
      url += "&fq=temporal-end:%5B+" + query.temporalEnd + "T00%5C:00%5C:00Z+TO+*+%5D";
    }
  }
  return url;
}

export function constructSearchQueryUrl(query, language) {
  let url = "./api/v1/solr/query?" +
        "facet.field=keyword_" + language + "&" +
        "facet.field=format&" +
        "facet.field=publisher&" +
        "facet.field=theme&" +
        "facet=true&" +
        "facet.limit=-1&" +
        "facet.mincount=1&";

  const start = query.page * query.pageSize;
  url += "start=" + start + "&";

  if (query.search === undefined || query.search === "") {
    url += "q=*:*";
  } else {
    url += "q=" + encodeURIComponent(prepareFullSolrQuery(query.search))
  }

  url += createFacetsFiltersQuery(query, language);
  url += createTemporalQuery(query);


  if (query.sort === undefined) {
    url += "&sort=modified desc";
  } else {
    const sort = query.sort.replace("title_", "title_" + language + "_");
    url += "&sort=" + sort;
  }

  url += "&rows=" + query.pageSize;

  return url;
}

function prepareFullSolrQuery(query) {
  query = escapeSolrQuery(query);

  const tokens = query.trim().split(" ")
    .filter(filterEmpty)
    .filter(isSpecialCharacter);
  if (tokens.length === 0) {
    return "";
  }

  let solrQuery = "_text_:*" + tokens[0] + "*";
  for (let index = 1; index < tokens.length; ++index) {
    solrQuery += " AND _text_:*" + tokens[index] + "*";
  }

  return solrQuery;
}
