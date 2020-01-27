import {RDF} from "./vocabulary";

// TODO Merge to single object with triples use names to distinct.
export const graph = {};

export const triples = {};

// TODO Rename to more reflect return type (entity object).
graph.getByType = (data, type) => {
  const graph = getGraph(data);
  if (graph === undefined || graph.length === undefined) {
    return undefined;
  }
  for (let index = 0; index < graph.length; ++index) {
    if (triples.type(graph[index]).indexOf(type) > -1) {
      return graph[index];
    }
  }
  return undefined;
};

graph.getAllByType = (data, type) => {
  const output = [];
  const graph = getGraph(data);
  if (graph === undefined || graph.length === undefined) {
    return [];
  }
  for (let index = 0; index < graph.length; ++index) {
    if (triples.type(graph[index]).indexOf(type) > -1) {
      output.push(graph[index]);
    }
  }
  return output;
};

function getGraph(data) {
  // TODO Add support for different data formats.
  if (data["@graph"] === undefined) {
    return data;
  } else {
    return data["@graph"]
  }
}

graph.getByResources = (data, iris) => {
  const iriList = asArray(iris);
  const graph = getGraph(data);
  const result = [];
  for (let index = 0; index < graph.length; ++index) {
    if (iriList.indexOf(triples.id(graph[index])) > -1) {
      result.push(graph[index]);
    }
  }
  return result;
};

graph.getByResource = (data, iri) => {
  if (iri === undefined) {
    return undefined;
  }
  const graph = getGraph(data);
  for (let index = 0; index < graph.length; ++index) {
    if (triples.id(graph[index]) === iri) {
      return graph[index];
    }
  }
  return undefined;
};

graph.getResources = (data) => {
  const graph = getGraph(data);
  const result = [];
  for (let index = 0; index < graph.length; ++index) {
    result.push(graph[index]);
  }
  return result;
};

graph.forEachResource = (data, callback) => {
  const graph = getGraph(data);
  const result = [];
  for (let index = 0; index < graph.length; ++index) {
    callback(graph[index]);
  }
  return result;
};

triples.id = (entity) => {
  if (entity === undefined) {
    return undefined;
  } else if (entity["@id"]) {
    return entity["@id"];
  } else if (entity["id"]) {
    return entity["id"];
  } else {
    return undefined;
  }
};

triples.type = (entity) => {
  if (entity["@type"] !== undefined) {
    return entity["@type"];
  }
  if (entity[RDF.type] !== undefined) {
    // As a fallback for invalid json-ld
    return triples.resources(entity, RDF.type);
  }
  return [];
};

triples.values = (entity, predicate) => {
  let values = asArray(getValueForPredicate(entity, predicate));
  const result = [];
  values.forEach((item) => {
    if (item["@value"] === undefined) {
      result.push(item);
    } else {
      result.push(item["@value"]);
    }
  });
  return result;
};

function asArray(values) {
  if (values === undefined || values === null) {
    return [];
  } else if (Array.isArray(values)) {
    return values;
  } else {
    return [values];
  }
}

function getValueForPredicate(entity, predicate) {
  if (entity === undefined) {
    return undefined;
  } else {
    return entity[predicate];
  }
}

triples.value = (entity, predicate) => {
  const values = triples.values(entity, predicate);
  if (values.length === 0) {
    return undefined;
  } else {
    return values[0];
  }
};

triples.resources = (entity, predicate) => {
  let values = asArray(getValueForPredicate(entity, predicate));
  return values.map((item) => {
    const id = triples.id(item);
    if (id === undefined) {
      console.warn("Missing resource @id: ", item);
      return undefined;
    } else {
      return id;
    }
  });
};

triples.resource = (entity, predicate) => {
  const values = triples.resources(entity, predicate);
  if (values.length === 0) {
    return undefined;
  } else {
    return values[0];
  }
};

triples.string = (entity, predicate) => {
  let values = asArray(getValueForPredicate(entity, predicate));
  const result = {};
  values.forEach((item) => {
    const lang = item["@language"] || "";
    if (result[lang] === undefined) {
      result[lang] = [];
    }
    const value = item["@value"] === undefined ? item : item["@value"];
    result[lang].push(value);
  });
  return result;
};

// Return resource as an empty jsonld object with @id
triples.entity = (entity, predicate) => {
  const iri = triples.resource(entity, predicate);
  if (iri === undefined) {
    return undefined;
  } else {
    return {
      "@id": iri,
    }
  }
};

triples.entities = (entity, predicate) => {
  return triples.resources(entity, predicate).map((iri) => ({
    "@id": iri,
  }));
};