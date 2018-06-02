import {register} from "app/register.js";
import reducer from "./organisation-list-reducer";
import {OrganisationListView} from "./organisation-list-view";
import {ORGANISATION_LIST_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [ORGANISATION_LIST_URL],
    "component": OrganisationListView
});