export function parseFacetFromSolrResponse(payload, facetName, iriAsLabel) {
  const facet = payload["facet_counts"]["facet_fields"][facetName];
  const output = [];
  for (let index = 0; index < facet.length; index += 2) {
    const iri = facet[index];
    const count = facet[index + 1];
    if (count === undefined) {
      console.warn("Invalid number of response in: ", facet);
    }
    const entry = {
      "@id": iri,
      "count": count,
    };
    if (iriAsLabel) {
      entry["label"] = iri;
    }
    output.push(entry);
  }
  return output;
}
