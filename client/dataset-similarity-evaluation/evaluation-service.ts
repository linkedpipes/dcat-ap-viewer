import axios from "axios";
import {
  EvaluationAction,
  EvaluationActionType,
  EvaluationReport
} from "./evaluation-model";
import {NavigationData} from "../viewer-react/service/navigation";
import useCases from "./use-cases";

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

enum LikedSource {
  /**
   * Dataset was liked directly, so it can be unliked only directly.
   */
  Self,
  /**
   * Dataset was liked as a part of a group, it can be unliked directly
   * or as a part of a group.
   */
  ByGroup
}

export function buildLikedDatasets(report: EvaluationReport): Set<string> {
  // For each dataset we store why it is liked.
  const likedDatasets: Record<string, LikedSource> = {};
  report.history.forEach(action => {
    if (action.dataset === undefined) {
      return;
    }
    if (action.action === EvaluationActionType.like) {
      likedDatasets[action.dataset] = LikedSource.Self;
      (action.children ?? []).forEach(iri => {
        likedDatasets[iri] = likedDatasets[iri] ?? LikedSource.ByGroup;
      });
    }
    if (action.action === EvaluationActionType.dislike) {
      delete likedDatasets[action.dataset];
      (action.children ?? []).forEach(iri => {
        // We can remove the like only if the dataset was liked
        // as a part of a group.
        if (likedDatasets[iri] === LikedSource.ByGroup) {
          delete likedDatasets[iri];
        }
      });
    }
  })
  return new Set(Object.entries(likedDatasets)
    .filter(([key, value]) => true)
    .map(item => item[0])
  );
}

function saveToLocalStore(report: EvaluationReport) {
  const key = CONFIGURATION.evaluationName;
  try {
    localStorage.setItem(key, JSON.stringify(report));
  } catch (ex) {
    // No data saved for you dear user. Can be by private mode.
  }
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
  report: EvaluationReport, dataset: string, children: string[],
): Promise<EvaluationReport> {
  const result: EvaluationReport = {
    ...report,
    "history": [...report.history, createLikeAction(dataset, children)],
  };
  saveToLocalStore(result);
  await saveToServer(report);
  return result;
}

function createLikeAction(
  dataset: string, children: string[],
): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.like,
    "dataset": dataset,
    "children": children,
  }
}

export async function dislikeDataset(
  report: EvaluationReport, dataset: string, children: string[],
): Promise<EvaluationReport> {
  const result: EvaluationReport = {
    ...report,
    "history": [...report.history, createDislikeAction(dataset, children)],
  };
  saveToLocalStore(result);
  await saveToServer(report);
  return result;
}

function createDislikeAction(
  dataset: string, children: string[],
): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.dislike,
    "dataset": dataset,
    "children": children,
  }
}

export function startEvaluation(
  report: EvaluationReport
): EvaluationReport {
  const result = {
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
  const result = {
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
  const result = {
    ...report,
    "useCase": useCase,
  };
  saveToLocalStore(result);
  return result;
}
