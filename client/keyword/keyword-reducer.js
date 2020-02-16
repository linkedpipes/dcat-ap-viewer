import {randomColor} from "randomcolor";

const reducerName = "keywords";

const initialState = {
  "keywords_cs": [],
  "keywords_en": [],
  "keywords_cs_map": {},
  "keywords_en_map": {},
};

function reducer(state = initialState, action) {
  if (action.$keywords_cs) {
    return addKeywords(state, action.$keywords_cs, "cs");
  }
  if (action.$keywords_en) {
    return addKeywords(state, action.$keywords_en, "en");
  }
  return state;
}

function addKeywords(state, keywordsToAdd, lang) {
  let newRecord = false;
  const keywordsMap = {...state["keywords_" + lang + "_map"]};
  keywordsToAdd.forEach((keyword) => {
    const id = keyword["@id"];
    if (keywordsMap[id] === undefined) {
      newRecord = true;
      keywordsMap[id] = keyword;
    } else {
      keywordsMap[id] = {
        ...keywordsMap[id],
        ...keyword,
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
    ...state,
    ["keywords" + lang]: keywords,
    ["keywords_" + lang + "_map"]: keywordsMap,
  };
}

function generateColors(values) {
  const colors = randomColor({
    "luminosity": "dark",
    "hue": "random",
    "seed": 13,
    "count": values.length,
  });
  for (let index = 0; index < values.length; ++index) {
    values[index]["color"] = colors[index];
  }
}

export default {
  "name": reducerName,
  "reducer": reducer,
};

const reducerSelector = (state) => state[reducerName];

export function keywordsMapSelector(state, lang) {
  return reducerSelector(state)["keywords_" + lang + "_map"];
}
