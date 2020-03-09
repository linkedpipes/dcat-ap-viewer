//
// Module for working with jsonld-flat content.
//

import {JsonLdEntity} from "./model";
import {getId, getTypes} from "./entity";

export type ObjectHandler = (object: JsonLdEntity) => void;

export function getEntityByIri(
  jsonld: JsonLdEntity[], iri: string): JsonLdEntity | undefined {
  for (let entity of jsonld) {
    if (getId(entity) === iri) {
      return entity;
    }
  }
  return undefined;
}

export function getEntityByType(
  jsonld: JsonLdEntity[], type: string): JsonLdEntity | undefined {
  for (let entity of jsonld) {
    if (!getTypes(entity).includes(type)) {
      continue;
    }
    return entity;
  }
}

export function getEntitiesByType(
  jsonld: JsonLdEntity[], type: string): JsonLdEntity[] {
  const result: JsonLdEntity[] = [];
  for (let entity of jsonld) {
    if (!getTypes(entity).includes(type)) {
      continue;
    }
    result.push(entity);
  }
  return result;
}

export function iterateEntitiesByType(
  jsonld: JsonLdEntity[], type: string, callback: ObjectHandler): void {
  for (let entity of jsonld) {
    if (!getTypes(entity).includes(type)) {
      continue;
    }
    callback(entity);
  }
}

export function iterateEntities(
  jsonld: JsonLdEntity[], callback: ObjectHandler): void {
  for (let entity of jsonld) {
    callback(entity);
  }
}
