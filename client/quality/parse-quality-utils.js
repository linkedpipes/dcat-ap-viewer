
export function sdmxRefToDate(iri) {
  return iri.substr(iri.lastIndexOf("/") + 1)
    .replace("T", " ");
}
