import {register} from "../../app/register.js";
import {CatalogsViewContainer} from "./catalog-list-container";
import {CATALOG_LIST_URL} from "../../app/navigation";
import reducer from "./catalog-list-reducer";

register({
  "name": reducer.name,
  "reducer": reducer.reducer,
  "url": [CATALOG_LIST_URL],
  "component": CatalogsViewContainer,
  "strings": {
    "cs": {
      "catalogs_found": "katalogů nalezeno",
      "catalogs": "Katalogy",
    },
    "en": {
      "catalogs_found": "catalogs found",
      "catalogs": "Catalogs",
    },
  },
});
