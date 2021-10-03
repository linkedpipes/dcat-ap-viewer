import {NavigationData} from "../viewer-react/service/navigation";

export enum EvaluationActionType {
  navigation = "navigation",
  like = "like",
  dislike = "dislike",
  openWindow = "openWindow",
  closeWindow = "closeWindow",
  start = "start",
  finish = "finish",
}

export type EvaluationAction = {
  action: EvaluationActionType;
  time: string;
  // Identification of a window / tab where the action was executed.
  window: string;
  navigation?: NavigationData;
  dataset?: string;
  children?: string[];
  // URL of a site where the action was executed.
  href: any;
  // Can be used to identify the source window.
  parent?: string;
  // True if the evaluation was started automatically.
  autoStart?:boolean;
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
  /**
   * Set to true if the evaluation was finished any time before.
   * We add this to allow user to restart the evaluation.
   */
  wasFinished: boolean;
};
