const reducerName = "formats";

const initialState = {
    "formats": [],
    "formats-map": {}
};

function reducer(state = initialState, action) {
    if (action.$formats) {
        return addFormats(state, action.$formats);
    }
    return state;
}

function addFormats(state, formatsToAdd) {
    const formatsMap = {...state.formatsMap};
    formatsToAdd.forEach((format) => {
        const id = format["@id"];
        if (formatsMap[id] === undefined) {
            formatsMap[id] = format;
        } else {
            formatsMap[id] = {
                ...formatsMap[id],
                ...format
            }
        }
    });
    //
    const formats = Object.values(formatsMap);
    formats.sort((left, right) => right.count - left.count);
    return {
        "formats": formats,
        "formatsMap": formatsMap
    };
}


export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function formatsMapSelector(state) {
    return reducerSelector(state).formatsMap;
}
