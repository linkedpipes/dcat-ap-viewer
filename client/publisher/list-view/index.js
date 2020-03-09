import {register} from "../../app/component-api";
import PublisherListContainer from "./publisher-list-container";
import reducer from "./publisher-list-reducer";

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
