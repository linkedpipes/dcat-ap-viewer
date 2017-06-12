export const graph = {};

graph.getByType = (data, type) => {
    const graph = data["@graph"];
    if (graph === undefined || graph.length === undefined) {
        return undefined;
    }
    for (let index = 0; index < graph.length; ++index) {
        if (triples.getType(graph[index]).indexOf(type) > -1) {
            return graph[index];
        }
    }
    return undefined;
};

graph.getByResources = (data, iris) => {
    const iriList = asArray(iris);
    const graph = data["@graph"];
    const result = [];
    for (let index = 0; index < graph.length; ++index) {
        if (iriList.indexOf(triples.getId(graph[index])) > -1) {
            result.push(graph[index]);
        }
    }
    return result;
};

graph.getByResource = (data, iri) => {
    if (iri == undefined) {
        return undefined;
    }
    const graph = data["@graph"];
    for (let index = 0; index < graph.length; ++index) {
        if (triples.getId(graph[index]) === iri) {
            return graph[index];
        }
    }
    return undefined;
};

export const triples = {};

triples.getId = (entity) => {
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

triples.getType = (entity) => {
    if (entity["@type"] === undefined) {
        return [];
    } else {
        return entity["@type"];
    }
};

triples.getValues = (entity, predicate) => {
    let values = asArray(getValueForPredicate(entity,predicate));
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

function getValueForPredicate(entity, predicate) {
    if (entity === undefined) {
        return undefined;
    } else {
        return entity[predicate];
    }
}

function asArray(values) {
    if (values === undefined || values === null) {
        return [];
    } else if (Array.isArray(values)) {
        return values;
    } else {
        return [values];
    }
}

triples.getValue = (entity, predicate) => {
    const values = triples.getValues(entity, predicate);
    if (values.length === 0) {
        return undefined;
    } else {
        return values[0];
    }
};

triples.getResources = (entity, predicate) => {
    let values = asArray(getValueForPredicate(entity,predicate));
    return values.map((item) => {
        const id = triples.getId(item);
        if (id === undefined) {
            console.warn("Missing @id for: ", item);
            return undefined;
        } else {
            return id;
        }
    });
};

triples.getResource = (entity, predicate) => {
    const values = triples.getResources(entity, predicate);
    if (values.length === 0) {
        return undefined;
    } else {
        return values[0];
    }
};



