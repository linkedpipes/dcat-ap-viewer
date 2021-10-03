import {EvaluationActions} from "./evaluation-actions";
import {
  addNavigation,
  setUserName,
  setUseCase,
  likeDataset,
  dislikeDataset,
  startEvaluation,
  finishEvaluation,
  loadReportFromLocalStorage,
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
    dispatch(onNavigation(navigation));
  }, [navigation]);

  useEffect(() => {
    // Dispatch does not ever change, so this is run only once
    // at the start. As the report can be changed by other windows,
    // we need to be able to react to that and reload.
    window.addEventListener("storage", () => {
      const report = loadReportFromLocalStorage();
      if (report == null) {
        return;
      }
      dispatch(dispatch(EvaluationActions.updateReport(report)));
    });
  }, [dispatch]);

  return {
    "user": state.user,
    "useCase": state.useCase,
    "active": state.evaluating,
    "finished": state.wasFinished,
    "setUser": (value: string) => dispatch(onSetUser(value)),
    "setUseCase": (value: string) => dispatch(onSetUseCase(value)),
    "startEvaluation": () => dispatch(onStartEvaluation()),
    "finishEvaluation": () => dispatch(onFinishEvaluation()),
  };
}

function onNavigation(navigation: NavigationData): AnyAction {
  return EvaluationActions.updateReport(addNavigation(navigation));
}

function onSetUser(value: string): ThunkVoidResult {
  return async (dispatch) => {
    const next = setUserName(value);
    dispatch(EvaluationActions.updateReport(next));
  }
}

function onSetUseCase(value: string): ThunkVoidResult {
  return async (dispatch) => {
    const next = setUseCase(value);
    dispatch(EvaluationActions.updateReport(next));
  }
}

function onStartEvaluation(): ThunkVoidResult {
  return async (dispatch) => {
    const next = startEvaluation();
    dispatch(EvaluationActions.updateReport(next));
  }
}

function onFinishEvaluation(): ThunkVoidResult {
  return async (dispatch) => {
    let next;
    try {
      next = await finishEvaluation();
    } catch (ex) {
      alert("Can't send data to server: " + ex);
      return;
    }
    dispatch(EvaluationActions.updateReport(next));
  }
}

/**
 * @param dataset Dataset user clicked one.
 * @param children Similar datasets in group, are liked / disliked with the dataset.
 */
export function withDatasetEvaluationLike(
  dataset: string, children:string[] | null
) {
  const state = useSelector(evaluationReportSelector);
  const isLiked = useSelector((state) => evaluationLikedSelector(state, dataset));
  const dispatch = useDispatch();

  return {
    "active": state.evaluating,
    "liked": isLiked,
    "toggle": () => dispatch(onToggleDatasetLike(
      state, dataset, children ?? [], isLiked)),
  };
}

function onToggleDatasetLike(
  report: EvaluationReport,
  dataset: string, children:string[], isLiked: boolean
): ThunkVoidResult {
  return async (dispatch) => {
    let next;
    try {
      if (isLiked) {
        next = await dislikeDataset(dataset, children);
      } else {
        next = await likeDataset(dataset, children);
      }
    } catch (ex) {
      alert("Can't send data to server: " + ex);
      return;
    }
    dispatch(EvaluationActions.updateReport(next));
  };
}