import axios from "axios";
import {
  EvaluationAction,
  EvaluationActionType,
  EvaluationReport
} from "./evaluation-model";
import {NavigationData} from "../viewer-react/service/navigation";
import * as useCases from "./use-cases.json";

declare var CONFIGURATION: {

  evaluationName: string;

}

export function loadFromLocalStoreOrCreate(): EvaluationReport {
  const key = CONFIGURATION.evaluationName;
  const value = localStorage.getItem(key);
  if (value == null) {
    return createEmptyEvaluationData();
  }
  const result = JSON.parse(value) as EvaluationReport;
  if (result.evaluating) {
    result.history.push({
      "action": EvaluationActionType.loaded,
      "time": new Date().toISOString(),
    });
  }
  return result;
}

function createEmptyEvaluationData(): EvaluationReport {
  const name = CONFIGURATION.evaluationName;
  return {
    "name": name,
    "identifier": name + "-" + (new Date()).toISOString() + "-" + guid(),
    "user": guid(),
    "useCase": useCases[0]["key"],
    "history": [],
    "evaluating": false,
  };
}

function guid(): string {
  return 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function buildLikedDatasets(report: EvaluationReport): Set<string> {
  const result: Set<string> = new Set();
  report.history.forEach(action => {
    if (action.dataset === undefined) {
      return;
    }
    if (action.action === EvaluationActionType.like) {
      result.add(action.dataset);
    }
    if (action.action === EvaluationActionType.dislike) {
      result.delete(action.dataset);
    }
  })
  return result;
}

function saveToLocalStore(report: EvaluationReport) {
  const key = CONFIGURATION.evaluationName;
  localStorage.setItem(key, JSON.stringify(report));
}

function saveToServer(report: EvaluationReport) {
  return axios.post("./api/v2/storage", report);
}

export function addNavigation(
  report: EvaluationReport, navigation: NavigationData,
): EvaluationReport {
  if (!report.evaluating) {
    return report;
  }
  const result: EvaluationReport = {
    ...report,
    "history": [...report.history, createNavigationAction(navigation)],
  };
  saveToLocalStore(result);
  return result;
}

function createNavigationAction(navigation: NavigationData): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.navigation,
    "navigation": navigation,
  }
}

export async function likeDataset(
  report: EvaluationReport, dataset: string,
): Promise<EvaluationReport> {
  const result: EvaluationReport = {
    ...report,
    "history": [...report.history, createLikeAction(dataset)],
  };
  saveToLocalStore(result);
  await saveToServer(report);
  return result;
}

function createLikeAction(dataset: string): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.like,
    "dataset": dataset,
  }
}

export async function dislikeDataset(
  report: EvaluationReport, dataset: string,
): Promise<EvaluationReport> {
  const result: EvaluationReport = {
    ...report,
    "history": [...report.history, createDislikeAction(dataset)],
  };
  saveToLocalStore(result);
  await saveToServer(report);
  return result;
}

function createDislikeAction(dataset: string): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.dislike,
    "dataset": dataset,
  }
}

export function startEvaluation(
  report: EvaluationReport
): EvaluationReport {
  const result =  {
    ...report,
    "evaluating": true,
  };
  saveToLocalStore(result);
  return result;
}

export async function finishEvaluation(
  report: EvaluationReport
): Promise<EvaluationReport> {
  await saveToServer(report);
  const result = {
    ...createEmptyEvaluationData(),
    "user": report.user,
  };
  saveToLocalStore(result);
  return result;
}

export function setUserName(
  report: EvaluationReport, user: string
): EvaluationReport {
  const result =  {
    ...report,
    "user": user,
  };
  saveToLocalStore(result);
  return result;
}

export function setUseCase(
  report: EvaluationReport, useCase: string
): EvaluationReport {
  if (report.evaluating) {
    throw new Error("Can't change use-case after evaluation has started.")
  }
  const result =  {
    ...report,
    "useCase": useCase,
  };
  saveToLocalStore(result);
  return result;
}
