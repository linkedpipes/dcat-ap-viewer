import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {getApiInstance} from "../api/api-action";
import {selectLanguage} from "../app/component-api";
import {jsonLdToCatalogList} from "./jsonld-to-catalog-list";
import {catalogsListSelector, Status} from "./catalog-list-reducer";
import {CatalogListActions} from "./catalog-list-action";
import {fetchLabels} from "../labels/labels-service";
import {Catalog} from "./catalog-list-model";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchCatalogList(): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (catalogsListSelector(state).status === Status.Loading) {
      return;
    }
    dispatch(CatalogListActions.fetchCatalogList.request(null));
    try {
      const jsonld = await getApiInstance().fetchCatalogList(language);
      if (jsonld === undefined) {
        dispatch(CatalogListActions.fetchCatalogList.failure({
          "error": new Error("Missing JSON-LD data."),
        }));
      }
      const catalogs = jsonLdToCatalogList(jsonld);
      catalogs.sort((left, right) => right.iri.localeCompare(left.iri));
      //
      dispatch(CatalogListActions.fetchCatalogList.success({
        "payload": catalogs,
        "jsonld": jsonld,
      }));
      dispatch(fetchLabels(collectLabels(catalogs)));
    } catch (ex) {
      dispatch(CatalogListActions.fetchCatalogList.failure({
        "error": ex,
      }));
    }
  };
}

function collectLabels(catalogs: Catalog[]): string[] {
  const result: string[] = [];
  for (const catalog of catalogs) {
    if (catalog.publisher) {
      result.push(catalog.publisher);
    }
    if (catalog.contact) {
      result.push(catalog.contact);
    }
  }
  return result;
}
