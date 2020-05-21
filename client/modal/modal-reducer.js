import {SHOW_MODAL, HIDE_MODAL} from "./modal-action";

const reducerName = "modal-service";

const initialState = {
  "isOpen": false,
  "label": "",
  "body": "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case SHOW_MODAL:
    return onShowModal(state, action);
  case HIDE_MODAL:
    return onHideModal();
  default:
    return state;
  }
}

function onShowModal(state, action) {
  return {
    "isOpen": true,
    "label": action.label,
    "body": action.body,
  };
}

function onHideModal() {
  return {
    "isOpen": false,
  };
}


export default {
  "name": reducerName,
  "reducer": reducer,
};

const reducerSelector = (state) => state[reducerName];

export function isOpenSelector(state) {
  return reducerSelector(state)["isOpen"];
}

export function labelSelector(state) {
  return reducerSelector(state)["label"];
}

export function bodySelector(state) {
  return reducerSelector(state)["body"];
}
