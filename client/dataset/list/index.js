import {register} from "app/register.js";
import reducer from "./dataset-list-reducer";
import {DatasetListContainer} from "./dataset-list-container";
import {DATASET_LIST_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [DATASET_LIST_URL],
    "component": DatasetListContainer,
    "homepage" : true
});