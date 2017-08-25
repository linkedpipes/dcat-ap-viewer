export const SET_APPLICATION_LOADER = "SET_APPLICATION_LOADER";

// TODO Turn into action property, so it can be used with other actions.
export function setApplicationLoader(isActive) {
    return {
        "type": SET_APPLICATION_LOADER,
        "active": isActive
    }
}