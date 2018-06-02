import {register} from "app/register.js";
import reducer from "./dataset-detail-reducer";
import {DatasetDetailView} from "./dataset-detail-view";
import {DATASET_DETAIL_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [DATASET_DETAIL_URL],
    "component": DatasetDetailView
});