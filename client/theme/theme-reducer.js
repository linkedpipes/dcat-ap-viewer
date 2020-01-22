import {randomColor} from "randomcolor";

const reducerName = "themes";

const initialState = {
  "themes": [],
  "themesMap": {},
};

function reducer(state = initialState, action) {
  if (action.$themes) {
    return addThemes(state, action.$themes);
  }
  return state;
}

function addThemes(state, themesToAdd) {
  let newRecord = false;
  const themesMap = {...state.themesMap};
  themesToAdd.forEach((theme) => {
    const id = theme["@id"];
    if (themesMap[id] === undefined) {
      newRecord = true;
      themesMap[id] = theme;
    } else {
      themesMap[id] = {
        ...themesMap[id],
        ...theme,
      }
    }
  });
  //
  const themes = Object.values(themesMap);
  themes.sort((left, right) => right.count - left.count);
  //
  if (newRecord) {
    generateColors(themes);
  }
  //
  return {
    "themes": themes,
    "themesMap": themesMap,
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

export function themesMapSelector(state) {
  return reducerSelector(state).themesMap;
}
