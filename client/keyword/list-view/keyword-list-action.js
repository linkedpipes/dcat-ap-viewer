export const MOUNT_KEYWORDS_LIST = "MOUNT_KEYWORDS_LIST";
export const UNMOUNT_KEYWORDS_LIST = "UNMOUNT_KEYWORDS_LIST";

export function onMount() {
  return {
    "type": MOUNT_KEYWORDS_LIST,
  };
}

export function onUnMount() {
  return {
    "type": UNMOUNT_KEYWORDS_LIST,
  };
}
