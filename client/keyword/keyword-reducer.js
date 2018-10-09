import {randomColor} from "randomcolor";

const reducerName = "keywords";

const initialState = {
    "keywords": [],
    "keywords-map": {}
};

function reducer(state = initialState, action) {
    if (action.$keywords) {
        return addKeywords(state, action.$keywords);
    }
    return state;
}

function addKeywords(state, keywordsToAdd) {
    let newRecord = false;
    const keywordsMap = {...state.keywordsMap};
    keywordsToAdd.forEach((keyword) => {
        const id = keyword["@id"];
        if (keywordsMap[id] === undefined) {
            newRecord = true;
            keywordsMap[id] = keyword;
        } else {
            keywordsMap[id] = {
                ...keywordsMap[id],
                ...keyword
            }
        }
    });
    //;
    const keywords = Object.values(keywordsMap);
    keywords.sort((left, right) => right.count - left.count);
    //
    if (newRecord) {
        generateColors(keywords);
    }
    //
    return {
        "keywords": keywords,
        "keywordsMap": keywordsMap
    };
}

function generateColors(values) {
    const colors = randomColor({
        "luminosity": "dark",
        "hue": "random",
        "seed": 13,
        "count": values.length
    });
    for (let index = 0; index < values.length; ++index) {
        values[index]["color"] = colors[index];
    }
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function keywordsMapSelector(state) {
    return reducerSelector(state).keywordsMap;
}
