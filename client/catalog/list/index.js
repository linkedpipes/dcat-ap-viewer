import {register} from "app/register.js";
import {CatalogsViewContainer} from "./catalog-list-container";
import {CATALOG_LIST} from "@/app/navigation";
import reducer from "./catalog-list-reducer";

register({
    "name": reducer.name,
    "reducer": reducer.reducer,
    "url": [CATALOG_LIST],
    "component": CatalogsViewContainer,
    "strings": {
        "cs": {
            "catalogs_found": "katalogů nalezeno"
        },
        "en": {
            "catalogs_found": "catalogs found"
        }
    }
});
