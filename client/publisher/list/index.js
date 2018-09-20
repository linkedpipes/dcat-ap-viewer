import {register} from "app/register.js";
import reducer from "./publisher-list-reducer";
import {PublisherListContainer} from "./publisher-list-container";
import {ORGANISATION_LIST_URL} from "@/app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [ORGANISATION_LIST_URL],
    "component": PublisherListContainer,
    "strings": {
        "cs" : {
            "publishers_found": "poskytovatelů nalezeno"
            ,"one_dataset": "1 datová sada"
            ,"two_three_datasets": " datové sady"
            ,"many_datasets": " datových sad"
        },
        "en": {
            "publishers_found": "publishers found"
            ,"one_dataset": "1 dataset"
            ,"two_three_datasets": " datasets"
            ,"many_datasets": " datasets"
        }
    }
});
