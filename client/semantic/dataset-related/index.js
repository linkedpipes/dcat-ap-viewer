import {register} from "app/register.js";
export {default as SemanticRelatedDatasets} from "./semantic-related-view";
import reducer from "./semantic-related-reducer";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "strings": {
        "cs": {
            "related": "Související datové sady:"
        },
        "en": {
            "related": "Related:"
        }
    }
});
