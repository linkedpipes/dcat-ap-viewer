export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export function showModal(label, body) {
  return {
    "type": SHOW_MODAL,
    "label": label,
    "body": body,
  };
}

export function closeModal() {
  return {
    "type": HIDE_MODAL,
  };
}
