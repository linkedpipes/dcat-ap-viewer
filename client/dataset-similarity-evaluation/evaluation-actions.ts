import {ActionType, createAction} from "typesafe-actions";
import {EvaluationReport} from "./evaluation-model";

export const EvaluationActions = {
  /**
   * We use single action as we need to post data to the server, hence
   * the state modification must happen in the action anyway.
   */
  "updateReport": createAction(
    "app.evaluation.update-report")<EvaluationReport>(),
}

export type EvaluationActionsType =
  ActionType<typeof EvaluationActions>;
