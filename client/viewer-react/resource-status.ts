/**
 * Status used for resources in the viewer-react module.
 */
export enum ResourceStatus {
  /**
   * Initial status.
   */
  Undefined = "undefined",
  /**
   * Fetch request in progress.
   */
  Loading = "loading",
  /**
   * Data are ready to be shown to the user.
   */
  Ready = "ready",
  /**
   * Failed to fetch the data.
   */
  Failed = "failed",
  /**
   * Used if we have data and we do re-load, so we can show
   * the old data until the new one are ready to prevent
   * changes.
   */
  Updating = "updating",
}

export function updateStatusLoading(status: ResourceStatus): ResourceStatus {
  if (status === ResourceStatus.Ready) {
    return ResourceStatus.Updating;
  }
  return ResourceStatus.Loading;
}

export function isStatusLoadingOrFailed(status: ResourceStatus) {
  return isStatusLoading(status) || status === ResourceStatus.Failed;
}

export function isStatusLoading(status: ResourceStatus) {
  return status === ResourceStatus.Loading
    || status === ResourceStatus.Updating;
}
