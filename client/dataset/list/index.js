import {register} from "app/register.js";
import reducer from "./dataset-list-reducer";
import {DatasetListView} from "./dataset-list-view";
import {DATASET_LIST_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [DATASET_LIST_URL],
    "component": DatasetListView
});