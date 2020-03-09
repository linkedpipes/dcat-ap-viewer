export const DATASET_DETAIL_MOUNT = "DATASET_DETAIL_MOUNT";
export const DATASET_DETAIL_UNMOUNT = "DATASET_DETAIL_UNMOUNT";
export const DATASET_DETAIL_SET = "DATASET_DETAIL_SET";

export function datasetDetailMount(iri) {
  return {
    "type": DATASET_DETAIL_MOUNT,
    "dataset": iri,
  };
}

export function datasetDetailUnMount() {
  return {
    "type": DATASET_DETAIL_UNMOUNT,
  }
}

/**
 * What can happen is that component is not changed, but the dataset is,
 * in this case this event is emitted announcing change of dataset.
 *
 * This is so we can ignore results of older queries not relevant for
 * our dataset.
 */
export function datasetDetailSet(iri) {
  return {
    "type": DATASET_DETAIL_SET,
    "dataset": iri,
  };
}
