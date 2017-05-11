export const quads = {};

export const triples = {};

triples.getId = (entity) => {
    if (entity["@id"]) {
        return entity["@id"];
    } else if (entity["id"]) {
        return entity["id"];
    } else {
        return undefined;
    }
};

triples.getValues = (entity, predicate) => {
    let values = asArray(entity[predicate]);
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

triples.getValue = (entity, predicate) => {
    const values = triples.getValues(entity, predicate);
    if (values.length === 0) {
        return undefined;
    } else {
        return values[0];
    }
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

triples.getResources = (entity, predicate) => {
    let values = asArray(entity[predicate]);
    return values.map((item) => {
        const id = triples.getId(item);
        if (id === undefined) {
            console.warn("Missing @id for: ", value);
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



