export const PUBLISHER_LIST_MOUNT = "PUBLISHER_LIST_MOUNT";
export const PUBLISHER_LIST_UNMOUNT = "PUBLISHER_LIST_UNMOUNT";

export function publisherListMount() {
  return {
    "type": PUBLISHER_LIST_MOUNT,
  };
}

export function publisherListUnMount() {
  return {
    "type": PUBLISHER_LIST_UNMOUNT,
  };
}
