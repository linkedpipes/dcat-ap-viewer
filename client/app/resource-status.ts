export enum Status {
  Undefined,
  Loading,
  Ready,
  Failed,
  /**
   * Used if we have data and we do re-load, so we can show
   * the old data until the new one are ready to prevent
   * changes.
   */
  Updating,
}