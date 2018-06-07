import {register} from "app/register.js";
import reducer from "./dataset-detail-reducer";
import {DatasetDetailContainer} from "./dataset-detail-container";
import {DATASET_DETAIL_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [DATASET_DETAIL_URL],
    "component": DatasetDetailContainer
});
