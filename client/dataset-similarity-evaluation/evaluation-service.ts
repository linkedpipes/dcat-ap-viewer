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

/**
 * Data structure used to store use-case independent data.
 */
class LocalConfiguration {

  private static STORAGE_KEY = "similarity-evaluation-configuration";

  user:string = "";

  protected constructor() {
  }

  static load(): LocalConfiguration {
    const asString = localStorage.getItem(LocalConfiguration.STORAGE_KEY);
    if (asString === null) {
      return new LocalConfiguration();
    }
    return JSON.parse(asString) as LocalConfiguration;
  }

  static save(configuration:LocalConfiguration) {
    try {
      localStorage.setItem(
        LocalConfiguration.STORAGE_KEY,
        JSON.stringify(configuration));
    } catch (ex) {
      // No data saved for you dear user. Can be by private mode.
    }
  }

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

let firstTimeCall = true;

/**
 * Identification for a window to support multiple tabs.
 */
const WINDOW_IDENTIFIER = Date.now() + "";

/**
 * Identification of the root window, from which all others are open. All
 * windows with the same root share the localStorage data.
 */
let ROOT_IDENTIFIER = "";

(function initializeEvaluation() {
  const query = getUrlQueryPart();
  ROOT_IDENTIFIER = query["root"] || Date.now() + "";
})();

/**
 * Should be added to every URL query part to allow for tracking.
 */
export function getTrackingUrlQuery() {
  return {
    "source": WINDOW_IDENTIFIER,
    "root": ROOT_IDENTIFIER,
  };
}

export function loadFromLocalStoreOrCreate(): EvaluationReport {
  let result = secureReport();
  // Add event about new window opening, only for the first time, this
  // method is called.
  if (firstTimeCall) {
    const urlSearchParams = getUrlQueryPart();
    firstTimeCall = false;
    result.history.push({
      "action": EvaluationActionType.openWindow,
      "time": new Date().toISOString(),
      "window": WINDOW_IDENTIFIER,
      "href": getHrefForAction(),
      "parent": urlSearchParams["source"],
    });
    const query = getUrlQueryPart();
    if (query["autoStart"] !== undefined ) {
      result.evaluating = true;
      result.history.push(createStartEvaluation(true));
    }
  }
  saveToBrowser(result);
  return result;
}

/**
 * Return active instance of report class.
 */
function secureReport(): EvaluationReport {
  const useCaseReport = loadFromBrowser();
  // use-case report utilize the use-case from query, so if there is
  // one we return it.
  if (useCaseReport !== null) {
    return useCaseReport;
  }
  // If there is no stored report for the use-case create a new one.
  return createReportFromQuery();
}

export function loadFromBrowser(): EvaluationReport | null {
  const key = getReportStorageKey();
  if (key === null) {
    return null;
  }
  const value = sessionStorage.getItem(key);
  if (value == null) {
    return null;
  }
  return JSON.parse(value) as EvaluationReport;
}

function getReportStorageKey(): string {
  return "similarity-evaluation:"
    + CONFIGURATION.evaluationName
    + ":" + ROOT_IDENTIFIER;
}

function getUrlQueryPart() {
  return Object.fromEntries(
    new URLSearchParams(window.location.search).entries());
}

function createReportFromQuery(): EvaluationReport {
  const query = getUrlQueryPart();
  const name = CONFIGURATION.evaluationName;
  const configuration = LocalConfiguration.load();
  return {
    "name": name,
    "identifier": name + "-" + Date.now() + "-" + guid(),
    "user": query["user"] ?? configuration.user ?? guid(),
    "useCase": query["useCase"] ?? useCases[0]["key"],
    "history": [],
    "evaluating": false,
    "wasFinished": false,
  };
}

function guid(): string {
  return 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getHrefForAction() {
  return {
    "origin": window.location.origin,
    "pathname": window.location.pathname,
    "search": window.location.search,
  };
}

function saveToBrowser(report: EvaluationReport) {
  const key = getReportStorageKey();
  try {
    sessionStorage.setItem(key, JSON.stringify(report));
  } catch (ex) {
    // No data saved for you dear user. Can be by private mode.
  }
}

export function buildLikedDatasets(report:EvaluationReport): Set<string> {
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

function saveToServer(report: EvaluationReport) {
  return axios.post("./api/v2/storage", report);
}

export function addNavigation(navigation: NavigationData): EvaluationReport {
  return addActionToReport(createNavigationAction(navigation));
}

function createNavigationAction(navigation: NavigationData): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.navigation,
    "window": WINDOW_IDENTIFIER,
    "href": getHrefForAction(),
    "navigation": navigation,
  }
}

function addActionToReport(action: EvaluationAction): EvaluationReport {
  const result = secureReport();
  if (!result.evaluating) {
    return result;
  }
  result.history.push(action);
  saveToBrowser(result);
  return result;
}

export async function likeDataset(
  dataset: string, children: string[],
): Promise<EvaluationReport> {
  return addActionToReport(createLikeAction(dataset, children));
}

function createLikeAction(
  dataset: string, children: string[],
): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.like,
    "dataset": dataset,
    "children": children,
    "window": WINDOW_IDENTIFIER,
    "href": getHrefForAction(),
  }
}

export async function dislikeDataset(
  dataset: string, children: string[],
): Promise<EvaluationReport> {
  return addActionToReport(createDislikeAction(dataset, children));
}

function createDislikeAction(
  dataset: string, children: string[],
): EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.dislike,
    "dataset": dataset,
    "children": children,
    "window": WINDOW_IDENTIFIER,
    "href": getHrefForAction(),
  }
}

export function startEvaluation(): EvaluationReport {
  const result = secureReport();
  result.evaluating = true;
  result.history.push(createStartEvaluation(false));
  saveToBrowser(result);
  return result;
}

function createStartEvaluation(autoStart:boolean) : EvaluationAction {
  return {
    "time": new Date().toISOString(),
    "action": EvaluationActionType.start,
    "window": WINDOW_IDENTIFIER,
    "href": getHrefForAction(),
    "autoStart": autoStart,
  };
}

export async function finishEvaluation(): Promise<EvaluationReport> {
  const result = secureReport();
  result.evaluating = false;
  result.wasFinished = true;
  result.history.push({
    "time": new Date().toISOString(),
    "action": EvaluationActionType.finish,
    "window": WINDOW_IDENTIFIER,
    "href": getHrefForAction(),
  });
  await saveToServer(result);
  // We allow user to start the evaluation again.
  saveToBrowser(result);
  return result;
}

export function setUserName(user: string): EvaluationReport {
  const configuration = LocalConfiguration.load();
  configuration.user= user;
  LocalConfiguration.save(configuration);
  //
  const result = secureReport();
  result.user = user;
  saveToBrowser(result);
  return result;
}

export function setUseCase(useCase: string): EvaluationReport {
  // This creates new storage report key.
  const result = secureReport();
  result.useCase = useCase;
  saveToBrowser(result);
  return result;
}

// We also save information when a tab is closed.
window.onbeforeunload = function () {
  const report = secureReport();
  if (report === null) {
    return;
  }
  report.history.push({
    "action": EvaluationActionType.closeWindow,
    "time": new Date().toISOString(),
    "window": WINDOW_IDENTIFIER,
    "href": getHrefForAction(),
  });
  saveToBrowser(report);
};
