
export function constructTypeaheadUrl(query) {
    let url = "api/v1/solr/query?rows=8&fl=title";
    url += "&q=" + encodeURI(escapeSolrQuery(query))
    return url;
}

function escapeSolrQuery(query) {
    // Convert to lowe case.
    query = query.toLocaleLowerCase();

    // Escape control characters
    const pattern = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g;
    query = query.replace(pattern, "\\$1");

    // Escape control words (and, or, not).
    query = query.replace("and", "\\and");
    query = query.replace("or", "\\or");
    query = query.replace("not", "\\not");

    // Update query.
    const tokens = query.trim().split(" ").filter(value => value.length > 0);
    if (tokens.length === 0) {
        return "";
    }
    let solrQuery = "*" + tokens[0] + "*";
    for (let index = 1; index < tokens.length; ++index) {
        solrQuery += " AND *" + tokens[index] + "*";
    }

    return solrQuery;
}












