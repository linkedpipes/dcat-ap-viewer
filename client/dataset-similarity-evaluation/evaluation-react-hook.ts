import {EvaluationActions} from "./evaluation-actions";
import {
  addNavigation,
  setUserName, setUseCase,
  likeDataset, dislikeDataset,
  startEvaluation, finishEvaluation,
} from "./evaluation-service";
import {
  evaluationLikedSelector,
  evaluationReportSelector,
} from "./evaluation-reducer";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {
  NavigationContext,
  NavigationData
} from "../viewer-react/service/navigation";
import {EvaluationReport} from "./evaluation-model";

type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function withDatasetEvaluationReport() {
  const navigation = useContext(NavigationContext);
  const state = useSelector(evaluationReportSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onNavigation(state, navigation));
  }, [navigation]);

  return {
    "user": state.user,
    "useCase": state.useCase,
    "active": state.evaluating,
    "setUser": (value: string) => dispatch(onSetUser(state, value)),
    "setUseCase": (value: string) => dispatch(onSetUseCase(state, value)),
    "startEvaluation": () => dispatch(onStartEvaluation(state)),
    "finishEvaluation": () => dispatch(onFinishEvaluation(state)),
  };
}

function onNavigation(
  report: EvaluationReport, navigation: NavigationData
): AnyAction {
  return EvaluationActions.updateReport(addNavigation(report, navigation));
}

function onSetUser(
  report: EvaluationReport, value: string
): ThunkVoidResult {
  return async (dispatch) => {
    const next = setUserName(report, value);
    dispatch(EvaluationActions.updateReport(next));
  }
}

function onSetUseCase(
  report: EvaluationReport, value: string
): ThunkVoidResult {
  return async (dispatch) => {
    const next = setUseCase(report, value);
    dispatch(EvaluationActions.updateReport(next));
  }
}

function onStartEvaluation(
  report: EvaluationReport
): ThunkVoidResult {
  return async (dispatch) => {
    const next = startEvaluation(report);
    dispatch(EvaluationActions.updateReport(next));
  }
}

function onFinishEvaluation(
  report: EvaluationReport
): ThunkVoidResult {
  return async (dispatch) => {
    let next;
    try {
      next = await finishEvaluation(report);
    } catch (ex) {
      alert("Can't send data to server: " + ex);
      return;
    }
    dispatch(EvaluationActions.updateReport(next));
  }
}

export function withDatasetEvaluationLike(dataset: string) {
  const state = useSelector(evaluationReportSelector);
  const isLiked = useSelector((state) => evaluationLikedSelector(state, dataset));
  const dispatch = useDispatch();

  return {
    "active": state.evaluating,
    "liked": isLiked,
    "toggle": () => dispatch(onToggleDatasetLike(state, dataset, isLiked)),
  };
}

function onToggleDatasetLike(
  report: EvaluationReport, dataset: string, isLiked: boolean): ThunkVoidResult {
  return async (dispatch) => {
    let next;
    try {
      if (isLiked) {
        next = await dislikeDataset(report, dataset);
      } else {
        next = await likeDataset(report, dataset);
      }
    } catch (ex) {
      alert("Can't send data to server: " + ex);
      return;
    }
    dispatch(EvaluationActions.updateReport(next));
  };
}