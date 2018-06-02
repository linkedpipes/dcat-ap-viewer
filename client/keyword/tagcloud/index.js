import {register} from "app/register.js";
import reducer from "./keyword-tagloud-reducer";
import {KeywordsView} from "./keyword-tagloud-view";
import {KEYWORDS_LIST_URL} from "app/navigation";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [KEYWORDS_LIST_URL],
    "component": KeywordsView
});