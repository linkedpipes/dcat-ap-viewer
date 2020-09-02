import {register} from "../app/register";
import PublisherListContainer from "./publisher-list-container";
import reducer from "./publisher-list-reducer";

export {
  Status,
  publishersListSelector,
} from "./publisher-list-reducer";
export {
  ELEMENT_PUBLISHER_LIST,
} from "./publisher-list-container";
export {
  fetchPublisherList,
} from "./publisher-list-service";

register({
  "name": reducer.name,
  "reducer": reducer.function,
});

register({
  "name": reducer.name + "-container",
  "url": "/publishers",
  "query": [],
  "view": PublisherListContainer,
});
