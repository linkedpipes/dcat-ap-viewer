import {register} from "../../app/component-api";
import KeywordListContainer from "./keyword-list-container";
import reducer from "./keyword-list-reducer";

register({
  "name": reducer.name,
  "reducer": reducer.function,
});

register({
  "name": reducer.name + "-container",
  "url": "/keywords",
  "query": [],
  "view": KeywordListContainer,
});
