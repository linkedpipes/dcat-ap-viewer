import {register} from "app/register.js";
import reducer from "./dataset-list-reducer";
import {DatasetList} from "./dataset-list";
import {DATASET_LIST_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [DATASET_LIST_URL],
    "component": DatasetList,
    "homepage" : true
});