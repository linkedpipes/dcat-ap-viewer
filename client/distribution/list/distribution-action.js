export const MOUNT_DISTRIBUTION = "MOUNT_DISTRIBUTION";
export const UNMOUNT_DISTRIBUTION = "UNMOUNT_DISTRIBUTION";

export function onMount() {
  return {
    "type": MOUNT_DISTRIBUTION,
  };
}

export function onUnMount() {
  return {
    "type": UNMOUNT_DISTRIBUTION,
  };
}
