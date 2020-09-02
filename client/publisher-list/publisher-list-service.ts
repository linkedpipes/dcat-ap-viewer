import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {getApiInstance} from "../api/api-action";
import {selectLanguage} from "../app/component-api";
import {jsonLdToPublisherList} from "./jsonld-to-publisher-list";
import {publishersListSelector, Status} from "./publisher-list-reducer";
import {PublisherListActions} from "./publisher-list-action";
import {Publisher} from "./publisher-list-model";
import {fetchLabels} from "../labels/labels-service";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchPublisherList(): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (publishersListSelector(state).status === Status.Loading) {
      return;
    }
    dispatch(PublisherListActions.fetchPublisherList.request(null));
    try {
      const jsonld = await getApiInstance().fetchPublisherList(language);
      if (jsonld === undefined) {
        dispatch(PublisherListActions.fetchPublisherList.failure({
          "error": new Error("Missing JSON-LD data."),
        }));
      }
      const publishers = jsonLdToPublisherList(jsonld);
      publishers.sort((left, right) => right.iri.localeCompare(left.iri));
      //
      dispatch(PublisherListActions.fetchPublisherList.success({
        "payload": publishers,
        "jsonld": jsonld,
      }));
      dispatch(fetchLabels(collectLabels(publishers)));
    } catch (ex) {
      dispatch(PublisherListActions.fetchPublisherList.failure({
        "error": ex,
      }));
    }
  };
}

function collectLabels(publishers: Publisher[]): string[] {
  return publishers.map(publisher => publisher.iri);
}
