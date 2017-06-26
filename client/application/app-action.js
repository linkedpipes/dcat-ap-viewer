export const SET_APPLICATION_LOADER = "SET_APPLICATION_LOADER";

export function setApplicationLoader(isActive) {
    return {
        "type": SET_APPLICATION_LOADER,
        "active": isActive
    }
}