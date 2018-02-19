
export function constructTypeaheadUrl(query) {
    let url = "api/v1/solr/query?rows=8&fl=title";
    url += "&q=" + encodeURI(escapeSolrQuery(query))
    return url;
}

function escapeSolrQuery(query) {
    // Convert to lower case.
    query = query.toLocaleLowerCase();

    const charactersToRemove = /[\:\-]/g;
    query = query.replace(charactersToRemove, " ");

    const charactersToEscape = /([\!\*\+\=\<\>\&\|\[\]\{\}\^\~\?\\/"])/g;
    query = query.replace(charactersToEscape, "\\$1");

    // Escape control words (and, or, not).
    query = query.replace("and", "\\and");
    query = query.replace("or", "\\or");
    query = query.replace("not", "\\not");

    // Tokenize string.
    const tokens = query.trim().split(" ")
    .filter(filterEmpty)
    .filter(filterSpecial);

    if (tokens.length === 0) {
        return "";
    }

    let solrQuery = "*" + tokens[0] + "*";
    for (let index = 1; index < tokens.length; ++index) {
        solrQuery += " AND *" + tokens[index] + "*";
    }

    return solrQuery;
}

function filterEmpty(value) {
    return value.length > 0;
}

/**
 * Return true if value is escaped special character.
 */
function filterSpecial(value) {
    return value[0] !== "\\" || value.length !== 2;
}

export function constructSearchQueryUrl(query) {
    let url = "api/v1/solr/query?" +
        "facet.field=keyword&" +
        "facet.field=formatName&" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&";

    const start = query.page * query.pageSize;
    url += "start=" + start + "&";

    if (query.search === undefined || query.search === "") {
        url += "q=*:*";
    } else {
        url += "q=" + encodeURI(escapeSolrQuery(query.search))
    }

    query.keyword.forEach((item) => {
        url += "&fq=keyword:\"" + encodeURI(item) + "\""
    });

    query.publisher.forEach((item) => {
        url += "&fq=publisherName:\"" + encodeURI(item) + "\""
    });

    query.format.forEach((item) => {
        url += "&fq=formatName:\"" + encodeURI(item) + "\""
    });

    if (query.sort === undefined) {
        url += "&sort=modified desc";
    } else {
        url += "&sort=" + query.sort;
    }

    url += "&rows=" + query.pageSize;

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
