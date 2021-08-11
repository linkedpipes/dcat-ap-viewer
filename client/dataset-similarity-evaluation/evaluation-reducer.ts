import {getType} from "typesafe-actions";
import {register} from "../viewer-react/core/register";
import {EvaluationReport} from "./evaluation-model";
import {
  buildLikedDatasets,
  loadFromLocalStoreOrCreate
} from "./evaluation-service";
import {EvaluationActions, EvaluationActionsType} from "./evaluation-actions";

class State {
  report: EvaluationReport;
  likedDatasets: Set<string>;

  constructor() {
    this.report = loadFromLocalStoreOrCreate();
    this.likedDatasets = buildLikedDatasets(this.report);
  }
}

function reducer(state = new State(), action: EvaluationActionsType) {
  switch (action.type) {
    case getType(EvaluationActions.updateReport):
      return {
        "report": action.payload,
        "likedDatasets": buildLikedDatasets(action.payload),
      };
    default:
      return state;
  }
}


const reducerName = "app.evaluation.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const stateSelector = (state: any): State => state[reducerName];

export const evaluationReportSelector =
  (state: any) => stateSelector(state).report;

export const evaluationLikedSelector =
  (state: any, dataset:string) =>
    stateSelector(state).likedDatasets.has(dataset);
