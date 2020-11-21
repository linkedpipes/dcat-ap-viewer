import {ActionType, createAsyncAction} from "typesafe-actions";

import {Label} from "../../../data-api/api-label";

export interface LabelFetchPayload {

  language: string;

  iri: string;

}

export interface LabelFetchPayloadSuccess {

  labels: Label[];

}

export const LabelActions = {
  "fetchLabel": createAsyncAction(
    "app.label.request",
    "app.label.success",
    "app.label.failure",
  )<LabelFetchPayload, LabelFetchPayloadSuccess, void>(),
};

export type LabelActionsType = ActionType<typeof LabelActions>;
