import {register} from "app/register.js";
import reducer from "./semantic-terms-reducer";

export {default as SemanticTermsDatasets} from "./semantic-terms-view";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "strings": {
        "cs": {
            "terms": "Pojmy:"
        },
        "en": {
            "terms": "Terms:"
        }
    }
});
