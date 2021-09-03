import {NavigationData} from "../viewer-react/service/navigation";

export enum EvaluationActionType {
  navigation = "navigation",
  like = "like",
  dislike = "dislike",
  loaded = "loadedFromStore"
}

export type EvaluationAction = {
  action: EvaluationActionType;
  time: string;
  navigation?: NavigationData;
  dataset?: string;
  children?: string[];
}

export type EvaluationReport = {
  name: string;
  identifier: string;
  user: string;
  useCase: string | undefined;
  history: EvaluationAction[];
  /**
   * True if user started evaluation, at that point the useCase
   * can not be changed and actions are tracked.
   */
  evaluating: boolean;
};
