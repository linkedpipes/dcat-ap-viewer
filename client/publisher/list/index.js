import {register} from "app/register.js";
import reducer from "./publisher-list-reducer";
import {PublisherListContainer} from "./publisher-list-container";
import {ORGANISATION_LIST_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [ORGANISATION_LIST_URL],
    "component": PublisherListContainer
});
