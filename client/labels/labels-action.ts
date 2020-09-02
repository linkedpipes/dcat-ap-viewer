import {ActionType, createAsyncAction} from "typesafe-actions";
import {JsonLdEntity} from "../jsonld";

export interface LabelFetchPayload {
  iri:string;
}

export interface LabelFetchPayloadSuccess {
  iri:string;
  jsonld: JsonLdEntity[];
}

export interface LabelFetchPayloadFailed {
  iri:string;
}

export const LabelActions = {
  "fetchLabel": createAsyncAction(
    "app.label.request",
    "app.label.success",
    "app.label.failure",
  )<LabelFetchPayload,
    LabelFetchPayloadSuccess,
    LabelFetchPayloadFailed>(),
};

export type LabelActionsType = ActionType<typeof LabelActions>;
