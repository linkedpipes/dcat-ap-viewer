import {register, URL_CATALOG_LIST} from "../../app/component-api";
import CatalogsViewContainer from "./catalog-list-container";
import reducer from "./catalog-list-reducer";

register({
  "name": reducer.name,
  "reducer": reducer.function,
});

register({
  "name": reducer.name + "-container",
  "url": URL_CATALOG_LIST,
  "query": [],
  "view": CatalogsViewContainer,
});
