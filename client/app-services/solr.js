export function parseFacetFromSolrResponse(payload, facetName) {
  const publisher = payload["facet_counts"]["facet_fields"][facetName];
  const output = [];
  for (let index = 0; index < publisher.length; index += 2) {
    const iri = publisher[index];
    const count = publisher[index + 1];
    if (count === undefined) {
      console.warn("Invalid number of response in: ", publisher);
    }
    output.push({
      "@id": iri,
      "label": iri,
      "count": count,
    });
  }
  return output;
}
