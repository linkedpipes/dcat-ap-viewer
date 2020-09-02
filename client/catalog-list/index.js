import {register} from "../app/register";
import CatalogListContainer from "./catalog-list-container";
import reducer from "./catalog-list-reducer";

export {
  Status,
  catalogsListSelector,
} from "./catalog-list-reducer";
export {
  ELEMENT_CATALOG_LIST,
} from "./catalog-list-container";
export {
  fetchCatalogList,
} from "./catalog-list-service";

register({
  "name": reducer.name,
  "reducer": reducer.function,
});

register({
  "name": reducer.name + "-container",
  "url": "/catalogs",
  "query": [],
  "view": CatalogListContainer,
});
