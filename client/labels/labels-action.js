import {fetchLabel} from "../api/api-action";
import {shouldFetch} from "./labels-reducer";
import {selectLanguage} from "../app/navigation";

/**
 * For all given IRIs without labels, fetch them.
 */
export function fetchLabels(iris) {
  return (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    for (const iri of iris) {
      // We can not fetch information about blank nodes.
      if (isBlankNode(iri)) {
        continue;
      }
      if (shouldFetch(state, iri, language)) {
        dispatch(fetchLabel(iri));
      }
    }
  };
}

function isBlankNode(iri) {
  return iri.startsWith("_:");
}
