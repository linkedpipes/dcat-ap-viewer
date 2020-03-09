export const CATALOG_LIST_MOUNT = "CATALOG_LIST_MOUNT";
export const CATALOG_LIST_UNMOUNT = "CATALOG_LIST_UNMOUNT";

export function catalogListMount() {
  return {
    "type": CATALOG_LIST_MOUNT,
  };
}

export function catalogListUnMount() {
  return {
    "type": CATALOG_LIST_UNMOUNT,
  };
}
