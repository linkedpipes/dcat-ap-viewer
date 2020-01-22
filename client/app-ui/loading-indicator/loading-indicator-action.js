export const SET_APPLICATION_LOADER_PROPERTY = "application-loader";

export function addLoaderStatusOn(event) {
  return {
    ...event,
    [SET_APPLICATION_LOADER_PROPERTY]: true,
  };
}

export function addLoaderStatusOff(event) {
  return {
    ...event,
    [SET_APPLICATION_LOADER_PROPERTY]: false,
  };
}
