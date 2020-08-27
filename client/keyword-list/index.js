import {register} from "../app/register";
import KeywordListContainer from "./keyword-list-container";
import reducer from "./keyword-list-reducer";

export {
  Status,
  keywordListSelector,
} from "./keyword-list-reducer";
export {
  ELEMENT_KEYWORD_LIST,
} from "./keyword-list-container";
export {
  fetchKeywordList,
} from "./keyword-list-service";

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
