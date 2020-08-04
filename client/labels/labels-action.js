import {fetchLabel, FETCH_LABEL_SUCCESS} from "../api/api-action";
import {shouldFetch} from "./labels-reducer";
import {selectLanguage} from "../app/navigation";
import {getApiInstance} from "../api/api-action";

/**
 * For all given IRIs without labels, fetch them.
 */
export function fetchLabels(iris) {
  return (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    for (const iri of iris) {
      // We can not fetch information about blank nodes.
      if (iri === undefined || iri === null || isBlankNode(iri)) {
        continue;
      }
      if (shouldFetch(state, iri, language)) {
        dispatch(fetchLabel(iri));
      }
    }
  };
}

/**
 * Fetch label for dataset, as datasets labels are not available in
 * an extra databse we need to fetch the whole dataset detail.
 */
export function fetchDatasetLabel(iri) {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (!shouldFetch(state, iri, language)) {
      // We already have the label.
      return;
    }
    const jsonld = await getApiInstance().fetchDataset(language, iri);
    dispatch({
      "type": FETCH_LABEL_SUCCESS,
      "jsonld": jsonld,
    });
  };
}

function isBlankNode(iri) {
  return iri.startsWith("_:");
}
